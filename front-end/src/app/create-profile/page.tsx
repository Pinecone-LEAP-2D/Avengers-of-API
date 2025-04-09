import CoffeeLoading from "@/components/CoffeeLoading";
import ProfileUser from "./_components/profileUser/page";

export const Home = () => {
  const loading = true;

  if (loading) {
    return <CoffeeLoading />;
  }

  return <ProfileUser />;
};

export default Home;
