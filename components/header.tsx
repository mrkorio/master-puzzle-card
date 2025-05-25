"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Gamepad, Info, HelpCircle, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Play", path: "/game", icon: <Gamepad className="w-5 h-5 mr-2" /> },
    { name: "Instructions", path: "/instructions", icon: <HelpCircle className="w-5 h-5 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Gamepad className="h-8 w-8 text-accent mr-2" />
              <span className="font-bold text-xl text-foreground">Memory Masters</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 rounded-md text-foreground/80 hover:bg-accent/10 hover:text-accent"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/95 backdrop-blur-md shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;