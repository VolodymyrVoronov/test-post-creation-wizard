import { draftStorage } from "@/lib/storage";
import {
  draftSave,
  getPost,
  imageUpload,
  publishPost,
  videoUpload,
} from "@/services/api";
import type { CreateState, DraftState, FlowInput, PostResponse } from "@/types";

export function* createPostFlow(): Generator<
  CreateState | Promise<PostResponse>,
  void,
  FlowInput
> {
  const draft: DraftState = { image: null, title: "", text: "", video: null };

  try {
    const postDraftId = draftStorage.load();

    console.log("postDraftId", postDraftId);

    while (true) {
      yield { type: "checking-local-storage" };

      const post = postDraftId ? yield* getPost(postDraftId) : null;

      console.log("post", post);

      if (post) {
        draft.id = post.id || "";
        draft.image = post.imageUrl || null;
        draft.title = post.title || "";
        draft.text = post.text || "";
        draft.video = post.videoUrl || null;

        break;
      }

      if (!postDraftId) break;
    }

    while (true) {
      // 1. Image Step
      const imageUrl = (yield {
        type: "select-image",
        value: draft.image,
        canSkip: draft.image !== null,
      }) as string | null;

      if (imageUrl === null) break;

      if (imageUrl && typeof imageUrl === "string") {
        yield { type: "uploading-image" };

        const result = yield* imageUpload(draft.id || "", imageUrl);

        console.log("uploading-image result", result);

        if (!result.id && !result.imageUrl) {
          yield { type: "invalid-image", message: "Invalid image. Try again" };
          continue;
        }

        if (!draft.id) {
          draftStorage.save(result.id || "");
        }

        draft.id = result.id || "";
        draft.image = imageUrl;
        break;
      }
    }

    // 2. Compose Step
    while (true) {
      const content = (yield {
        type: "compose",
        value: { title: draft.title, text: draft.text },
        canSkip: draft.title !== "" && draft.text !== "",
      }) as { title: string; text: string } | null;

      if (content === null) break;

      if (content && !content.title && !content.text) {
        yield {
          type: "invalid-content",
          message: "Title and text are required",
        };

        continue;
      }

      if (content && content.title && content.text) {
        yield { type: "saving-draft" };

        if (!draft.id) {
          yield {
            type: "invalid-content",
            message: "Invalid content. Try again",
          };
          continue;
        }

        const result = yield* draftSave(draft.id, content.title, content.text);

        console.log("saving-draft result", result);

        if (!result.id && !result.imageUrl && !result.title && !result.text) {
          yield {
            type: "invalid-content",
            message: "Invalid content. Try again",
          };
          continue;
        }

        draft.title = content.title;
        draft.text = content.text;
        break;
      }
    }

    // 3. Video Step
    while (true) {
      const videoUrl = (yield {
        type: "add-video",
        value: draft.video,
        canSkip: draft.video !== null,
      }) as string | null;

      if (videoUrl === null) break;

      if (videoUrl) {
        yield { type: "uploading-video" };

        if (!draft.id) {
          yield { type: "invalid-video", message: "Invalid video. Try again" };
          continue;
        }

        const result = yield* videoUpload(draft.id, videoUrl);

        console.log("uploading-video result", result);

        if (!result.id && !result.videoUrl) {
          yield { type: "invalid-video", message: "Invalid video. Try again" };
          continue;
        }

        draft.video = videoUrl;
        break;
      }
    }

    // 4. Review Step
    while (true) {
      yield { type: "review", value: draft, isEditing: false };

      // 5. Finalize
      yield { type: "publishing" };

      if (!draft.id) {
        yield { type: "error", message: "Something went wrong" };
        continue;
      }

      const result = yield* publishPost(draft.id, true);

      console.log("publishing result", result);

      if (!result.id && !result.published) {
        yield { type: "error", message: "Something went wrong" };
        continue;
      }

      break;
    }

    yield { type: "done", postId: draft.id };
  } catch (e) {
    console.warn(e);

    yield {
      type: "error",
      message:
        "Something went wrong. Your post was not published. Please try again later.",
    };
  }
}
