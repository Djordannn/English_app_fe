"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Mic, Menu, Timer } from "lucide-react";
import { BackButton } from "@/app/component/back-button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const QUESTION = [
  {
    id: 1,
    title: "Daily Routine",
    text: "Every morning, I wake up at six o’clock and go for a short walk. After that, I have breakfast and prepare for school. Starting the day early makes me feel fresh and ready to learn.",
  },
  {
    id: 2,
    title: "Technology",
    text: "Technology has changed the way we live. People can now talk to each other instantly, even if they are in different countries. However, spending too much time on screens can also be unhealthy.",
  },
  {
    id: 3,
    title: "Travel",
    text: "I love traveling because it gives me the chance to see new places and meet different people. Each trip teaches me something new about the world and about myself.",
  },
  {
    id: 4,
    title: "Books",
    text: "Reading books is one of my favorite hobbies. A good story can take me to another world and help me imagine things I have never seen before.",
  },
];

const Q2 = () => {
  // State for question
  const [current, setCurrent] = useState(0);

  // Unwrap params using React.use()
  const params = useParams();

  // Skor page url - FIX: sertakan runtest di url
  const scoreUrl = `/quest/q1/${params.questId}/results`;

  // Handler untuk tombol next
  const handleNext = () => {
    if (current < QUESTION.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("Question finish");
    }
  };

  return (
    <div>
      <div className="my-8 flex items-center justify-between">
        <div>
          <BackButton />
        </div>
        <div className="text-center"></div>
        <div>
          <Menu />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-between">
          <div>
            <Card>
              <CardHeader>
                <h3>
                  Question {current + 1} / {QUESTION.length}
                </h3>

                <div className="flex justify-between mt-2">
                  <Timer />
                  <p>1:00</p>
                </div>
                <Progress value={80} className="h-5" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-2xl">
                  {QUESTION[current].title}
                </h3>

                <p className="text-sm tracking-wide">
                  {QUESTION[current].text}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col items-center mt-18 gap-4 sticky bottom-10 w-full overflow-hidden">
                  <div className="relative text-center w-full">
                    <Button
                      className="h-20 w-20 rounded-full"
                      onClick={handleNext}
                    >
                      <Mic />
                    </Button>
                  </div>
                  <div className="w-full max-w-sm">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleNext}
                      asChild={false}
                    >
                      {current === QUESTION.length - 1 ? (
                        <Link href={scoreUrl}>Finish</Link>
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Q2;
