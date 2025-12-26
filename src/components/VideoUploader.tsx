import { useState } from "react";
import YouTube from "react-youtube";

import { getYoutubeVideoId, isValidYoutubeUrl } from "@/helpers";
import type { AddVideoState, FlowInput } from "@/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export interface IImageUploaderProps {
  currentState: AddVideoState;

  handleNext: (data?: FlowInput) => void;
}

const VideoUploader = ({ currentState, handleNext }: IImageUploaderProps) => {
  const [videoUrl, setVideoUrl] = useState<string>(
    () => currentState.value || "",
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="youtube-link">YouTube URL</Label>
        <Input
          type="text"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          id="youtube-link"
          className="w-full border p-2"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        {isValidYoutubeUrl(videoUrl) && videoUrl ? (
          <YouTube
            className="h-full w-full object-cover"
            iframeClassName="h-full w-full object-cover"
            videoId={getYoutubeVideoId(videoUrl)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No YouTube video added yet
          </div>
        )}
      </AspectRatio>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (videoUrl) {
              handleNext(videoUrl);
            }
          }}
          disabled={!videoUrl}
        >
          Upload YouTube video
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

export default VideoUploader;
