import usePostWorkflow from "@/hooks/usePostWorkflow";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Compose from "./Compose";
import Done from "./Done";
import ImageUploader from "./ImageUploader";
import Invalid from "./Invalid";
import Processing from "./Processing";
import Review from "./Review";
import VideoUploader from "./VideoUploader";
import Steps from "./Steps";

const PostCreationWizard = () => {
  const { currentState, handleNext } = usePostWorkflow();

  console.log("currentState", currentState);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>
          Add link for an image, some title and text, and a link for a YouTube
          video.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Steps currentState={currentState} />
      </CardContent>

      <CardContent>
        {currentState.type === "select-image" && (
          <ImageUploader currentState={currentState} handleNext={handleNext} />
        )}

        {currentState.type === "compose" && (
          <Compose currentState={currentState} handleNext={handleNext} />
        )}

        {currentState.type === "add-video" && (
          <VideoUploader currentState={currentState} handleNext={handleNext} />
        )}

        {currentState.type === "review" && (
          <Review currentState={currentState} handleNext={handleNext} />
        )}

        {currentState.type === "done" && <Done currentState={currentState} />}

        <Processing currentState={currentState} />
        <Invalid currentState={currentState} handleNext={handleNext} />
      </CardContent>
    </Card>
  );
};

export default PostCreationWizard;
