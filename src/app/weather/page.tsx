"use client"

import { useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import { json } from "stream/consumers";
import axios from "axios";
import { Jost } from "next/font/google";

export default function() { 
    const { data: session } = useSession(); 
    const [json, SetJson] = useState<string>(''); 

  useEffect(() => {  
    console.log(session);
    if(session?.user?.accessToken) { 
      axios.get('http://localhost:7105/WeatherForecast', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.accessToken}` 
        }
      }).then((response) => {
        SetJson(JSON.stringify(response.data) );
      });
    }
  },[]);
    return (
        <>
            <h1>JSON</h1>
            <div>{json}</div>  
        </>
    );
}