import React from 'react'
import LoginForm from './LoginForm'
import { Topnav } from "@/components/navbar/topnav";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';

export default function Login() {
  return (
    <>
     <div>
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s=document.createElement("script");
              s.src='https://embed.tawk.to/66c9e94350c10f7a009fffd6/1i62bec3o'; // Replace with your Tawk.to ID
              s.async=true;
              s.charset='UTF-8';
              s.crossOrigin='*';
              document.head.appendChild(s);
            })();
          `,
        }}
      />
    </div>
        <GoogleAnalytics/>
    <Topnav/>
    <div className='p-10'/>
    <LoginForm/>
    </>
  )
}
