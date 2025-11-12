import Image from "next/image";
import HomePage from "@/app/(components)/home/page";
import SportsPage from "@/app/(components)/sports/page";
import CounsellingPage from "@/app/(components)/counselling/page";
import ResourcesPage from "@/app/admin/dashboard/counselling/resources/page";
import ContactPage from "@/app/(components)/contact/page";
import AboutPage from "@/app/(components)/about/page";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div >
        <Header />
        <HomePage />
        <SportsPage />
        {/*<ResourcesPage />*/}
        <CounsellingPage />
        <ContactPage />
        <AboutPage />
        <Footer />
    </div>
  );
}
