"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, User, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    position: "Homeowner",
    image: "https://img.freepik.com/free-photo/portrait-handsome-indian-businessman-wearing-suit_23-2148266352.jpg",
    bgColor: "bg-blue-100",
    rating: 5,
    text: "Rudraksha Construction transformed our house into a dream home. Their attention to detail and commitment to quality is unmatched. We couldn't be happier with the results!",
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "CEO, Patel Enterprises",
    image: "https://img.freepik.com/free-photo/young-beautiful-woman-smart-casual-wear-holding-digital-tablet-looking-camera-smiling_23-2148224421.jpg",
    bgColor: "bg-purple-100",
    rating: 5,
    text: "Working with Rudraksha on our corporate headquarters was a seamless experience. They delivered on time, within budget, and exceeded our expectations in every way.",
  },
  {
    id: 3,
    name: "Vikram Singh",
    position: "Property Developer",
    image: "https://img.freepik.com/free-photo/confident-indian-businessman-professional-portrait-smiling-company-executive_53876-129548.jpg",
    bgColor: "bg-green-100",
    rating: 5,
    text: "As a developer, I've worked with many construction companies, but Rudraksha stands out for their professionalism, expertise, and innovative solutions. They're now our go-to partner for all projects.",
  },
  {
    id: 4,
    name: "Ananya Mehta",
    position: "Restaurant Owner",
    image: "https://img.freepik.com/free-photo/cheerful-indian-businesswoman-professional-portrait-smiling-female-executive_53876-129551.jpg",
    bgColor: "bg-amber-100",
    rating: 5,
    text: "The renovation of our restaurant was handled with such care and precision. Rudraksha understood our vision and brought it to life beautifully while minimizing disruption to our business.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isMobile, setIsMobile] = useState(false)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      nextTestimonial()
    }, 6000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container" ref={ref}>
        <div className="section-title">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-2"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Client Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover what our clients say about working with us
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative h-[450px] md:h-[400px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 h-full flex flex-col border border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-12 h-12 text-primary opacity-20" />
                    <div className="flex">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl text-gray-700 mb-8 flex-grow leading-relaxed">
                    "{testimonials[current].text}"
                  </p>
                  
                  <div className="flex items-center border-t border-gray-100 pt-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                      {testimonials[current].image ? (
                        <img 
                          src={testimonials[current].image} 
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${testimonials[current].bgColor}`}>
                          <User className="w-8 h-8 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{testimonials[current].name}</h4>
                      <p className="text-primary">{testimonials[current].position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm border border-gray-200 transition-colors duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="flex justify-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                    index === current 
                      ? "bg-primary w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm border border-gray-200 transition-colors duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
