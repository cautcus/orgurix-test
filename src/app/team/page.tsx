import { Topnav } from "@/components/navbar/topnav";
import React from "react";
import Heading from "./heading";
import Team from "./cards";
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function team() {
  return (
    <div>
      <GoogleAnalytics />
      <Topnav />
      <Heading />
      <Team/>
    </div>
  );
}
