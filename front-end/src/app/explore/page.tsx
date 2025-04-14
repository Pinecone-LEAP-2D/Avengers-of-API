"use client";
import Header from "@/components/Header";
import ExploreMenu from "./_components/ExploreMenu";
import NavBar from "@/components/NavBar";
import ShowUserExploreMenu from "./_components/ShowUsersExploreMenu";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[100px]">
        <NavBar location="explore" />
        <div>
          <ExploreMenu />
          <ShowUserExploreMenu />
        </div>
      </div>
    </div>
  );
}
