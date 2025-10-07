import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Start your journey to master English with us!
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Link href="/grade">
          <button className="px-8 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-zinc-800 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
