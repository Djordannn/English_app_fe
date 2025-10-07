"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Play,
  Pause,
  Volume2,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { BackButton } from "@/app/component/back-button";

// Mock test data
const LISTENING_QUESTIONS = [
  {
    id: 1,
    question: "What is the main topic of the conversation?",
    options: [
      "University accommodation",
      "Student activities",
      "Course requirements",
      "Library services",
    ],
    correct: 0,
    audioUrl: "/audio/listening-1.mp3",
  },
  {
    id: 2,
    question:
      "According to the speaker, when should students submit their applications?",
    options: [
      "Before the end of September",
      "By the 15th of October",
      "Within two weeks of enrollment",
      "At the beginning of November",
    ],
    correct: 1,
    audioUrl: "/audio/listening-2.mp3",
  },
  {
    id: 3,
    question: "What facility is mentioned as being available 24 hours?",
    options: ["Computer lab", "Gymnasium", "Library", "Cafeteria"],
    correct: 2,
    audioUrl: "/audio/listening-3.mp3",
  },
];

const READING_QUESTIONS = [
  {
    id: 1,
    question:
      "According to the passage, what is the primary purpose of renewable energy?",
    options: [
      "To reduce carbon emissions",
      "To lower energy costs",
      "To create jobs",
      "To increase energy independence",
    ],
    correct: 0,
    passage:
      "Renewable energy sources such as solar, wind, and hydroelectric power have become increasingly important in the global effort to reduce carbon emissions and combat climate change...",
  },
  {
    id: 2,
    question:
      "The author suggests that renewable energy adoption is hindered by:",
    options: [
      "High initial costs",
      "Lack of technology",
      "Government regulations",
      "Public opposition",
    ],
    correct: 0,
    passage:
      "While renewable energy technologies have advanced significantly, the high initial investment costs remain a major barrier to widespread adoption...",
  },
];

const WRITING_QUESTIONS = [
  {
    id: 1,
    type: "task1",
    title: "Academic Writing Task 1",
    description:
      "Write at least 150 words describing the information shown in the chart below.",
    instruction:
      "The chart shows the percentage of households in different countries that owned a computer between 2002 and 2010. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    wordLimit: 150,
    timeLimit: 20,
  },
  {
    id: 2,
    type: "task2",
    title: "Academic Writing Task 2",
    description: "Write at least 250 words responding to the essay question.",
    instruction:
      "Some people believe that technology has made our lives more complicated, while others argue that it has simplified things. Discuss both views and give your own opinion.",
    wordLimit: 250,
    timeLimit: 40,
  },
];

const SPEAKING_QUESTIONS = [
  {
    id: 1,
    part: "Part 1",
    title: "Introduction and Interview",
    questions: [
      "What is your full name?",
      "Where are you from?",
      "Do you work or study?",
      "What do you like about your hometown?",
    ],
    timeLimit: 4,
  },
  {
    id: 2,
    part: "Part 2",
    title: "Individual Long Turn",
    instruction: "Describe a memorable trip you have taken. You should say:",
    points: [
      "Where you went",
      "Who you went with",
      "What you did there",
      "And explain why it was memorable",
    ],
    timeLimit: 7,
  },
  {
    id: 3,
    part: "Part 3",
    title: "Two-way Discussion",
    questions: [
      "How has tourism changed in your country over the past decade?",
      "What are the benefits and drawbacks of tourism for local communities?",
      "Do you think virtual reality will replace traditional travel in the future?",
    ],
    timeLimit: 5,
  },
];

