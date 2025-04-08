import Header from "@/components/Header";
import HomeMenu from "./_components/HomeMenu";


export default function Home(){
    return(
        <div className="flex flex-col items-center">
            <Header />
            <div className="flex mt-[60px]">
                {/* <NavigationBar /> */}
                <HomeMenu />
            </div>
        </div>
    )
}