"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { translations: t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer?.about?.title || "About HER"}</h3>
            <p className="text-sm opacity-80">
              {t.footer?.about?.description ||
                "Professional construction services for all your building, renovation, and demolition needs."}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer?.quickLinks || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm opacity-80 hover:opacity-100">
                  {t.nav?.about || "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm opacity-80 hover:opacity-100">
                  {t.nav?.services || "Services"}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm opacity-80 hover:opacity-100">
                  {t.nav?.projects || "Projects"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm opacity-80 hover:opacity-100">
                  {t.nav?.contact || "Contact"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer?.contactInfo || "Contact Info"}</h3>
            <ul className="space-y-2">
              <li className="text-sm opacity-80">Bd Basta Ali </li>
              <li className="text-sm opacity-80">ALGER BAB EL OUED</li>
              <li className="text-sm opacity-80">Phone: +213550568438</li>
              <li className="text-sm opacity-80">Email: hachemibat@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer?.followUs || "Follow Us"}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          <p>
            &copy; {new Date().getFullYear()} Hachemi Entreprise de Réalisation.{" "}
            {t.footer?.rights || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}

