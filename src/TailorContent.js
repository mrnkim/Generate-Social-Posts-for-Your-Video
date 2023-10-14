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

  const vidTitleRaw = video?.data?.metadata.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  function generate(data) {
    return TwelveLabsApi.generate(data, video.data._id);
  }

  return (
    <div className="tailorContent">
      <h1 className="appTitle">Generate Social Posts for Your Video</h1>
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm />
      </div>
      <div className="videoAndInputForm">
        {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
        {result ? <div className="videoTitle">{vidTitleClean}</div> : null}{" "}
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
