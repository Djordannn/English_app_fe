"use client";
import { use, useState } from "react";
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
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import robot from "@/public/robot.jpg";

interface RuntestProps {
  params: Promise<{
    quest: string;
    runtest: string;
  }>;
}

const QUESTION = [
  {
    id: 1,
    audio: "mp3",
  },
  {
    id: 2,
    audio: "mp3",
  },
  {
    id: 3,
    audio: "mp3",
  },
  {
    id: 4,
    audio: "mp3",
  },
];

const Q4 = ({ params }: RuntestProps) => {
  // State for question
  const [current, setCurrent] = useState(0);

  // Unwrap params using React.use()
  const { quest, runtest } = use(params);

  // Skor page url - FIX: sertakan runtest di url
  const scoreUrl = `/quest/${quest}/runtest/${runtest}/results`;

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
      <div className="flex items-center justify-between">
        <div>
          <BackButton />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold"></h2>
          <p className="text-muted-foreground">
            {quest} - {runtest}
          </p>
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-between">
          <div className="mt-8">
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
                <h3 className="font-semibold text-2xl">Text</h3>

                <div className="flex flex-col items-center relative justify-center">
                  <Image
                    src={robot}
                    alt="AI Bot"
                    width={800}
                    height={400}
                    className="w-[300px] h-[300px] mx-auto mb-4"
                  />
                  <p className="text-lg font-semibold text-center">AI Bot</p>
                  <audio controls className="w-full mt-3" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col items-center mt-16 gap-4 sticky bottom-10 w-full overflow-hidden">
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

export default Q4;
