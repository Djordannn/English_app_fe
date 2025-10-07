"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const grades = [
  { id: "grade1", label: "Grade 01", number: "01" },
  { id: "grade2", label: "Grade 02", number: "02" },
  { id: "grade3", label: "Grade 03", number: "03" },
  { id: "grade4", label: "Grade 04", number: "04" },
];

const Grade = () => (
  <div>
    {/* Navbar */}
    <nav className="my-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src="https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg"
              alt="Brand logo"
            />
            <AvatarFallback>BL</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">Hi Henry</h2>
        </div>
        <button type="button" className="p-2 rounded hover:bg-zinc-100">
          <Menu />
        </button>
      </div>
    </nav>

    {/* Grade Selection */}
    <div>
      <Card className="mb-8">
        <CardContent className="flex flex-row gap-4">
          <MessageCircle size={34} />
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-semibold mb-4">Select Grade</h2>
      <div className="grid grid-cols-1 gap-4">
        {grades.map((grade) => (
          <Card key={grade.label}>
            <CardContent>
              <h1 className="text-6xl">{grade.number}</h1>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full">
                <h1>{grade.label}</h1>
                <p className="text-muted-foreground mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <Link href={`/exam/${grade.id}`}>
                  <Button className="w-full mt-2">Let&apos;s try</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default Grade;
