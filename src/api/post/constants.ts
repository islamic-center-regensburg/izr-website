import type { GetAllPostsData, GetPostData } from "../gen";
import { buildQueryKeyWithPath } from "../utils/buildQueryKey";

const ROOT_QUERY_KEY: string = "posts";

export const POST_QUERY_KEYS = {
	root: ROOT_QUERY_KEY,
	all: (mosqueId: string, query?: Partial<GetAllPostsData["query"]>) =>
		buildQueryKeyWithPath(
			ROOT_QUERY_KEY,
			{ path: "mosque_id", value: mosqueId },
			query,
		),
	byId: (postId: string, query?: Partial<GetPostData["query"]>) =>
		buildQueryKeyWithPath(
			ROOT_QUERY_KEY,
			{ path: "post_id", value: postId },
			query,
		),
};
