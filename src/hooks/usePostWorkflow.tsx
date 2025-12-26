import { useCallback, useEffect, useMemo, useState } from "react";

import { createPostFlow } from "@/generators";
import type { CreateState, FlowInput } from "@/types";

const usePostWorkflow = () => {
  const workflow = useMemo(() => createPostFlow(), []);

  const [currentState, setCurrentState] = useState<CreateState>(() => {
    return workflow.next().value as CreateState;
  });

  // 1. The core handleNext function (no recursion here)
  const handleNext = useCallback(
    async (data?: FlowInput) => {
      let result = workflow.next(data);

      while (!result.done) {
        const value = result.value;

        if (value instanceof Promise) {
          const response = await value;
          result = workflow.next(response);
        } else {
          setCurrentState(value);
          break; // Stop and let React render
        }
      }
    },
    [workflow],
  );

  // 2. Separate useEffect to handle "Auto-Advance" states
  // This solves the "access before declaration" error
  useEffect(() => {
    const autoTypes: CreateState["type"][] = [
      "checking-local-storage",
      "uploading-image",
      "saving-draft",
      "uploading-video",
      "publishing",
    ];

    if (autoTypes.includes(currentState.type)) {
      const timeoutId = setTimeout(() => {
        handleNext();
        clearTimeout(timeoutId);
      }, 0);
    }
  }, [currentState.type, handleNext]);

  return {
    currentState,
    handleNext,
  };
};

export default usePostWorkflow;
