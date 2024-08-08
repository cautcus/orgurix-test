import { Topnav } from "@/components/navbar/topnav";
import React from "react";
import Heading from "./heading";
import Team from "./cards";

export default function team() {
  return (
    <div>
      <Topnav />
      <Heading />
      <Team/>
    </div>
  );
}
