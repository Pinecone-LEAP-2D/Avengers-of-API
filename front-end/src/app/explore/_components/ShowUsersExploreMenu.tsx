"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCards from "./AddCards";

type UsersTypes = {
  username: string;
  profile: {
    name: string;
    about: string;
    socialMediaURL: string;
    avatarImage: string;
  };
};

export const ShowUserExploreMenu = () => {
  const [getUsers, setGetUsers] = useState<UsersTypes[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile/users");
      const users = response.data;
      setGetUsers(users);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching users data", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="w-[955px] h-fit p-[20px] flex flex-col gap-[25px]">
        {getUsers.map((el, index) => (
          <AddCards
            key={index}
            username={el.username}
            name={el.profile?.name || ""}
            about={el.profile?.about || ""}
            socialMediaURL={el.profile?.socialMediaURL || ""}
            avatarImage={el.profile?.avatarImage || ""}
          />
        ))}
      </div>
    </>
  );
};
export default ShowUserExploreMenu;
