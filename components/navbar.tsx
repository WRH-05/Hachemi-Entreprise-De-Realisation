"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { usePathname } from "next/navigation"

const getRoutes = (t: any) => [
  { href: "/about", label: t.nav.about },
  { href: "/services", label: t.nav.services },
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/faq", label: t.nav.faq },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { translations: t, dir } = useLanguage()
  const routes = getRoutes(t)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled ? "bg-white/10 shadow-md" : "bg-white/1"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/her-white.png"
              alt="HER Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors relative group ${
                  route.href === pathname ? "text-primary" : isScrolled ? "hover:text-primary" : "text-white hover:text-gray-200"
                }`}
              >
                {route.label}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    route.href === pathname ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-2 border-current bg-white/80 backdrop-blur-sm shadow-md"
              >
                <Menu className="h-5 w-5 text-primary" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "left" : "right"} className="w-[80%] max-w-sm">
              <div className="mt-6 flex flex-col space-y-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg font-medium transition-colors ${
                      route.href === pathname ? "text-primary" : "hover:text-primary"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="py-4">
                  <LanguageSwitcher isScrolled={isScrolled} />
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
