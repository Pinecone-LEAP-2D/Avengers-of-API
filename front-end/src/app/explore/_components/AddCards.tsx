import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type UserCardProps = {
  username: string;
  name: string;
  about: string;
  socialMediaURL: string;
  avatarImage: string;
};

export const AddCards = ({
  username,
  name,
  about,
  socialMediaURL,
  avatarImage,
}: UserCardProps) => {
  return (
    <Card className="p-4 border w-full border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        {/* Left: Avatar and Info */}
        <div className="flex gap-4">
          <Image
            src={avatarImage || "/illustration.png"}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-xl font-semibold">{username}</CardTitle>
          </div>
        </div>
        {/* Right: Profile Button */}{" "}
        <Button
          variant="secondary"
          className={`w-auto h-auto transition-shadow duration-200 flex items-center gap-[10px] hover:shadow-md hover:bg-gray-200 rounded-[10px] text-start pl-[15px] ${
            window.location.pathname === "/view"
              ? "bg-gray-200 hover:bg-gray-200"
              : ""
          }`}
          onClick={() => window.open(`user/${username}`, "_blank")}
        >
          <div className="flex items-center gap-2 p-0.5 text-sm font-medium">
            View profile{" "}
            <ExternalLink className="w-[18px] h-[18px]" strokeWidth={1} />
          </div>
        </Button>
      </div>

      {/* Description + Social */}
      <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 w-[420px]">
          <p className="text-lg font-semibold">About {username}</p>
          <p className="text-sm flex text-wrap line-clamp-3">{about}</p>
        </div>
        <div>
          <p className="font-medium text-sm mb-1">Social media URL</p>
          <a
            href={socialMediaURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-sm hover:underline break-all"
          >
            {socialMediaURL}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddCards;
