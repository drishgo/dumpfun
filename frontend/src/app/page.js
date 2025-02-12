import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Rocket, BarChart2, Wallet, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-700">
        <div className="text-2xl font-bold">Dump.fun</div>
        <div className="flex space-x-4">
          <Button variant="ghost">Docs</Button>
          <Button variant="ghost">Community</Button>
          <Button>Launch App</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4">
          The Easiest Way to <span className="text-purple-400">Launch</span> Your Token
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Create, launch, and manage your token in minutes. No coding required.
        </p>
        <div className="flex space-x-4">
          <Input placeholder="Enter token address" className="w-96" />
          <Button className="bg-purple-600 hover:bg-purple-700">Search</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Rocket className="w-8 h-8 mb-4 text-purple-400" />
              <CardTitle>Instant Launch</CardTitle>
              <CardDescription>Launch your token in seconds with no coding required.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart2 className="w-8 h-8 mb-4 text-purple-400" />
              <CardTitle>Real-Time Analytics</CardTitle>
              <CardDescription>Track your token's performance with live analytics.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Wallet className="w-8 h-8 mb-4 text-purple-400" />
              <CardTitle>Secure Wallet</CardTitle>
              <CardDescription>Integrated wallet support for seamless transactions.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="w-8 h-8 mb-4 text-purple-400" />
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Get insights into the latest market trends.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-800">
        <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Token?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of creators and start your journey today.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-700 text-center">
        <p className="text-gray-400">© 2023 PumpClone. All rights reserved.</p>
      </footer>
    </div>
  );
}