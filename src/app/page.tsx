import { Topnav } from "@/components/navbar/topnav";
import Coming from "@/components/waitlist/coming";
import { Hero } from "@/components/banner/hero";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Grid from "@/components/grid/grid";
import { Feature } from "@/components/h-grid/feature";
import { CardA } from "@/components/cards/3dcard";
import { Reviews } from "@/components/review/review";
import { Team } from "@/components/member/team";


export default function Home() {
  return (
    <>
    {/* <Navbar/> */}
      <Topnav />
      {/* <Coming/>  */}
      <Hero words=" Welcome to oguriX"/>
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
      <Team/>
    </>
  );
}
