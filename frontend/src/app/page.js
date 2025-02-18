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
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
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

export default function HeroGeometric({ badge = "Kokonut UI", title1 = "Elevate Your", title2 = "Digital Vision" }) {
  const [cards,setCard]= useState([]);
const [loading,setLoading] = useState(true);
const [searchTerm,setSearchTerm] = useState('');

useEffect(()=>{
  const fetchToken = async () =>{
    try{
      const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    console.log(provider)
    const contract = new ethers.Contract(process.env.ETH_TESTNET_CONTRACT_ADDRESS,abi,provider);
    const tokens = await contract.getAllMemeTokens();

    setCard(
      tokens.map(token=>({
        name:token.name,
        symbol: token.symbol,
        description: token.description,
        tokenImageUrl: token.tokenImageUrl,
        fundingRaised: ethers.formatEther(token.fundingRaised,'ether'),
        tokenAddress: token.tokenAddress,
       creatorAddress: token.creatorAddress,
      }))
    );
    
    
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  fetchToken();
},[]);
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
    <div className="relative min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050314]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

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
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
           
            <span className="text-sm text-white/60 tracking-wide"><Link href="https://x.com/realdrishtant">x</Link></span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"><Link href="/createToken" ><span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                  playfair.className
                )}
              >
                Dump.fun
              </span></Link></span>
               </h1>
               <hr className=""/>
              <h3>
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                  playfair.className
                )}
              >
                <MorphingText className="text-white p-3 my-5"texts={texts}/>
              </span>
            </h3>
          </motion.div>
          

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            
            <p className={cn(
                  " font-mono text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto my-0.5 px-4"
                )}>
              Create your own meme tokens on the Ethereum blockchain. No code required.
            </p>
          </motion.div>
          
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
           
          >
           <Link href="/createToken"><InteractiveHoverButton className="font-mono my-5">Launch Token</InteractiveHoverButton></Link>
          </motion.div>
    
          
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
           
          >
            <div className="text-center">
          <Input
            type="text"
            className="text-white gap-8"
            placeholder="search for token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Button className="p-3 m-6 " onClick={handleSearch}>Search</Button>
        </div>
          </motion.div>
        
          
        {loading ? (
          <p className="text-white font-mono">Loading...</p>
        ) : (
          <div className="card-list">
    
            {cards.slice(1).map((card, index) => (
              <div key={index} className="card" onClick={() => navigateToTokenDetail(card)}>
               <Card>
               <div className="card-content">
                  <CardHeader>
                  <img src={card.tokenImageUrl} alt={card.name} className="card-image"/>
                  </CardHeader>
                  <div className="card-text">
                 <CardContent>
                 <h2>Created by {card.creatorAddress}</h2>
                    <p>Funding Raised: {card.fundingRaised} ETH</p>
                    <p>{card.name} (ticker: {card.symbol})</p>
                    <p>{card.description}</p>
                 </CardContent>
                  </div>
                </div>
               </Card>
              </div>
            ))}
          </div>
        )}
          
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