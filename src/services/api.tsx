import type { FlowInput, PostResponse } from "@/types";

const API = "http://localhost:3000";

export function* getPost(
  postId: string,
): Generator<Promise<PostResponse>, PostResponse, unknown> {
  const response = yield fetch(`${API}/posts/${postId}`).then((res) =>
    res.json(),
  );

  yield new Promise((resolve) => setTimeout(resolve, 2000));

  return response as PostResponse;
}

export function* imageUpload(
  postId: string,
  imageUrl: string,
): Generator<Promise<PostResponse>, PostResponse, FlowInput> {
  const body = JSON.stringify({ imageUrl });

  const method = postId ? "PATCH" : "POST";

  const response = yield fetch(`${API}/posts/${postId}`, {
    method,
    body,
  }).then((res) => res.json());

  yield new Promise((resolve) => setTimeout(resolve, 2000));

  return response as PostResponse;
}

export function* draftSave(
  postId: string,
  title: string,
  text: string,
): Generator<Promise<PostResponse>, PostResponse, FlowInput> {
  const body = JSON.stringify({ title, text });

  const response = yield fetch(`${API}/posts/${postId}`, {
    method: "PATCH",
    body,
  }).then((res) => res.json());

  yield new Promise((resolve) => setTimeout(resolve, 2000));

  return response as PostResponse;
}

export function* videoUpload(
  postId: string,
  videoUrl: string,
): Generator<Promise<PostResponse>, PostResponse, FlowInput> {
  const body = JSON.stringify({ videoUrl });

  const response = yield fetch(`${API}/posts/${postId}`, {
    method: "PATCH",
    body,
  }).then((res) => res.json());

  yield new Promise((resolve) => setTimeout(resolve, 2000));

  return response as PostResponse;
}

export function* publishPost(
  postId: string,
  published: boolean,
): Generator<Promise<PostResponse>, PostResponse, FlowInput> {
  const body = JSON.stringify({ published });

  const response = yield fetch(`${API}/posts/${postId}`, {
    method: "PATCH",
    body,
  }).then((res) => res.json());

  yield new Promise((resolve) => setTimeout(resolve, 2000));

  return response as PostResponse;
}
