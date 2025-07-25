import { useState } from 'react'
import { motion } from 'framer-motion'
import { quizQuestions, quizResults } from '../data/quiz'

export default function FriendshipQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const getResult = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return quizResults[0]
    if (percentage >= 50) return quizResults[1]
    return quizResults[2]
  }

  return (
    <section id="quiz" className="py-10 bg-purple-50 rounded-xl my-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Friendship Quiz</h2>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {!showResult ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Question {currentQuestion + 1}/{quizQuestions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <motion.h3 
              className="text-2xl font-bold mb-6"
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {quizQuestions[currentQuestion].question}
            </motion.h3>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === option
                      ? option === quizQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : selectedAnswer !== null && option === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'hover:bg-purple-50 border-gray-200'
                  }`}
                  whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                  whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-4">{getResult().title}</h3>
            <p className="text-xl mb-6">{getResult().description}</p>
            <p className="text-2xl mb-6">
              You scored {score} out of {quizQuestions.length}!
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Take Quiz Again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}