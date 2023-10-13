import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./TailorContent.css";
import TwelveLabsApi from "./TwelveLabsApi";

export function TailorContent({ video }) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  function generate(data) {
    return TwelveLabsApi.generate(data, video.data._id);
  }

  return (
    <div className="prepareUpload">
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm />
      </div>
      <div className="videoAndInputForm">
        {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
        <InputForm
          prompt={prompt}
          setPrompt={setPrompt}
          generate={generate}
          result={result}
          setResult={setResult}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && result?.data?.length > 0 && <Result result={result} />}
    </div>
  );
}
