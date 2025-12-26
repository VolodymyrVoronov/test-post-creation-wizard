export type DraftState = {
  id?: string;
  image: string | null;
  title: string;
  text: string;
  video: string | null;
};

export type CheckingLocalStorageState = { type: "checking-local-storage" };
export type SelectImageState = {
  type: "select-image";
  value: string | null;
  canSkip: boolean;
};
export type UploadingImageState = { type: "uploading-image" };
export type InvalidImageState = { type: "invalid-image"; message: string };
export type ComposeState = {
  type: "compose";
  value: { title: string; text: string };
  canSkip: boolean;
};
export type SavingDraftState = { type: "saving-draft" };
export type InvalidContentState = { type: "invalid-content"; message: string };
export type AddVideoState = {
  type: "add-video";
  value: string | null;
  canSkip: boolean;
};
export type UploadingVideoState = { type: "uploading-video" };
export type InvalidVideoState = { type: "invalid-video"; message: string };
export type ReviewState = {
  type: "review";
  value: DraftState;
  isEditing: boolean;
};
export type PublishingState = { type: "publishing" };
export type DoneState = { type: "done"; postId: string };
export type ErrorState = { type: "error"; message: string };

export type CreateState =
  | CheckingLocalStorageState
  | SelectImageState
  | UploadingImageState
  | InvalidImageState
  | ComposeState
  | SavingDraftState
  | InvalidContentState
  | AddVideoState
  | UploadingVideoState
  | InvalidVideoState
  | ReviewState
  | PublishingState
  | DoneState
  | ErrorState;

export type PostResponse = {
  id: string;
  imageUrl: string;
  title: string;
  text: string;
  videoUrl: string;
  published: boolean;
};

export type FlowInput =
  | string
  | { title: string; text: string }
  | PostResponse
  | null
  | undefined;
