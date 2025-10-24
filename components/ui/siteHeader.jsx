import Link from "next/link";
import { ModeToggle } from "@/components/ui/toggle";
import { Button } from "./button";
import { MobileMenu } from "./dropdown";

export default function SiteHeader() {
  return (
    <header className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Keyfab
          </Link>
        </div>

        {/* Center: Nav (desktop) */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/configure" className="text-sm hover:underline">
            Configurer son clavier
          </Link>
          <Link href="/fonctionnement" className="text-sm hover:underline">
            Fonctionnement
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Nous contacter
          </Link>
        </nav>

        {/* Right: Theme toggle + CTA (desktop) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <Button className={"hidden md:block"}
          >
            <a href="/configure">Configurer son clavier</a>
          </Button>
          <div className="block md:hidden">
            <MobileMenu/>
          </div>
        </div>
      </div>
    </header>
  );
}