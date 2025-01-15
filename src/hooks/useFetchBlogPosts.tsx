import { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces for the data structure
interface ContentItem {
  id: number;
  content_type: string;
  text: string;
  image: string | null;
  v_image: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  content_items: ContentItem[];
}

// Type for the response (array of blog posts)
type BlogPostsResponse = BlogPost[];

// Create the custom hook
const useFetchBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<BlogPostsResponse>(
          "https://izr-cloud.online/blog/"
        );
        setBlogPosts(response.data);
      } catch (err) {
        setError("Failed to fetch blog posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, error, loading };
};

export default useFetchBlogPosts;
