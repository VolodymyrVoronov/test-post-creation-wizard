import type { CreateState, FlowInput } from "@/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "./ui/button";

export interface IInvalidProps {
  currentState: CreateState;

  handleNext: (data?: FlowInput) => void;
}

const Invalid = ({ currentState, handleNext }: IInvalidProps) => {
  if (
    currentState.type === "invalid-image" ||
    currentState.type === "invalid-content" ||
    currentState.type === "invalid-video"
  ) {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="mb-4 text-red-600">{currentState.message}</p>
          <Button
            onClick={() => handleNext()}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </AspectRatio>
    );
  }

  if (currentState.type === "error") {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="mb-4 text-red-600">{currentState.message}</p>
        </div>
      </AspectRatio>
    );
  }
};

export default Invalid;
