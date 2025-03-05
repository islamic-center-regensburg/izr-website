import { useEffect, useState } from "react";
import axios from "axios";

// Define the interface for a single event
interface Event {
  title: string;
  title_ar: string;
  title_en: string;
  flyer: string;
  flyer_ar: string;
  flyer_en: string;
  flyerTV: string;
  flyerTV_ar: string;
  flyerTV_en: string;
  subtitle: string | null;
  subtitle_ar: string | null;
  subtitle_en: string | null;
  subtitle_den: string | null;
  description: string;
  description_ar: string;
  description_de: string;
  more_info: string;
}

// Define the main response structure, which includes an array of events
interface EventsResponse {
  events: Event[];
}

// Create the custom hook
const useFetchEvents = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get<EventsResponse>(
          "https://izr-cloud.online/getEvents/all"
        );
        setEvents(response.data.events);
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, error, loading };
};

export default useFetchEvents;
