import { toast } from "sonner";
import {
	type GetAllPostsData,
	type GetMediaData,
	type GetPostData,
	getAllPosts,
	getMedia,
	getPost,
	type MediaOut,
	type PaginatedResponsePostOut,
	type PostOut,
} from "../gen";
import { POST_QUERY_KEYS } from "./constants";

interface GetAllPostsQueryOptionsInterface {
	mosque_id: string;
	query?: GetAllPostsData["query"];
}

export const getAllPostsQueryOptions = ({
	mosque_id,
	query,
}: GetAllPostsQueryOptionsInterface) => {
	return {
		queryKey: POST_QUERY_KEYS.all(mosque_id, query ? { query } : undefined),
		queryFn: async (): Promise<PaginatedResponsePostOut> => {
			try {
				const response = await getAllPosts({
					path: { mosque_id },
					query,
				});
				if (!response.data) {
					toast.error("No posts data returned. Please try again later.");
					throw new Error("No posts data returned");
				}
				return response.data;
			} catch (error) {
				console.error("Error fetching posts:", error);
				toast.error("Failed to fetch posts. Please try again later.");
				throw error;
			}
		},
		enabled: Boolean(mosque_id),
	};
};

interface GetPostByIdQueryOptionsInterface {
	post_id: string;
	query?: GetPostData["query"];
}

export const getPostByIdQueryOptions = ({
	post_id,
	query,
}: GetPostByIdQueryOptionsInterface) => {
	return {
		queryKey: POST_QUERY_KEYS.byId(post_id, query ? { query } : undefined),
		queryFn: async (): Promise<PostOut> => {
			try {
				const response = await getPost({
					path: { post_id },
					query,
				});
				if (!response.data) {
					toast.error("No post data returned. Please try again later.");
					throw new Error("No post data returned");
				}
				return response.data;
			} catch (error) {
				console.error(`Error fetching post with id ${post_id}:`, error);
				toast.error("Failed to fetch post details. Please try again later.");
				throw error;
			}
		},
		enabled: Boolean(post_id),
	};
};

interface GetPostMediaQueryOptionsInterface {
	mosque_id: string;
	dir: string;
	content_type?: GetMediaData["query"]["content_type"];
}

export const getPostMediaQueryOptions = ({
	mosque_id,
	dir,
	content_type,
}: GetPostMediaQueryOptionsInterface) => {
	return {
		queryKey: POST_QUERY_KEYS.media(mosque_id, {
			dir,
			media_category: "media_objects",
			content_type,
		}),
		queryFn: async (): Promise<MediaOut[]> => {
			try {
				const response = await getMedia({
					query: {
						mosque_id,
						dir,
						media_category: "media_objects",
						content_type,
					},
				});

				if (!response.data) {
					toast.error("No media data returned. Please try again later.");
					throw new Error("No media data returned");
				}

				return response.data;
			} catch (error) {
				console.error("Error fetching post media:", error);
				toast.error("Failed to fetch post media. Please try again later.");
				throw error;
			}
		},
		enabled: Boolean(mosque_id) && Boolean(dir),
	};
};
