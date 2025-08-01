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
    <section id="quiz" className="py-10 bg-friendGray rounded-xl my-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-friendWhite">Friendship Quiz</h2>
      
      <div className="max-w-2xl mx-auto bg-friendBlack p-8 rounded-xl shadow-lg border border-friendGray/50">
        {!showResult ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-friendLightGray">
                <span>Question {currentQuestion + 1}/{quizQuestions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-friendGray rounded-full h-2.5">
                <div 
                  className="bg-electricBlue h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <motion.h3 
              className="text-2xl font-bold mb-6 text-friendWhite"
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
                        ? 'bg-mintGreen/20 border-mintGreen text-friendWhite'
                        : 'bg-hotPink/20 border-hotPink text-friendWhite'
                      : selectedAnswer !== null && option === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-mintGreen/20 border-mintGreen text-friendWhite'
                      : 'hover:bg-electricBlue/10 border-friendGray text-friendWhite'
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
            <h3 className="text-3xl font-bold mb-4 text-electricBlue">{getResult().title}</h3>
            <p className="text-xl mb-6 text-friendLightGray">{getResult().description}</p>
            <p className="text-2xl mb-6 text-friendWhite">
              You scored {score} out of {quizQuestions.length}!
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-electricBlue hover:bg-hotPink text-friendWhite rounded-lg font-medium transition-colors hover-glow"
            >
              Take Quiz Again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}