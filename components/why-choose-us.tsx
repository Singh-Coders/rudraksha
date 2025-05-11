"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Clock, Shield, Headphones } from "lucide-react"

const reasons = [
  {
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Certified Engineers",
    description: "Our team consists of certified professionals with years of industry experience.",
  },
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: "Timely Delivery",
    description: "We pride ourselves on completing projects on schedule without compromising quality.",
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Quality Materials",
    description: "We use only the highest quality materials that meet industry standards and specifications.",
  },
  {
    icon: <Headphones className="w-12 h-12 text-primary" />,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to address your concerns.",
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="section-padding">
      <div className="container" ref={ref}>
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What sets Rudraksha Construction apart from the competition
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-primary text-white p-10 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="mb-6">
                Contact us today for a free consultation and estimate. Let's bring your vision to life!
              </p>
              <a href="#contact" className="btn bg-white text-primary hover:bg-gray-100">
                Get in Touch
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div>Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div>Professional Team</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">20+</div>
                <div>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div>Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
