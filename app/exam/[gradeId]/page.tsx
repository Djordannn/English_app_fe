import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Menu } from "lucide-react";
import { BackButton } from "@/app/component/back-button";

interface ExamPageProps {
  params: Promise<{ gradeId: string }>;
}

const exams = [
  {
    examId: "exam1",
    title: "Vocabulary",
    description:
      "Test your knowledge of English vocabulary with a set of fun questions.",
  },
  {
    examId: "exam2",
    title: "Grammar",
    description:
      "Challenge yourself with grammar questions to improve your skills.",
  },
  {
    examId: "exam3",
    title: "Reading",
    description:
      "Practice your reading comprehension with interesting passages.",
  },
  {
    examId: "exam4",
    title: "Listening",
    description: "Improve your listening skills with audio-based questions.",
  },
];

const Exam = async ({ params }: ExamPageProps) => {
  const { gradeId } = await params;
  return (
    <div>
      <div className="my-8 flex items-center justify-between">
        <div>
          <BackButton />
        </div>
        <div>
          {gradeId === "grade1" ? (
            <h2 className="text-2xl font-semibold">Grade 01</h2>
          ) : gradeId === "grade2" ? (
            <h2 className="text-2xl font-semibold">Grade 02</h2>
          ) : gradeId === "grade3" ? (
            <h2 className="text-2xl font-semibold">Grade 03</h2>
          ) : gradeId === "grade4" ? (
            <h2 className="text-2xl font-semibold">Grade 04</h2>
          ) : null}
        </div>
        <div>
          <Menu />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Select Exam</h2>

      <div className="grid grid-cols-1 gap-4 w-full">
        {exams.map((exam, idx) => (
          <Card key={idx}>
            <CardContent>
              <h2 className="text-2xl font-semibold">{exam.title}</h2>
              <p className="text-muted-foreground my-4">{exam.description}</p>
              <Link
                href={`/quest/${exam.title.toLocaleLowerCase()}/${exam.examId}`}
              >
                <Button className="w-full">Select Exam</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Exam;
