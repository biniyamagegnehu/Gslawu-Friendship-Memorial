import { motion } from 'framer-motion'
import { chatMessages } from '../data/chatMessages'

export default function GroupChat() {
  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Classic Group Chat Moments</h2>
      
      <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-3xl shadow-inner">
        <div className="bg-white p-4 rounded-2xl">
          <div className="flex items-center mb-4 pb-2 border-b">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              GC
            </div>
            <div className="ml-3">
              <h3 className="font-bold">Squad Chat</h3>
              <p className="text-sm text-gray-500">5 members</p>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {chatMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.sender === 'Alex' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.sender === 'Alex'
                      ? 'bg-purple-500 text-white rounded-br-none'
                      : 'bg-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{message.sender}</div>
                  <p>{message.message}</p>
                  <div className="text-right mt-1">
                    <span className="text-xs opacity-70">{message.time}</span>
                    {message.reaction && (
                      <span className="ml-1">{message.reaction}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center border-t pt-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled
            />
            <button className="ml-2 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}