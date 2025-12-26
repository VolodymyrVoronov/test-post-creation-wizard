import { useState } from "react";

import type { FlowInput, SelectImageState } from "@/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export interface IImageUploaderProps {
  currentState: SelectImageState;

  handleNext: (data?: FlowInput) => void;
}

const ImageUploader = ({ currentState, handleNext }: IImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    () => currentState.value || "",
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="image-link">Image URL</Label>
        <Input
          type="text"
          placeholder="https://example.com/image.jpg"
          id="image-link"
          className="w-full border p-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected image"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No image added yet
          </div>
        )}
      </AspectRatio>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (imageUrl) {
              handleNext(imageUrl);
            }
          }}
          disabled={!imageUrl}
        >
          Upload Image
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

export default ImageUploader;
