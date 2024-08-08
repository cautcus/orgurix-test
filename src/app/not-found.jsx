import Link from "next/link";
import { Topnav } from "@/components/navbar/topnav";
import Footer from "@/components/footer/Footer";

export default function NotFound() {
  return (
    <>
    <Topnav />
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
        <img className="mx-auto h-100 w-auto text-black sm:h-80 text-neutral-300" src="https://error404.fun/img/illustrations/15.png"/>
        
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-red-500 sm:text-4xl">
          Oops!
          </h1>
          <p className="mt-4 text-gray-300">It looks like we've hit a pollution snag.</p>
          <div className="mt-6">
          <button className="px-8 py-2 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
        <div className="absolute -bottom-2 -right-2 bg-green-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
        <a className="relative font-bold" href="/">Go Back</a>
      </button> 
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
