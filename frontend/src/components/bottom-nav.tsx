"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Plus, History, User } from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pos", label: "POS", icon: ShoppingCart },
    { href: "/add", label: "Add", icon: Plus },
    { href: "/history", label: "History", icon: History },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around py-2">

      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm ${
              isActive ? "text-black" : "text-gray-500"
            }`}
          >
            <Icon size={22} />
            {item.label}
          </Link>
        )
      })}

    </div>
  )
}