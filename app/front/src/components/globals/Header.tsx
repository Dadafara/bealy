import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "New", href: "/new" },
  { label: "Past", href: "/past" },
  { label: "Comments", href: "/comments" },
  { label: "Ask", href: "/ask" },
  { label: "Show", href: "/show" },
  { label: "Jobs", href: "/jobs" },
  { label: "Submit", href: "/submit" },
  { label: "Login", href: "/account/login" },
];

export default function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center justify-between px-4 max-w-7xl mx-auto">
      <Link href="#" className="flex items-center gap-1" prefetch={false}>
        <Image
          src="https://cdn.bealy.io/icons/bealyFavicon512.png"
          alt="Logo"
          width={50}
          height={50}
          className="w-8 md:w-16"
        />
        <span className="text-xl text-bold">Hacker News</span>
      </Link>
      <nav className="hidden lg:flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group inline-flex w-max items-center justify-center py-0 border-b border-transparent transition-all duration-300 hover:border-b-gray-400 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <img
              src="https://cdn.bealy.io/icons/bealyFavicon512.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="sr-only">Hacker News</span>
          </Link>
          <div className="grid gap-2 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-semibold lg:group lg:inline-flex lg:w-max lg:items-center lg:justify-center border-b border-transparent transition-all duration-300 hover:text-black/70"
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
