import { createFileRoute } from "@tanstack/react-router";
import LinkTreePage from "../pages/link-tree-page";

export const Route = createFileRoute("/linktree")({
	component: LinkTreePage,
});
