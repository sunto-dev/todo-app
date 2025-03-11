"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const SolutionPage = () => {
  const [result, setResult] = useState<string>("");

  const codeLeet = (one: string) => {
    let seen = new Set();
    let part = "";

    for (let char of one) {
      if (seen.has(char)) break; // Stop when we find a duplicate character
      seen.add(char);
      part += char;
    }

    // Repeat the extracted part 3 times
    const ans = part.repeat(3);
    setResult(ans);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-3 text-lg font-bold">Result: {result}</div>
      <Button onClick={() => codeLeet("suntazuy")}>suntazuy</Button>
      <Button onClick={() => codeLeet("jabqddd")}>jabqddd</Button>
      <Button onClick={() => codeLeet("suntaqwzuy")}>suntuy</Button>
    </div>
  );
};

export default SolutionPage;
