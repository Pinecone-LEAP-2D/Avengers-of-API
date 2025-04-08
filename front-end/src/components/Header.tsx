import { Coffee } from "lucide-react";

export default function Header() {
  return (
    <div className="flex bg-white justify-center items-center w-full h-[56px]">
      <div className="w-[90%] flex justify-between">
        <div className="flex items-center gap-2">
          <Coffee />
          <h2 className=" font-bold">Buy Me Coffee</h2>
        </div>
        <div>User</div>
      </div>
    </div>
  );
}
