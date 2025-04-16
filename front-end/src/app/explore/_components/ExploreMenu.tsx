"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCards from "./AddCards";
import { Search } from "lucide-react";

type UserType = {
  username: string;
  profile: {
    name: string;
    about: string;
    socialMediaURL: string;
    avatarImage: string;
  };
};

export const ShowUserExploreMenu = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/profile/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full min-w-[955px] h-fit p-5 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Explore creators</h2>
        <div className="relative">
          <div className="absolute top-3 left-3">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full max-w-[300px] border outline-none pl-10 py-2 rounded-md text-sm"
            placeholder="Search username"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              e.target.value.length > 0;
            }}
          />
        </div>
      </div>

      {/* Display cards */}
      <div className="w-full h-fit flex flex-col gap-4">
        {isLoading ? (
          <p className="text-sm text-center">Loading creators...</p>
        ) : error ? (
          <p className="text-sm text-red-500 text-center">{error}</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <AddCards
              key={user.username || index}
              username={user.username}
              name={user.profile?.name || ""}
              about={user.profile?.about || ""}
              socialMediaURL={user.profile?.socialMediaURL || ""}
              avatarImage={user.profile?.avatarImage || ""}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center mt-4">
            {searchValue
              ? "No users match your search."
              : "No creators have signed up yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowUserExploreMenu;
