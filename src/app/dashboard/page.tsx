import React from 'react'
import { Topnav } from "@/components/navbar/topnav";
import { DGrid } from './d-grid';
import Footer from '@/components/footer/Footer';

export default function Login() {
  return (
    <>
    <Topnav/>
    <div className='px-4 pb-12'/>
    <DGrid/>
    <div className='px-4 pb-20'/>
    <Footer/>
    </>
  )
}
