import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
    <Card>
      <CardHeader>
        <CardTitle>{username}</CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 text-center">
        <Image
          src={avatarImage || "illustration.png"}
          alt={`${username}'s avatar`}
          width={64}
          height={64}
          className="rounded-full"
        />
        <p className="text-sm text-muted-foreground">{about}</p>
        <a
          href={socialMediaURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Follow on social
        </a>
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default AddCards;
