import { motion } from 'framer-motion'
import { incidents } from '../data/incidents'

export default function HallOfShame() {
  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Hall of Shame</h2>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <motion.div
              key={incident.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {incident.image && (
                <img
                  src={incident.image}
                  alt={incident.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{incident.title}</h3>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {incident.severity}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{incident.date}</p>
                <p className="text-gray-700">{incident.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}