const TestSection = () => {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Get questions based on section
  const getQuestions = () => {
    switch (section) {
      case "listening":
        return LISTENING_QUESTIONS;
      case "reading":
        return READING_QUESTIONS;
      case "writing":
        return WRITING_QUESTIONS;
      case "speaking":
        return SPEAKING_QUESTIONS;
      default:
        return [];
    }
  };

  const questions = getQuestions();
  const totalQuestions = questions.length;

  // Timer setup
  useEffect(() => {
    const timeLimit =
      section === "listening"
        ? 30
        : section === "reading"
        ? 60
        : section === "writing"
        ? 60
        : 14;
    setTimeLeft(timeLimit * 60); // Convert to seconds

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [section]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (section === "listening" || section === "reading") {
      let correctAnswers = 0;
      questions.forEach((q: any, index) => {
        if (answers[index] === q.options[q.correct]) {
          correctAnswers++;
        }
      });
      setScore(Math.round((correctAnswers / totalQuestions) * 100));
    } else {
      // For writing and speaking, use mock scores
      setScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-100
    }
    setIsSubmitted(true);
  };

  const getSectionTitle = () => {
    const titles = {
      listening: "Listening Test",
      reading: "Reading Test",
      writing: "Writing Test",
      speaking: "Speaking Test",
    };
    return titles[section as keyof typeof titles] || "Test";
  };

  const renderListeningQuestion = (question: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Question {question.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant={isPlaying ? "destructive" : "default"}
            size="lg"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <div className="text-sm text-gray-600">
            Audio will play automatically. You can pause and replay as needed.
          </div>
        </div>

        <div className="text-lg font-medium">{question.question}</div>

        <RadioGroup
          value={answers[question.id] || ""}
          onValueChange={(value) => handleAnswerChange(question.id, value)}
        >
          {question.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
              <Label htmlFor={`q${question.id}-${index}`} className="text-base">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const renderReadingQuestion = (question: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Question {question.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed">
          {question.passage}
        </div>

        <div className="text-lg font-medium">{question.question}</div>

        <RadioGroup
          value={answers[question.id] || ""}
          onValueChange={(value) => handleAnswerChange(question.id, value)}
        >
          {question.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
              <Label htmlFor={`q${question.id}-${index}`} className="text-base">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const renderWritingQuestion = (question: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
        <p className="text-sm text-gray-600">{question.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-medium mb-2">Instructions:</div>
          <div className="text-sm">{question.instruction}</div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`writing-${question.id}`}
            className="text-base font-medium"
          >
            Your Answer:
          </Label>
          <textarea
            id={`writing-${question.id}`}
            className="w-full h-64 p-4 border rounded-lg resize-none"
            placeholder={`Write your answer here (minimum ${question.wordLimit} words)...`}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
          <div className="text-sm text-gray-500">
            Word count:{" "}
            {
              (answers[question.id] || "")
                .split(" ")
                .filter((word) => word.length > 0).length
            }{" "}
            / {question.wordLimit} minimum
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSpeakingQuestion = (question: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          {question.part}: {question.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.instruction && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="font-medium mb-2">Task:</div>
            <div className="text-sm">{question.instruction}</div>
            {question.points && (
              <ul className="mt-2 text-sm list-disc list-inside">
                {question.points.map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {question.questions && (
          <div className="space-y-3">
            <div className="font-medium">Questions:</div>
            {question.questions.map((q: string, index: number) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-sm mb-1">
                  Question {index + 1}:
                </div>
                <div className="text-sm">{q}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant={isPlaying ? "destructive" : "default"}
            size="lg"
          >
            <Mic className="h-4 w-4 mr-2" />
            {isPlaying ? "Stop Recording" : "Start Recording"}
          </Button>
          <div className="text-sm text-gray-600">
            Record your response for this section.
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    switch (section) {
      case "listening":
        return renderListeningQuestion(question);
      case "reading":
        return renderReadingQuestion(question);
      case "writing":
        return renderWritingQuestion(question);
      case "speaking":
        return renderSpeakingQuestion(question);
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center">
            <CardContent className="py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
              <p className="text-gray-600 mb-6">
                Your {getSectionTitle()} has been submitted successfully.
              </p>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score}
              </div>
              <div className="text-gray-600 mb-8">Your Score</div>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/home/dashboard">Back to Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/home/results">View Results</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="text-center">
              <h1 className="text-2xl font-bold">{getSectionTitle()}</h1>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Progress
          value={((currentQuestion + 1) / totalQuestions) * 100}
          className="h-2"
        />
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderQuestion()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {currentQuestion === totalQuestions - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Test
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSection;
