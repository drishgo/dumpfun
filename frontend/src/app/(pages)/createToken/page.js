"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { RetroGrid } from "@/components/magicui/retro-grid";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";



const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050314]">
      <RetroGrid opacity={0.16} angle={15} className="bg-blend-darken"></RetroGrid>
 

      <div className="relative flex-auto z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
        {/* <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"><AuroraText>Create Token</AuroraText></span>
            </h1>
          </motion.div> */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 "
          >
          
          <div className="flex h-full w-full font-mono">
  <Card className="relative max-w-2xl w-full mx-4 overflow-hidden bg-[#0a081a]/90 backdrop-blur-2xl border-transparent shadow-xl">
    <CardHeader className="px-8 pt-8">
      <CardTitle className="text-center">
        
      </CardTitle>
      
    </CardHeader>
    <CardContent className="px-8 pb-6">
      <form>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col space-y-3">
            <Label className="text-white/80" htmlFor="tokenName">Token Name</Label>
            <Input 
              id="tokenName" 
              type="text" 
              placeholder="Enter token name"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label className="text-white/80" htmlFor="tokenSymbol">Token Symbol</Label>
            <Input
              id="tokenSymbol"
              type="text"
              placeholder="Enter token symbol (e.g. BTC)"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label className="text-white/80" htmlFor="supply">Total Supply</Label>
            <Input
              id="supply"
              type="number"
              placeholder="Enter total supply"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-center pb-8">
      <RippleButton className="bg-white/5 border-transparent text-white font-mono" >Create</RippleButton>
    </CardFooter>
    <BorderBeam duration={5} size={100} />
    <BorderBeam duration={10} size={100} />
  </Card>
</div>
          </motion.div>

     

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">

          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}