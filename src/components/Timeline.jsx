import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TimelineItem = ({ event }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12 flex flex-col md:flex-row items-start"
    >
      <div className="w-full md:w-1/4">
        <h3 className="text-2xl font-bold text-purple-600">{event.date}</h3>
        <span className="text-4xl">{event.emoji}</span>
      </div>
      <div className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow-lg">
        <h4 className="text-2xl font-bold mb-2">{event.title}</h4>
        <p className="text-gray-600 mb-4">{event.description}</p>
        {event.image && (
          <img 
            src={event.image} 
            alt={event.title} 
            className="rounded-lg w-full max-w-md"
          />
        )}
      </div>
    </motion.div>
  )
}

export default function Timeline({ events }) {
  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Our Timeline</h2>
      <div className="container mx-auto px-4">
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}