"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Construction-themed Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-20" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=2000&auto=format&fit=crop&q=80" 
            alt="Construction site" 
            className="w-full h-full object-cover transition-transform duration-10000 ease-in-out"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay z-10" />
      </div>

      {/* Content */}
      <div className="container relative z-20 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full"
        >
          <div className="h-1 w-24 bg-primary mx-auto" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-extrabold tracking-tight"
        >
          Building the Future, <br />
          <span className="text-primary">Brick by Brick</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light"
        >
          Transforming visions into reality with excellence, innovation, and integrity.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a 
            href="#contact" 
            className="btn btn-primary text-lg px-8 py-4 rounded-full group"
          >
            Get a Quote
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a 
            href="#projects" 
            className="btn btn-outline text-lg px-8 py-4 rounded-full mt-4 sm:mt-0"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        onClick={scrollToNext}
      >
        <ChevronDown className="text-white w-10 h-10" />
      </motion.div>

      {/* Reference for scroll */}
      <div ref={scrollRef} className="absolute bottom-0" />
    </section>
  )
}
