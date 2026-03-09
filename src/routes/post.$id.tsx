import { createFileRoute } from "@tanstack/react-router";
import PostDetails from "@/pages/post-details/post-details";
export const Route = createFileRoute("/post/$id")({
	component: PostDetails,
});
