"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const timelineItems = [
  {
    year: "2005",
    title: "Company Founded",
    description: "Rudraksha Construction was established with a vision to transform the construction industry.",
  },
  {
    year: "2010",
    title: "Expansion",
    description: "Expanded operations to include commercial projects and architectural design services.",
  },
  {
    year: "2015",
    title: "100+ Projects",
    description: "Successfully completed over 100 projects with 98% client satisfaction rate.",
  },
  {
    year: "2020",
    title: "Innovation Award",
    description: "Received the National Innovation in Construction Award for sustainable building practices.",
  },
  {
    year: "2023",
    title: "Global Presence",
    description: "Expanded operations internationally with projects in 5 countries.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn about our journey, mission, and vision in the construction industry
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="mb-4">
              Founded in 2005, Rudraksha Construction has grown from a small local contractor to one of the region's
              most respected construction companies. Our journey has been defined by a commitment to quality,
              innovation, and client satisfaction.
            </p>
            <p className="mb-6">
              With a team of experienced professionals and a portfolio of successful projects, we continue to push the
              boundaries of what's possible in construction, always staying true to our core values of integrity,
              excellence, and sustainability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                <p>
                  To deliver exceptional construction services that exceed client expectations while maintaining the
                  highest standards of safety, quality, and environmental responsibility.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                <p>
                  To be the most trusted and innovative construction company, known for transforming spaces and
                  improving lives through our work.
                </p>
              </div>
            </div>
          </motion.div>

          <div ref={ref}>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary"></div>

              {/* Timeline Items */}
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex mb-8 relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-16 text-right mr-4">
                    <span className="font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className="absolute w-4 h-4 bg-primary rounded-full left-1/2 top-1.5 transform -translate-x-1/2"></div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
