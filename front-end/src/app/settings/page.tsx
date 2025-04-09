import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import SettingsMenu from "./_components/SettingsMenu";

export default function Settings() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex mt-[60px] gap-[100px]">
        <NavBar location={"settings"} />
        <SettingsMenu />
      </div>
    </div>
  );
}
