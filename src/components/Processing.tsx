import type { CreateState } from "@/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export interface IProcessingProps {
  currentState: CreateState;
}

const Processing = ({ currentState }: IProcessingProps) => {
  if (
    currentState.type === "checking-local-storage" ||
    currentState.type === "uploading-image" ||
    currentState.type === "saving-draft" ||
    currentState.type === "uploading-video" ||
    currentState.type === "publishing"
  ) {
    return (
      <AspectRatio
        ratio={16 / 9}
        className="flex flex-col items-center justify-center rounded-lg border"
      >
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="line-clamp-1 animate-pulse">
              {currentState.type === "checking-local-storage" &&
                "Checking post draft..."}
              {currentState.type === "uploading-image" && "Uploading Image..."}
              {currentState.type === "saving-draft" && "Saving Draft..."}
              {currentState.type === "uploading-video" && "Uploading Video..."}
              {currentState.type === "publishing" && "Publishing..."}
            </ItemTitle>
          </ItemContent>
        </Item>
      </AspectRatio>
    );
  }
};

export default Processing;
