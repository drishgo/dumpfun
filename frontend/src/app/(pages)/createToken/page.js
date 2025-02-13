"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RetroGrid } from "@/components/magicui/retro-grid";

export default function CreateTokenPage() {
  const router = useRouter();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const handleCreateToken = () => {
    // Add your logic to create the token here
    console.log("Token Name:", tokenName);
    console.log("Token Symbol:", tokenSymbol);
    console.log("Total Supply:", supply);

    // Redirect to a success page or home page after creating the token
    router.push("/");
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-950 text-white flex items-center justify-center">
      <Card className="w-full max-w-md z-10 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Token</CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to create your token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateToken();
            }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="tokenName" className="block text-sm font-medium text-gray-300">
                  Token Name
                </label>
                <Input
                  id="tokenName"
                  type="text"
                  placeholder="Enter token name"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tokenSymbol" className="block text-sm font-medium text-gray-300">
                  Token Symbol
                </label>
                <Input
                  id="tokenSymbol"
                  type="text"
                  placeholder="Enter token symbol"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="supply" className="block text-sm font-medium text-gray-300">
                  Total Supply
                </label>
                <Input
                  id="supply"
                  type="number"
                  placeholder="Enter total supply"
                  value={supply}
                  onChange={(e) => setSupply(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Create Token
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <RetroGrid />
    </div>
  );
}