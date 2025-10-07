"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import duck from "@/public/duck.jpg";

const QUESTION = [
  {
    id: 1,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sit fugit delectus, maxime suscipit adipisci.1",
  },
  {
    id: 2,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sit fugit delectus, maxime suscipit adipisci.2",
  },
  {
    id: 3,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sit fugit delectus, maxime suscipit adipisci.3",
  },
  {
    id: 4,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sit fugit delectus, maxime suscipit adipisci.4",
  },
];

const Q2 = () => {
  const params = useParams();

  // State for question
  const [current, setCurrent] = useState(0);

  // Skor page url - FIX: sertakan runtest di url
  const scoreUrl = `/quest/q2/${params.questId}/results`;

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
      <div className="my-4 flex items-center justify-between">
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
                <h3 className="font-semibold text-2xl">Text</h3>
                <p className="text-sm tracking-wide">
                  {QUESTION[current].text}
                </p>
                <div className="relative mt-2">
                  <Image
                    src={duck}
                    alt="dialog"
                    width={800}
                    height={400}
                    className="w-full h-[300px] object-cover object-fill rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col items-center mt-12 gap-4 sticky bottom-10 w-full overflow-hidden">
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
