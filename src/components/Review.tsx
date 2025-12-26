import YouTube from "react-youtube";

import type { FlowInput, ReviewState } from "@/types";
import { getYoutubeVideoId } from "@/helpers";

import { Button } from "./ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface IReviewProps {
  currentState: ReviewState;

  handleNext: (data?: FlowInput) => void;
}

const Review = ({ currentState, handleNext }: IReviewProps) => {
  const {
    value: { image, title, text, video },
  } = currentState;

  return (
    <div className="flex flex-col gap-4">
      <h3>Review Post</h3>

      <ScrollArea className="h-[calc(100svh-250px)] w-full rounded-md border">
        <div className="flex flex-col gap-4 p-4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            {image ? (
              <img
                src={image}
                alt="Selected image"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                No image added yet
              </div>
            )}
          </AspectRatio>

          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg p-10">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="font-semibold">{title || "Untitled Post"}</span>
              <span className="font-normal">{text || "No text added yet"}</span>
            </div>
          </AspectRatio>

          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            {video ? (
              <YouTube
                className="h-full w-full object-cover"
                iframeClassName="h-full w-full object-cover"
                videoId={getYoutubeVideoId(video)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                No video added yet
              </div>
            )}
          </AspectRatio>
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Button
          onClick={() => handleNext()}
          className="bg-black px-4 py-2 text-white"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default Review;
