import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function Footer() {
  return (
    
    <footer className="bg-gradient-to-tl from-slate-950 to-black text-white py-12 font-mono">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Drishgo</h3>
            <p className="text-gray-400">Building the future of Discord bots, one click at a time.</p>
          </div>
    
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-extrabold">
                   X
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <GitHubLogoIcon></GitHubLogoIcon>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <DiscordLogoIcon></DiscordLogoIcon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Drishgo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

