"use client";

import { useSearchParams, useRoute, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { log } from "console";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const {questId} = params

  const handleBack = () => {
    window.location.href = `/quest/q1/${questId}`
  }

  // Ambil nilai score & total dari query
  const score = Number(searchParams.get("score") || 0);
  const total = Number(searchParams.get("total") || 1);
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Your Result
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-lg">
            You scored <span className="font-semibold">{score}</span> out of{" "}
            <span className="font-semibold">{total}</span>
          </p>

          <Progress value={percentage} className="w-full" />

          <p className="text-muted-foreground">{percentage}% Correct</p>

          <Button onClick={handleBack} className="w-full mt-4">
        Back to Grade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
