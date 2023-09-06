"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";

export default function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
      <Button
        type="button"
        onClick={handleClick}
        variant="outline"
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
          Create Collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} handleClick={handleClick} />
    </div>
  );
}
