"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Building, HardHat, Hammer, Phone } from "lucide-react"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="relative mr-2">
            <Building className={`w-10 h-10 ${scrolled ? "text-primary" : "text-white"} group-hover:text-primary transition-colors duration-300`} />
            <HardHat className={`w-6 h-6 absolute -top-2 -right-2 text-amber-500`} />
            <Hammer className={`w-5 h-5 absolute -bottom-1 -left-1 transform rotate-45 ${scrolled ? "text-gray-700" : "text-gray-200"} group-hover:text-gray-700 transition-colors duration-300`} />
          </div>
          <span className={`font-bold text-xl ${scrolled ? "text-gray-800" : "text-white"} group-hover:text-primary transition-colors duration-300`}>
            Rudraksha Construction
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className={`relative px-4 py-2 text-base rounded-md transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? scrolled 
                    ? "text-primary font-medium" 
                    : "text-white font-medium bg-white/10"
                  : scrolled 
                    ? "text-gray-800 hover:text-primary" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="activeSection"
                  className={`absolute bottom-0 left-1/2 w-1/2 h-0.5 -translate-x-1/2 ${
                    scrolled ? "bg-primary" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden lg:block">
          <a 
            href="tel:+9111040606" 
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Phone className="w-4 h-4 mr-2" />
            +91 9111040606
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 focus:outline-none ${scrolled ? "text-gray-800" : "text-white"}`}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white shadow-lg py-4 px-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`px-4 py-3 rounded-md transition-colors duration-200 ${
                      activeSection === link.href.substring(1)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a 
                  href="tel:+919111040606" 
                  className="flex items-center mt-2 bg-primary text-white px-4 py-3 rounded-md"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +91 9111040606
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
