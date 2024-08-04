import { Topnav } from "@/components/navbar/topnav";
import React from "react";
import Heading from "./heading";
import Team from "./cards";

export default function about() {
  return (
    <div>
      <Topnav />
      <Heading />
      <Team/>
    </div>
  );
}
