import React from 'react'
import LoginForm from './LoginForm'
import { Topnav } from "@/components/navbar/topnav";
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function Login() {
  return (
    <>
        <GoogleAnalytics/>
    <Topnav/>
    <div className='p-10'/>
    <LoginForm/>
    </>
  )
}
