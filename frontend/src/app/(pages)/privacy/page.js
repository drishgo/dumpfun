"use client";

// import  {ethers} from ethers;

import { motion } from "framer-motion";
import { Playfair_Display} from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { MorphingText } from "@/components/magicui/morphing-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Footer from "@/components/Footer";
import { WordRotate } from "@/components/magicui/word-rotate";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { AuroraText } from "@/components/magicui/aurora-text";
import { abi } from "@/abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";



const texts = [
  "नमस्ते",    // Hindi
  "Welcome",   // English
  "Willkommen",// German
  "欢迎",       // Chinese
  "ようこそ",   // Japanese
  "환영합니다",  // Korean
  "ברוך הבא"    // Hebrew
];



const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
});

function ElegantShape({
  className,
  delay = 0,
  width = 600,
  height = 100,
  rotate = 0,
  gradient = "from-black/[0.08]",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric() {

const handleSearch= ()=> {
  console.log("Searching for: ",searchTerm);
}


  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <>
    <section>
    <div className="relative min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#c01d00d2]">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/[0.05] via-transparent to-black/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto my-96 text-center">
        
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"><Link href="/" ><span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                  playfair.className
                )}
              >
                Dump.fun
              </span></Link></span>
               </h1>
              
           
          </motion.div>
          

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            
            <p className={cn(
                  " font-mono text-base sm:text-lg md:text-xl text-white mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto my-0.5 px-4"
                )}>
              All and every transactions made on this platform are the sole responsibility of the party making the transactions, and every party carrying out transactions are aware of the risks that are carried with the platform. 
              The platform or its beneficiaries are NOT liable for the financial losses or gains made by the user.  
            </p>
          </motion.div>
          
    
          
          
          
          
          
        </div>
        
       
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      
    </div>
    </section>
    <hr/>
    
    <Footer className="relative"></Footer>
    </>
  );
}