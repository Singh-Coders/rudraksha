"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Construction, HardHat, Hammer, Building, ArrowUp, Send } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative bg-gray-900 text-white pt-20 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
      </div>
      
      {/* Scroll to top button */}
      <div className="absolute top-0 right-8 transform -translate-y-1/2">
        <button 
          onClick={scrollToTop}
          className="bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          <motion.div 
            className="md:col-span-4 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center group">
                <div className="relative mr-2">
                  <Building className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
                  <HardHat className="w-6 h-6 absolute -top-2 -right-2 text-amber-500" />
                  <Hammer className="w-5 h-5 absolute -bottom-1 -left-1 transform rotate-45 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" />
                </div>
                <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Rudraksha Construction
                </span>
              </Link>
            </div>
            <p className="text-gray-400 mb-8 md:pr-8 leading-relaxed">
              Building the future with innovation, quality, and integrity. Your trusted partner for all construction
              needs. Founded by Arendra Singh Rajput, we bring over 15 years of expertise to every project.
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <MapPin className="text-primary mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">In front of DMart, Kolar Road, Bhopal, Madhya Pradesh 462042, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-3 flex-shrink-0" size={18} />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors duration-300">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-3 flex-shrink-0" size={18} />
                <a href="mailto:info@rudrakshaconst.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  info@rudrakshaconst.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 text-primary transition-transform duration-300 group-hover:translate-x-1">›</span> 
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="md:col-span-3 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              <span className="relative z-10">Our Services</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Residential Construction",
                "Commercial Projects",
                "Architecture & Design",
                "Renovation",
                "Project Management",
                "Consulting Services"
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 text-primary transition-transform duration-300 group-hover:translate-x-1">›</span> 
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="md:col-span-3 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates on projects, industry insights, and company news.
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-r-md transition-colors duration-300 flex items-center"
                aria-label="Subscribe"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                  aria-label={social.href.split("https://")[1].split(".com")[0]}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} Rudraksha Construction. All Rights Reserved. Created by Arendra Singh Rajput.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
