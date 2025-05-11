"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Home, Building2, PenTool, Hammer } from "lucide-react"

const services = [
  {
    icon: <Home className="w-12 h-12 text-primary" />,
    title: "Residential Construction",
    description: "Custom homes, renovations, and additions tailored to your lifestyle and preferences.",
    features: ["Custom Home Building", "Home Renovations", "Additions & Extensions", "Interior Remodeling"],
  },
  {
    icon: <Building2 className="w-12 h-12 text-primary" />,
    title: "Commercial Projects",
    description: "Comprehensive commercial construction services for businesses of all sizes.",
    features: ["Office Buildings", "Retail Spaces", "Restaurants", "Industrial Facilities"],
  },
  {
    icon: <PenTool className="w-12 h-12 text-primary" />,
    title: "Architecture & Design",
    description: "Innovative architectural solutions that blend functionality, aesthetics, and sustainability.",
    features: ["Architectural Planning", "3D Visualization", "Sustainable Design", "Permit Acquisition"],
  },
  {
    icon: <Hammer className="w-12 h-12 text-primary" />,
    title: "Renovation",
    description: "Transforming existing spaces with modern updates and functional improvements.",
    features: ["Historic Renovations", "Kitchen & Bath Remodels", "Structural Repairs", "Energy Efficiency Upgrades"],
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="services" className="section-padding">
      <div className="container" ref={ref}>
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive construction solutions tailored to your needs
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
