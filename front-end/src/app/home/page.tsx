import Header from "@/components/Header";
import HomeMenu from "./_components/HomeMenu";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[300px]">
        <NavBar location={"home"} />
        <HomeMenu />
      </div>
    </div>
  );
}
