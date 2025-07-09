'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/buttons/toggleThemeButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WEBSITE_LOGO_PATH as LOGO_PATH, WEBSITE_NAME, WEBSITE_TITLE_FONT as WEBSITE_FONT } from "@/utils/constants/navbar-constants"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-white shadow-2xl">
      <div className="flex h-20 items-center px-6 relative">
        
        {/* Logo Section with Anime Badge */}
        <div className="flex items-center space-x-3 relative">
          <div className="absolute -top-3 -left-3 bg-black text-white px-2 py-1 font-black text-xs border-2 border-black transform rotate-3">
            CRYPTO
          </div>
          <Link href="/" className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <Image 
                src={LOGO_PATH} 
                alt="Logo" 
                width={40} 
                height={40}
                className="w-10 h-10 border-2 border-black shadow-lg"
              />
            </div>
            <span className={`text-2xl font-black uppercase ${WEBSITE_FONT} transform hover:rotate-1 transition-transform duration-300`}>
              {WEBSITE_NAME}
            </span>
          </Link>
        </div>

        {/* Navigation and Actions */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">


            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/mint" 
                    className="group inline-flex h-12 w-max items-center justify-center rounded-none bg-white px-6 py-3 text-sm font-black uppercase transition-all hover:bg-black hover:text-white border-2 border-black shadow-lg hover:shadow-xl transform hover:rotate-1 hover:scale-105 duration-300"
                  >
                    ⚡ Mint
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/coins" 
                    className="group inline-flex h-12 w-max items-center justify-center rounded-none bg-white px-6 py-3 text-sm font-black uppercase transition-all hover:bg-black hover:text-white border-2 border-black shadow-lg hover:shadow-xl transform hover:-rotate-1 hover:scale-105 duration-300"
                  >
                    🏠 coins
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/trade" 
                    className="group inline-flex h-12 w-max items-center justify-center rounded-none bg-white px-6 py-3 text-sm font-black uppercase transition-all hover:bg-black hover:text-white border-2 border-black shadow-lg hover:shadow-xl transform hover:-rotate-1 hover:scale-105 duration-300"
                  >
                    💰 Trade
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/vote" 
                    className="group inline-flex h-12 w-max items-center justify-center rounded-none bg-white px-6 py-3 text-sm font-black uppercase transition-all hover:bg-black hover:text-white border-2 border-black shadow-lg hover:shadow-xl transform hover:rotate-1 hover:scale-105 duration-300"
                  >
                    ⚡ Vote
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/mycoins" 
                    className="group inline-flex h-12 w-max items-center justify-center rounded-none bg-white px-6 py-3 text-sm font-black uppercase transition-all hover:bg-black hover:text-white border-2 border-black shadow-lg hover:shadow-xl transform hover:rotate-1 hover:scale-105 duration-300"
                  >
                    ⚡ Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Connect Button with Anime Style */}
          <div className="relative">
            <div className="absolute -top-2 -right-2 bg-black text-white px-2 py-1 font-black text-xs border-2 border-black transform -rotate-12">
              WALLET
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <ConnectButton />
            </div>
          </div>
          
         
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-black transform rotate-45"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-black transform rotate-45"></div>
      </div>
    </nav>
  )
}