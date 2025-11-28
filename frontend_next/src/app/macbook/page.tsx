"use client";

import * as React from "react";
import Image from "next/image";

interface MacbookPro161Props {}

export function MacbookPro161({}: MacbookPro161Props) {
  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        <Image
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1728&q=80"
          alt="MacBook Pro workspace"
          width={1728}
          height={1200}
          className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

export default MacbookPro161;
