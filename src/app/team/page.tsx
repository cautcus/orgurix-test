import { Topnav } from "@/components/navbar/topnav";
import React, {useState,useEffect} from "react";
import Heading from "./heading";
import Team from "./cards";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpinnerLoader from '@/components/ui/loader';

export default function team() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div>
      <GoogleAnalytics />
      <Topnav />
      <Heading />
      <Team/>
    </div>
  );
}
