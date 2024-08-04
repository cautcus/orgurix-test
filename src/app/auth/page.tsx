import React from 'react'
import LoginForm from './LoginForm'
import { Topnav } from "@/components/navbar/topnav";

export default function Login() {
  return (
    <>
    <Topnav/>
    <div className='p-10'/>
    <LoginForm/>
    </>
  )
}
