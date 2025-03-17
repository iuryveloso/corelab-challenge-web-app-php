'use client'
import { AppContext } from "@/context/appContext";
import { useContext, useEffect, useState } from "react";

export default function Login() {
   const {token} = useContext(AppContext)
    const [printToken, setPrintToken] = useState('')  
  
    useEffect(() => {
      setPrintToken(token)
    }, [token])
  return (
    <div>
      <p className="text-5xl">Login Content</p>
      <p className="">token: {printToken}</p>
    </div>
  );
}
