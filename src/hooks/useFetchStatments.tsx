import { useEffect, useState } from "react";
import axios from "axios";

// Define the interface for the response item
interface ResponseItem {
  id: number;
  type: string;
  title: string;
  content: string;
}

// Define the type for the response (array of `ResponseItem`)
type ApiResponse = ResponseItem[];

// Create the custom hook
const useFetchStatments = () => {
  const [data, setData] = useState<ApiResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          "https://izr-cloud.online/statement"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchStatments;
