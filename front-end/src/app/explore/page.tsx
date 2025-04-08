import Header from "@/components/Header";
import ExploreMenu from "./_components/ExploreMenu";
import NavBar from "@/components/NavBar";

export default function Home(){
    return(
        <div className="flex flex-col items-center">
            <Header />
            <div className="flex mt-[60px] gap-[100px]">
                <NavBar location="explore"/>
                <ExploreMenu />
            </div>
        </div>
    )
}