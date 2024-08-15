import { Topnav } from "@/components/navbar/topnav";
import Coming from "@/components/waitlist/coming";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Grid from "@/components/grid/grid";
import { Feature } from "@/components/h-grid/feature";
import { CardA } from "@/components/cards/3dcard";
import { Reviews } from "@/components/review/review";
import Footer from "@/components/footer/Footer";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { AppleCardsCarouselDemo } from "@/components/carousel/carousel";


export default function Home() {

  return (
    <>
    <GoogleAnalytics/>
      <Topnav />
      <div className="p-6" />
    <AppleCardsCarouselDemo/>
      {/* <Coming/>  */}
      <div>
        <div className="mx-auto max-w-xl text-center px-4 pb-12">
          <TextGenerateEffect words="Introducing Our Premier Line of Organic Essentials"/>
        </div>
        <Grid />
      </div>
      <div className="p-6" />
      <Feature />
      <CardA/>
      <Reviews/>
      <div className="p-6" />
      <Footer/>
    </>
  );
}
