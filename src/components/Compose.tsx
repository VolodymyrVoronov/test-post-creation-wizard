import { useState } from "react";

import type { ComposeState, FlowInput } from "@/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

export interface IComposeProps {
  currentState: ComposeState;

  handleNext: (data?: FlowInput) => void;
}

const Compose = ({ currentState, handleNext }: IComposeProps) => {
  const [title, setTitle] = useState<string>(() => currentState.value.title);
  const [text, setText] = useState<string>(() => currentState.value.text);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="post-title">Post Title</Label>
        <Input
          id="post-title"
          type="text"
          placeholder="My First Post..."
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="post-text">Post Text</Label>
        <Textarea
          id="post-text"
          placeholder="This is my first post..."
          className="w-full border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg p-10">
        {title && text ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="font-semibold">{title}</span>
            <span className="font-normal">{text}</span>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No text added yet. Try adding a title and some text.
          </div>
        )}
      </AspectRatio>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (title && text) {
              handleNext({ title, text });
            }
          }}
          disabled={!title || !text}
        >
          {currentState.value.title && currentState.value.text
            ? "Update title and text"
            : "Add title and text first"}
        </Button>

        {currentState.canSkip && (
          <Button
            onClick={() => handleNext(null)}
            variant="outline"
            disabled={!currentState.canSkip}
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default Compose;
