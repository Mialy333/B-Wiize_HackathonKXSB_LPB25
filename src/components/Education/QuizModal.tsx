import React, { useState } from 'react';
import { Quiz, QuizQuestion } from './types';
import { useTheme } from '../../ThemeContext';
import { Trophy, X, ChevronRight, CheckCircle, XCircle, Cat } from 'lucide-react';

interface QuizModalProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose, onComplete }) => {
  const { isDark } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quiz.questions.length) * 100;
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    const score = calculateScore();
    onComplete(score);
  };

  const currentQuestionData = quiz.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full rounded-2xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-xl overflow-hidden`}>
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {quiz.title}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {quiz.description}
          </p>
        </div>

        {/* Quiz Content */}
        <div className="p-6">
          {!showResults ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <div className={`h-1 flex-1 mx-4 rounded-full ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <h4 className={`text-lg font-medium mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentQuestionData.question}
                </h4>
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !hasAnswered && handleAnswer(index)}
                      disabled={hasAnswered}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        hasAnswered
                          ? index === currentQuestionData.correctAnswer
                            ? 'bg-green-100 text-green-800 border-green-500'
                            : index === selectedAnswers[currentQuestion]
                            ? 'bg-red-100 text-red-800 border-red-500'
                            : isDark
                            ? 'bg-gray-700 text-gray-400'
                            : 'bg-gray-100 text-gray-500'
                          : isDark
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      } ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-2'
                          : 'border-2 border-transparent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {hasAnswered && showExplanation && (
                <div className={`p-4 rounded-xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {currentQuestionData.explanation}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between">
                {hasAnswered && !showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className={`px-4 py-2 rounded-lg ${
                      isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Show Explanation
                  </button>
                )}
                {hasAnswered && (
                  <button
                    onClick={handleNext}
                    className="ml-auto px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                calculateScore() >= 70
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {calculateScore() >= 70 ? (
                  <Trophy className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              
              <h4 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quiz Complete!
              </h4>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                You scored {calculateScore()}%
              </p>

              {calculateScore() >= 70 && (
                <div className={`p-4 rounded-xl mb-6 ${
                  isDark ? 'bg-purple-900/30' : 'bg-purple-50'
                }`}>
                  <h5 className={`font-medium mb-2 ${
                    isDark ? 'text-purple-300' : 'text-purple-900'
                  }`}>
                    Rewards Earned
                  </h5>
                  <div className="flex items-center justify-center space-x-4">
                    <div className={`px-3 py-1.5 rounded-full ${
                      isDark ? 'bg-purple-900/50' : 'bg-purple-100'
                    }`}>
                      <span className={isDark ? 'text-purple-300' : 'text-purple-900'}>
                        +{quiz.reward.xp} XP
                      </span>
                    </div>
                    {quiz.reward.badge && (
                      <div className={`px-3 py-1.5 rounded-full flex items-center ${
                        isDark ? 'bg-purple-900/50' : 'bg-purple-100'
                      }`}>
                        <Cat className={`w-3 h-3 mr-1 ${
                          isDark ? 'text-purple-300' : 'text-purple-900'
                        }`} />
                        <span className={isDark ? 'text-purple-300' : 'text-purple-900'}>
                          {quiz.reward.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleComplete}
                className="w-full py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Complete Unit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};