import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interviewer-AI",
  description: "Use our interactive tools to practice common interview questions and get real-time feedback.",

};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
      <html lang="en">
    <body className={inter.className}>
    <Toaster />
      {children}
      </body>
  </html> 
  </ClerkProvider>
    
  );
}
