"use client";

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionProvider } from "next-auth/react";
import AppBar from './AppBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <SessionProvider>
          <AppBar /> 
          {/* <h1>HOME LAYOUT</h1> */}
          <div>
          {children}
          </div>
      </SessionProvider>
     </body>

    </html>
  )
}
