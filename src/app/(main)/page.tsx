'use client'
import { AppContext } from "@/context/appContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const {token} = useContext(AppContext)
  const [printToken, setPrintToken] = useState('')  

  useEffect(() => {
    setPrintToken(token)
  }, [token])
  
  return (
    <div>
      <div className="text-5xl text-amber-900">
        Main Page
      </div>
      <p>token: {printToken}</p>
    </div>
  );
}
