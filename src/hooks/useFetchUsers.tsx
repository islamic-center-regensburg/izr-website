import { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces based on the data structure
interface PhoneNumber {
  phone_number: string;
}

interface Email {
  email: string;
}

interface Role {
  role: string;
}

interface User {
  id: number;
  name: string;
  last_name: string;
  phone_numbers: PhoneNumber[];
  emails: Email[];
  roles: Role[];
}

// Type for the response (array of users)
type UsersResponse = User[];

// Create the custom hook
const useFetchUsers = () => {
  const [users, setUsers] = useState<UsersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<UsersResponse>(
          "https://izr-cloud.online/staff/persons/"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, error, loading };
};

export default useFetchUsers;
