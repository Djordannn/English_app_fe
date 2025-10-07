"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Award,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  CheckCircle,
  Clock,
  Target,
  Star,
} from "lucide-react";
import Link from "next/link";

// Mock results data - in real app, this would come from API or state management
const mockResults = {
  listening: { score: 85, band: 8.5, timeSpent: 28, completed: true },
  reading: { score: 78, band: 7.5, timeSpent: 55, completed: true },
  writing: { score: 82, band: 8.0, timeSpent: 58, completed: true },
  speaking: { score: 88, band: 8.5, timeSpent: 12, completed: true },
};

const Results = () => {
  const [showDetailed, setShowDetailed] = useState(false);

  const sections = [
    {
      id: "listening",
      name: "Listening",
      icon: "🎧",
      color: "blue",
      ...mockResults.listening,
    },
    {
      id: "reading",
      name: "Reading",
      icon: "📖",
      color: "green",
      ...mockResults.reading,
    },
    {
      id: "writing",
      name: "Writing",
      icon: "✍️",
      color: "purple",
      ...mockResults.writing,
    },
    {
      id: "speaking",
      name: "Speaking",
      icon: "🎤",
      color: "orange",
      ...mockResults.speaking,
    },
  ];

  const totalScore = sections.reduce((sum, section) => sum + section.score, 0);
  const averageScore = Math.round(totalScore / sections.length);
  const overallBand = (
    sections.reduce((sum, section) => sum + section.band, 0) / sections.length
  ).toFixed(1);
  const totalTime = sections.reduce(
    (sum, section) => sum + section.timeSpent,
    0
  );

  const getBandLevel = (band: number) => {
    if (band >= 8.5)
      return {
        level: "Expert User",
        color: "text-green-600",
        bg: "bg-green-100",
      };
    if (band >= 7.5)
      return { level: "Good User", color: "text-blue-600", bg: "bg-blue-100" };
    if (band >= 6.5)
      return {
        level: "Competent User",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    if (band >= 5.5)
      return {
        level: "Modest User",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    return { level: "Limited User", color: "text-red-600", bg: "bg-red-100" };
  };

  const getSectionColor = (color: string) => {
    const colors = {
      blue: "border-blue-200 bg-blue-50",
      green: "border-green-200 bg-green-50",
      purple: "border-purple-200 bg-purple-50",
      orange: "border-orange-200 bg-orange-50",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const bandLevel = getBandLevel(parseFloat(overallBand));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">IELTS Test Results</h1>
            <p className="text-xl opacity-90">
              Congratulations on completing your test!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 -mt-8">
        {/* Overall Score Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <span className="text-5xl font-bold text-white">
                  {overallBand}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Overall Band Score</h2>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${bandLevel.bg} ${bandLevel.color}`}
              >
                <Award className="h-5 w-5 mr-2" />
                {bandLevel.level}
              </div>
              <div className="mt-4 text-gray-600">
                <div className="flex justify-center gap-8 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Total Time: {totalTime} minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    All sections completed
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sections.map((section) => (
            <Card
              key={section.id}
              className={`${getSectionColor(
                section.color
              )} transition-transform hover:scale-105`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
                <div
                  className={`text-3xl font-bold mb-2 ${getScoreColor(
                    section.score
                  )}`}
                >
                  {section.score}
                </div>
                <div className="text-sm text-gray-600 mb-3">Score / 100</div>
                <Progress value={section.score} className="h-2 mb-3" />
                <div className="text-lg font-bold text-gray-800">
                  Band {section.band}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {section.timeSpent} minutes
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">Strong</div>
                <div className="text-sm text-gray-600">
                  Speaking & Listening
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">Good</div>
                <div className="text-sm text-gray-600">Writing Skills</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">
                  Improve
                </div>
                <div className="text-sm text-gray-600">Reading Speed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results Toggle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowDetailed(!showDetailed)}
              variant="outline"
              className="w-full"
            >
              {showDetailed ? "Hide" : "Show"} Detailed Breakdown
            </Button>

            {showDetailed && (
              <div className="mt-6 space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-xl">{section.icon}</span>
                      {section.name} - Band {section.band}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Raw Score:</span>{" "}
                        {section.score}/100
                      </div>
                      <div>
                        <span className="font-medium">Time Taken:</span>{" "}
                        {section.timeSpent} minutes
                      </div>
                    </div>
                    <Progress value={section.score} className="h-2 mt-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/home/dashboard">
              <RefreshCw className="h-4 w-4 mr-2" />
              Take Another Test
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommendations for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Reading Practice
                </h4>
                <p className="text-blue-700 text-sm">
                  Focus on reading speed and comprehension. Practice with
                  academic texts and time yourself.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  Speaking Confidence
                </h4>
                <p className="text-green-700 text-sm">
                  Your speaking skills are strong! Continue practicing with
                  native speakers to maintain fluency.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Writing Structure
                </h4>
                <p className="text-purple-700 text-sm">
                  Practice essay structure and academic vocabulary. Focus on
                  clear argument development.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
