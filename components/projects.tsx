"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Home, Building2, Building, History, LandPlot, ShoppingBag } from "lucide-react"

const categories = ["All", "Residential", "Commercial", "Architecture", "Renovation"]

const projects = [
  {
    id: 1,
    title: "Modern Residence",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    icon: <Home className="w-24 h-24 text-primary" />,
    bgColor: "bg-blue-50",
    description: "Luxury home with contemporary design and sustainable features.",
  },
  {
    id: 2,
    title: "Corporate Headquarters",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60",
    icon: <Building2 className="w-24 h-24 text-primary" />,
    bgColor: "bg-green-50",
    description: "State-of-the-art office building with innovative workspace solutions.",
  },
  {
    id: 3,
    title: "Urban Apartment Complex",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
    icon: <Building className="w-24 h-24 text-primary" />,
    bgColor: "bg-purple-50",
    description: "Mixed-use development with residential and retail spaces.",
  },
  {
    id: 4,
    title: "Historic Building Restoration",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=800&auto=format&fit=crop&q=60",
    icon: <History className="w-24 h-24 text-primary" />,
    bgColor: "bg-amber-50",
    description: "Careful restoration of a 100-year-old landmark building.",
  },
  {
    id: 5,
    title: "Eco-Friendly Home",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    icon: <LandPlot className="w-24 h-24 text-primary" />,
    bgColor: "bg-emerald-50",
    description: "Net-zero energy home with sustainable materials and systems.",
  },
  {
    id: 6,
    title: "Shopping Mall",
    category: "Commercial",
    image: "/images/shopping mall.jpg",
    icon: <ShoppingBag className="w-24 h-24 text-primary" />,
    bgColor: "bg-rose-50",
    description: "Modern retail space with innovative design and customer experience focus.",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[0]>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container" ref={ref}>
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our portfolio of successful construction projects
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${project.bgColor}`}>
                      {project.icon}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-96">
                  {selectedProject.image ? (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${selectedProject.bgColor}`}>
                      {selectedProject.icon}
                    </div>
                  )}
                  <button
                    className="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                    <span className="bg-primary text-white px-4 py-1 rounded-full">{selectedProject.category}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{selectedProject.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">Project Details</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Location: New York, NY</li>
                        <li>Size: 5,000 sq ft</li>
                        <li>Completed: 2023</li>
                        <li>Value: $2.5 million</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Services Provided</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Architectural Design</li>
                        <li>Construction Management</li>
                        <li>Interior Design</li>
                        <li>Landscaping</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
