import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Trophy,
  RefreshCcw,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  GraduationCap,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import { EducationProps, EducationData, DailyChallenge } from "./types";
import { UnitCard } from "./UnitCard";
import { mockEducationData } from "./mockData";
import { useTheme } from "../../ThemeContext";
import { CelebrationModal } from "./CelebrationModal";
import { AudioPlayer } from "./AudioPlayer";
import { QuizModal } from "./QuizModal";

// Component for displaying comments
const CommentSection = ({ comments }) => {
  const { isDark } = useTheme();

  if (!comments || comments.length === 0) {
    return (
      <div
        className={`text-center py-4 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={`p-4 rounded-lg ${
            isDark ? "bg-gray-700/50" : "bg-gray-100"
          }`}
        >
          <div className="flex items-start space-x-3">
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <h4
                  className={`font-medium text-sm ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {comment.author}
                </h4>
                <span
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {comment.text}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className={`flex items-center text-xs ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-500 hover:text-purple-600"
                  }`}
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  Like ({comment.likes})
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Feedback Chatbot component
const FeedbackChatbot = ({ unitId, onFeedback }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFeedback = (type) => {
    onFeedback?.(unitId, type);
    setHasSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setHasSubmitted(false);
    }, 2000);
  };

  if (!unitId) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {isOpen ? (
        <div
          className={`p-4 rounded-xl shadow-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          } max-w-xs`}
        >
          {hasSubmitted ? (
            <div className="text-center py-2">
              <p
                className={`${
                  isDark ? "text-teal-400" : "text-teal-600"
                } font-medium`}
              >
                Thanks for your feedback!
              </p>
            </div>
          ) : (
            <>
              <p
                className={`text-sm mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Was this unit helpful?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleFeedback("happy")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <span className="text-2xl">😃</span>
                </button>
                <button
                  onClick={() => handleFeedback("neutral")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <span className="text-2xl">😐</span>
                </button>
                <button
                  onClick={() => handleFeedback("sad")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <span className="text-2xl">😕</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-3 rounded-full shadow-lg ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } hover:shadow-xl transition-shadow`}
        >
          <span className="text-xl">💬</span>
        </button>
      )}
    </div>
  );
};

const SkeletonLoader: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div
            className={`p-6 rounded-xl border-2 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${
                  isDark ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
              <div className="ml-4 flex-1">
                <div
                  className={`h-4 ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-1/3`}
                />
                <div
                  className={`h-3 ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  } rounded w-1/4 mt-2`}
                />
              </div>
            </div>
            <div
              className={`h-4 ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              } rounded w-3/4 mb-4`}
            />
            <div
              className={`h-2 ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              } rounded-full`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="text-center py-8">
    <p className="text-red-500 mb-2">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center justify-center mx-auto text-purple-600 hover:text-purple-800 transition-colors"
      >
        <RefreshCcw className="w-4 h-4 mr-1" />
        Retry
      </button>
    )}
  </div>
);

export const Education: React.FC<EducationProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onUnitComplete,
  onQuizComplete,
  onVote,
  onFeedback,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<EducationData | undefined>();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<
    "kitten" | "curious" | "wise" | null
  >(null);
  const [activeUnitId, setActiveUnitId] = useState<number | null>(null);
  const [activeModuleGroup, setActiveModuleGroup] = useState<
    "intro" | "core" | "advanced"
  >("intro");
  const [showQuiz, setShowQuiz] = useState(false);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (propData) {
      setData(propData);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockEducationData);
    } catch (err) {
      setError("Failed to load education data");
    } finally {
      setIsLoading(false);
    }
  }, [propData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuizComplete = (unitId: number, score: number) => {
    // Check if this was a badge-earning unit
    const unit =
      data?.moduleGroups.intro.units.find((u) => u.id === unitId) ||
      data?.moduleGroups.core.units.find((u) => u.id === unitId) ||
      data?.moduleGroups.advanced.units.find((u) => u.id === unitId);

    if (unit?.quiz.reward.badge && score >= 70) {
      if (unit.quiz.reward.badge === "Kitten Learner") {
        setCelebrationType("kitten");
        setShowCelebration(true);
      } else if (unit.quiz.reward.badge === "Curious Feline") {
        setCelebrationType("curious");
        setShowCelebration(true);
      } else if (unit.quiz.reward.badge === "Wise Whiskers") {
        setCelebrationType("wise");
        setShowCelebration(true);
      }
    }

    // Update unit status
    if (data) {
      const updatedModuleGroups = { ...data.moduleGroups };

      // Find which module group contains this unit
      Object.keys(updatedModuleGroups).forEach((groupKey) => {
        const group =
          updatedModuleGroups[groupKey as keyof typeof updatedModuleGroups];
        const unitIndex = group.units.findIndex((u) => u.id === unitId);

        if (unitIndex !== -1) {
          // Update the unit status
          group.units[unitIndex] = {
            ...group.units[unitIndex],
            status: "completed",
            progress: {
              ...group.units[unitIndex].progress,
              current: group.units[unitIndex].progress.total,
            },
          };

          // Unlock the next unit if it exists
          if (unitIndex + 1 < group.units.length) {
            group.units[unitIndex + 1] = {
              ...group.units[unitIndex + 1],
              status: "in-progress",
            };
          }

          // If this was the last unit in a group, unlock the next group
          if (unitIndex === group.units.length - 1) {
            if (groupKey === "intro" && updatedModuleGroups.core) {
              updatedModuleGroups.core.units[0].status = "in-progress";
            } else if (groupKey === "core" && updatedModuleGroups.advanced) {
              updatedModuleGroups.advanced.units[0].status = "in-progress";
            }
          }
        }
      });

      // Update total progress
      const totalCompleted = Object.values(updatedModuleGroups).reduce(
        (sum, group) =>
          sum + group.units.filter((u) => u.status === "completed").length,
        0
      );

      // Update user XP
      const earnedXP =
        score >= 70
          ? unit?.quiz.reward.xp || 0
          : Math.floor((unit?.quiz.reward.xp || 0) / 2);

      setData({
        ...data,
        moduleGroups: updatedModuleGroups,
        totalProgress: {
          ...data.totalProgress,
          completed: totalCompleted,
        },
        userProgress: {
          ...data.userProgress,
          xp: data.userProgress.xp + earnedXP,
          lastCompleted: new Date().toISOString(),
        },
      });
    }

    onQuizComplete?.(unitId, score);
  };

  const handleUnitSelect = (unitId: number) => {
    setActiveUnitId(unitId);
    onUnitComplete?.(unitId);
  };

  const handleAudioComplete = () => {
    console.log("Audio playback completed");
    // You could update progress here
  };

  const handleVote = (unitId: number, voteType: "up" | "down") => {
    if (!data) return;

    const updatedModuleGroups = { ...data.moduleGroups };

    // Find which module group contains this unit
    Object.keys(updatedModuleGroups).forEach((groupKey) => {
      const group =
        updatedModuleGroups[groupKey as keyof typeof updatedModuleGroups];
      const unitIndex = group.units.findIndex((u) => u.id === unitId);

      if (unitIndex !== -1) {
        // Update the votes
        group.units[unitIndex] = {
          ...group.units[unitIndex],
          votes: {
            ...group.units[unitIndex].votes,
            [voteType]: group.units[unitIndex].votes[voteType] + 1,
          },
        };
      }
    });

    setData({
      ...data,
      moduleGroups: updatedModuleGroups,
    });

    onVote?.(unitId, voteType);
  };

  const handleFeedbackSubmit = (
    unitId: number,
    feedback: "happy" | "neutral" | "sad"
  ) => {
    console.log(`Feedback for unit ${unitId}: ${feedback}`);
    onFeedback?.(unitId, feedback);
  };

  const handleModuleGroupChange = (group: "intro" | "core" | "advanced") => {
    // Check if the group is unlocked
    if (data?.moduleGroups[group].unlockRequirement) {
      const completedUnits = Object.values(data.moduleGroups).reduce(
        (sum, g) =>
          sum + g.units.filter((u) => u.status === "completed").length,
        0
      );

      if (completedUnits < data.moduleGroups[group].unlockRequirement) {
        // Group is locked
        return;
      }
    }

    setActiveModuleGroup(group);
    setActiveUnitId(null);
  };

  const currentIsLoading = propIsLoading ?? isLoading;
  const currentError = propError ?? error;

  // Find the active unit
  const activeUnit = activeUnitId
    ? data?.moduleGroups.intro.units.find((unit) => unit.id === activeUnitId) ||
      data?.moduleGroups.core.units.find((unit) => unit.id === activeUnitId) ||
      data?.moduleGroups.advanced.units.find((unit) => unit.id === activeUnitId)
    : null;

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next group
      if (
        activeModuleGroup === "intro" &&
        data?.moduleGroups.core &&
        data.totalProgress.completed >=
          (data.moduleGroups.core.unlockRequirement || 0)
      ) {
        handleModuleGroupChange("core");
      } else if (
        activeModuleGroup === "core" &&
        data?.moduleGroups.advanced &&
        data.totalProgress.completed >=
          (data.moduleGroups.advanced.unlockRequirement || 0)
      ) {
        handleModuleGroupChange("advanced");
      }
    }
    if (touchEnd - touchStart > 75) {
      // Swipe right - previous group
      if (activeModuleGroup === "advanced") {
        handleModuleGroupChange("core");
      } else if (activeModuleGroup === "core") {
        handleModuleGroupChange("intro");
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Progress Header */}
      <div
        className={`mb-8 p-4 sm:p-6 rounded-xl ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-sm shadow-lg`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Your Learning Journey
            </h2>
            <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Master financial literacy one step at a time
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <GraduationCap
                className={`w-5 h-5 mr-2 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <span
                className={`font-medium ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                {data?.userProgress.xp || 0} XP
              </span>
            </div>
            <div className="flex items-center">
              <span
                className={`font-medium ${
                  isDark ? "text-orange-400" : "text-orange-600"
                }`}
              >
                {data?.userProgress.streak || 0} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div
          className={`mt-4 h-2 rounded-full ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isDark ? "bg-purple-500" : "bg-purple-600"
            }`}
            style={{
              width: data
                ? `${
                    (data.totalProgress.completed / data.totalProgress.total) *
                    100
                  }%`
                : "0%",
            }}
          />
        </div>

        {/* Badge Progress */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs ${
              data?.totalProgress.completed >= 1
                ? isDark
                  ? "bg-green-500/20 text-green-400"
                  : "bg-green-100 text-green-800"
                : isDark
                ? "bg-gray-700 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="font-medium">Kitten Learner</span>
            {data?.totalProgress.completed < 1 && (
              <span className="ml-1">({data?.totalProgress.completed}/1)</span>
            )}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs ${
              data?.totalProgress.completed >= 5
                ? isDark
                  ? "bg-green-500/20 text-green-400"
                  : "bg-green-100 text-green-800"
                : isDark
                ? "bg-gray-700 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="font-medium">Curious Feline</span>
            {data?.totalProgress.completed < 5 && (
              <span className="ml-1">({data?.totalProgress.completed}/5)</span>
            )}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs ${
              data?.totalProgress.completed >= 10
                ? isDark
                  ? "bg-green-500/20 text-green-400"
                  : "bg-green-100 text-green-800"
                : isDark
                ? "bg-gray-700 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="font-medium">Wise Whiskers</span>
            {data?.totalProgress.completed < 10 && (
              <span className="ml-1">({data?.totalProgress.completed}/10)</span>
            )}
          </div>
        </div>
      </div>

      {/* Module Group Navigation */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={() => handleModuleGroupChange("intro")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeModuleGroup === "intro"
              ? isDark
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-900"
              : isDark
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="flex items-center">Introduction</span>
        </button>

        <button
          onClick={() => handleModuleGroupChange("core")}
          disabled={
            data?.totalProgress.completed <
            (data?.moduleGroups.core.unlockRequirement || 0)
          }
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeModuleGroup === "core"
              ? isDark
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-900"
              : data?.totalProgress.completed >=
                (data?.moduleGroups.core.unlockRequirement || 0)
              ? isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : isDark
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center">
            Core Modules
            {data?.totalProgress.completed <
              (data?.moduleGroups.core.unlockRequirement || 0) && (
              <span className="ml-2 text-xs">
                (Unlock at {data?.moduleGroups.core.unlockRequirement} units)
              </span>
            )}
          </span>
        </button>

        <button
          onClick={() => handleModuleGroupChange("advanced")}
          disabled={
            data?.totalProgress.completed <
            (data?.moduleGroups.advanced.unlockRequirement || 0)
          }
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeModuleGroup === "advanced"
              ? isDark
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-900"
              : data?.totalProgress.completed >=
                (data?.moduleGroups.advanced.unlockRequirement || 0)
              ? isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : isDark
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center">
            Advanced Modules
            {data?.totalProgress.completed <
              (data?.moduleGroups.advanced.unlockRequirement || 0) && (
              <span className="ml-2 text-xs">
                (Unlock at {data?.moduleGroups.advanced.unlockRequirement}{" "}
                units)
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Module Description (Desktop Only) */}
        <div className="hidden lg:block space-y-6">
          <div
            className={`p-6 rounded-xl ${
              isDark ? "bg-gray-800/90" : "bg-white/90"
            } backdrop-blur-sm shadow-lg`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {data?.moduleGroups[activeModuleGroup].title}
            </h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {data?.moduleGroups[activeModuleGroup].description}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {currentIsLoading ? (
            <SkeletonLoader />
          ) : currentError ? (
            <ErrorState message={currentError} onRetry={onRetry} />
          ) : (
            <div className="space-y-6">
              {activeUnit ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Unit Content */}
                  <div className="lg:col-span-2">
                    <div
                      className={`p-4 sm:p-6 rounded-xl ${
                        isDark ? "bg-gray-800/90" : "bg-white/90"
                      } backdrop-blur-sm shadow-lg`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3
                          className={`text-xl font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {activeUnit.title}
                        </h3>
                        <button
                          onClick={() => setActiveUnitId(null)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                            isDark
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Back to List
                        </button>
                      </div>

                      {/* Media Content */}
                      <div className="space-y-6">
                        {/* Audio Player */}
                        <AudioPlayer
                          audioSrc={`/podcasts/${activeUnit.content.podcast}`}
                          title={`${activeUnit.title} - Audio Lesson`}
                          onComplete={handleAudioComplete}
                        />

                        {/* Video or Infographic */}
                        {activeUnit.content.video && (
                          <div
                            className={`mt-6 rounded-lg overflow-hidden ${
                              isDark ? "bg-gray-700/50" : "bg-gray-50"
                            }`}
                          >
                            <div className="aspect-video bg-black flex items-center justify-center">
                              <div className="text-center p-4">
                                <Play
                                  className={`w-12 h-12 mx-auto mb-2 ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                />
                                <p
                                  className={`text-sm ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  Video placeholder - In a real app, this would
                                  play the video from {activeUnit.content.video}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeUnit.content.infographic &&
                          !activeUnit.content.video && (
                            <div className="mt-6 rounded-lg overflow-hidden">
                              <img
                                src={activeUnit.content.infographic}
                                alt={`Infographic for ${activeUnit.title}`}
                                className="w-full h-auto rounded-lg"
                              />
                            </div>
                          )}

                        {/* Content Text */}
                        <div className="mt-6">
                          <h4
                            className={`font-medium mb-3 ${
                              isDark ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            Lesson Content
                          </h4>
                          <div
                            className={`p-4 rounded-lg ${
                              isDark ? "bg-gray-700/50" : "bg-gray-50"
                            }`}
                          >
                            <p
                              className={`${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {activeUnit.content.text}
                            </p>
                          </div>
                        </div>

                        {/* Quiz Preview */}
                        <div className="mt-6">
                          <h4
                            className={`font-medium mb-3 ${
                              isDark ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            Unit Quiz
                          </h4>
                          <div
                            className={`p-4 rounded-lg ${
                              isDark ? "bg-purple-900/20" : "bg-purple-50"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h5
                                  className={`font-medium ${
                                    isDark
                                      ? "text-purple-300"
                                      : "text-purple-800"
                                  }`}
                                >
                                  {activeUnit.quiz.title}
                                </h5>
                                <p
                                  className={`text-sm mt-1 ${
                                    isDark ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {activeUnit.quiz.description}
                                </p>
                              </div>
                              <div className="flex items-center mt-2 sm:mt-0">
                                <Trophy
                                  className={`w-4 h-4 mr-1.5 ${
                                    isDark
                                      ? "text-purple-400"
                                      : "text-purple-600"
                                  }`}
                                />
                                <span
                                  className={`text-sm font-medium ${
                                    isDark
                                      ? "text-purple-400"
                                      : "text-purple-600"
                                  }`}
                                >
                                  +{activeUnit.quiz.reward.xp} XP
                                  {activeUnit.quiz.reward.badge &&
                                    ` + ${activeUnit.quiz.reward.badge} Badge`}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => setShowQuiz(true)}
                              className={`mt-4 w-full py-2 px-4 rounded-lg font-medium ${
                                isDark
                                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                                  : "bg-purple-500 hover:bg-purple-600 text-white"
                              } transition-colors`}
                            >
                              Take Quiz
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-6">
                    {/* Comments Section */}
                    <div
                      className={`p-4 sm:p-6 rounded-xl ${
                        isDark ? "bg-gray-800/90" : "bg-white/90"
                      } backdrop-blur-sm shadow-lg`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Community Discussion
                      </h3>
                      <CommentSection comments={activeUnit.comments} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Mobile Module Description */}
                  <div className="lg:hidden">
                    <div
                      className={`p-4 sm:p-6 rounded-xl ${
                        isDark ? "bg-gray-800/90" : "bg-white/90"
                      } backdrop-blur-sm shadow-lg mb-6`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {data?.moduleGroups[activeModuleGroup].title}
                      </h3>
                      <p
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {data?.moduleGroups[activeModuleGroup].description}
                      </p>
                    </div>
                  </div>

                  {/* Units List */}
                  <div className="space-y-6">
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {data?.moduleGroups[activeModuleGroup].title} Units
                    </h3>

                    {data?.moduleGroups[activeModuleGroup].units.map(
                      (unit, index) => (
                        <UnitCard
                          key={unit.id}
                          unit={unit}
                          isLast={
                            index ===
                            data.moduleGroups[activeModuleGroup].units.length -
                              1
                          }
                          onStart={() => handleUnitSelect(unit.id)}
                          onQuizComplete={(unitId, score) =>
                            handleQuizComplete(unitId, score)
                          }
                          isActive={activeUnitId === unit.id}
                          votes={unit.votes}
                          onVote={(voteType) => handleVote(unit.id, voteType)}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && activeUnit && (
        <QuizModal
          quiz={activeUnit.quiz}
          onClose={() => setShowQuiz(false)}
          onComplete={(score) => handleQuizComplete(activeUnit.id, score)}
        />
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          onClose={() => setShowCelebration(false)}
          badgeType={celebrationType || "kitten"}
        />
      )}

      {/* Feedback Chatbot */}
      <FeedbackChatbot
        unitId={activeUnitId}
        onFeedback={handleFeedbackSubmit}
      />
    </div>
  );
};
