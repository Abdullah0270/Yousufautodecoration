import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default async function Navbar() {
  const settings = await prisma.settings.findFirst();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const companyName = settings?.companyName || "Decoration Shop";
  const words = companyName.split(" ");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full overflow-hidden bg-black/90 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">

        {/* Logo */}

        <Link href="/" className="leading-none">
          <h1 className="text-lg font-black uppercase tracking-wide text-white md:text-2xl">
            {words.slice(0, 2).join(" ")}
          </h1>

          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-orange-400 md:text-sm">
            {words.slice(2).join(" ")}
          </p>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-white transition duration-300 hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* WhatsApp */}

          <a
            href={`https://wa.me/${settings?.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-9 rounded-full bg-orange-500 px-4 text-xs font-bold hover:bg-orange-600 md:h-10 md:px-6 md:text-sm">
              WhatsApp
            </Button>
          </a>

          {/* Mobile Menu */}

          <div className="md:hidden">
            <Sheet>

              <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-l bg-black text-white"
              >

                <div className="mt-10 space-y-2">

                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-lg font-semibold transition hover:bg-orange-500 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  ))}

                </div>

                <div className="mt-10 border-t border-white/10 pt-6">

                  <a
                    href={`https://wa.me/${settings?.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      WhatsApp
                    </Button>
                  </a>

                </div>

              </SheetContent>

            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}