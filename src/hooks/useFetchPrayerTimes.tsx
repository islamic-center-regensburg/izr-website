import { useEffect, useState } from "react";
import axios from "axios";



// Define the main interface based on the provided primary API response
interface PrayerTimes {
  Datum: string;
  Hijri: string;
  Hijri_ar: string;
  Fajr: string;
  Shuruq: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Jumaa: string;
  Tarawih?: string;
}

// Define the interface for the additional settings data
interface PrayerSettings {
  asr: number;
  dhuhr: number;
  fajr: number;
  isha: number;
  jumaa: number;
  maghrib: number;
  tarawih: number;
  day_correction: number;
  ramadan: string;
}

// Define a combined interface for the hook's response
interface CombinedPrayerData {
  prayerTimes: PrayerTimes | null;
  prayerSettings: PrayerSettings | null;
}

// Create the custom hook
const useFetchPrayerData = () => {
  const [data, setData] = useState<CombinedPrayerData>({
    prayerTimes: null,
    prayerSettings: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrayerData = async () => {
      setLoading(true);
      try {
        // Fetch both data sets in parallel
        const [prayerTimesResponse, prayerSettingsResponse] = await Promise.all(
          [
            axios.get<PrayerTimes>("https://izr-cloud.online/getPrayers/"),
            axios.get<PrayerSettings[]>("https://izr-cloud.online/iqamah/"),
          ]
        );

        setData({
          prayerTimes: prayerTimesResponse.data,
          prayerSettings: prayerSettingsResponse.data[0], // Assuming the settings response is an array with one object
        });
      } catch (err) {
        setError("Failed to fetch prayer data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerData();
  }, []);

  return { data, error, loading };
};

export default useFetchPrayerData;
