import type { CreateState } from "@/types";

import { Badge } from "@/components/ui/badge";

export interface IStepsProps {
  currentState: CreateState;
}

const Steps = ({ currentState }: IStepsProps) => {
  const { type } = currentState;

  const steps: {
    id: typeof type;
    stepText: string;
  }[] = [
    {
      id: "select-image",
      stepText: "Select Image",
    },
    {
      id: "compose",
      stepText: "Compose Post",
    },
    {
      id: "add-video",
      stepText: "Add Video",
    },
    {
      id: "review",
      stepText: "Review Post",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step) => (
        <Badge
          key={step.id}
          className="grid grow grid-cols-[1fr_1fr_1fr]"
          variant={step.id === type ? "default" : "secondary"}
        >
          <span aria-hidden="true" />
          {step.stepText}
          {step.id === type ? (
            <span
              className="ml-auto size-2 animate-pulse rounded-full bg-white"
              aria-hidden="true"
            />
          ) : null}
        </Badge>
      ))}
    </div>
  );
};

export default Steps;
