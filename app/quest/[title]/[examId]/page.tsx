"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@/app/component/back-button";
import { Menu } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = [
  {
    id: "exam1",
    text: [
      { textId: 1, title: "Lorem ipsum dolor sit amet exam 1", category: "q1" },
      { textId: 2, title: "Lorem ipsum dolor sit amet exam 2", category: "q2" },
      { textId: 3, title: "Lorem ipsum dolor sit amet exam 3", category: "q3" },
    ],
  },
  {
    id: "exam2",
    text: [
      { textId: 1, title: "Lorem ipsum dolor sit amet exam 1", category: "q1" },
      { textId: 2, title: "Lorem ipsum dolor sit amet exam 2", category: "q2" },
      { textId: 3, title: "Lorem ipsum dolor sit amet exam 3", category: "q3" },
    ],
  },
  {
    id: "exam3",
    text: [
      { textId: 1, title: "Lorem ipsum dolor sit amet exam 1", category: "q1" },
      { textId: 2, title: "Lorem ipsum dolor sit amet exam 2", category: "q2" },
      { textId: 3, title: "Lorem ipsum dolor sit amet exam 3", category: "q3" },
    ],
  },
  {
    id: "exam4",
    text: [
      { textId: 1, title: "Lorem ipsum dolor sit amet exam 1", category: "q1" },
      { textId: 2, title: "Lorem ipsum dolor sit amet exam 2", category: "q2" },
      { textId: 3, title: "Lorem ipsum dolor sit amet exam 3", category: "q3" },
    ],
  },
];

const QuestExam = () => {
  const params = useParams();

  // cari data berdasarkan examId dari URL
  const exam = data.find((d) => d.id === params.examId);

  const title = params.title ? String(params.title) : "";

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div>
      <div className="my-8 flex items-center justify-between">
        <div>
          <BackButton />
        </div>
        <div className="text-2xl font-semibold">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {exam.text.map((q, idx) => (
          <Card key={q.textId}>
            <CardContent>
              <div className="flex flex-col w-full">
                <h1>Q{idx + 1}</h1>
                <p className="text-muted-foreground mb-2">{q.title}</p>
                <Link href={`/quest/${q.category}/1`}>
                  <Button className="w-full mt-2">Let&apos;s try</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestExam;
