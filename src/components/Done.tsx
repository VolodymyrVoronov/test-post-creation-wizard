import type { DoneState } from "@/types";

import { draftStorage } from "@/lib/storage";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "./ui/button";

export interface IDoneProps {
  currentState: DoneState;
}

const Done = ({ currentState }: IDoneProps) => {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="font-bold text-green-600">Success!</span>

          <span>
            Post with ID: <strong>{currentState.postId}</strong> was
            successfully created!
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              draftStorage.clear();
              window.location.reload();
            }}
          >
            New Post
          </Button>
        </div>
      </div>
    </AspectRatio>
  );
};

export default Done;
