import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoFileUploadForm } from "./VideoFileUploadForm";
import { Result } from "./Result";
import "./GeneratePost.css";
import TwelveLabsApi from "./TwelveLabsApi";

export function GeneratePost({ video, index, fetchVideo }) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [selectedFile, setSelectedFile] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

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
    <div className="generatePost">
      <h1 className="appTitle">Generate Social Posts for Your Video</h1>
      <div className="videoFileUploadForm">
        <VideoFileUploadForm
          index={index}
          fetchVideo={fetchVideo}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isFileUploading={isFileUploading}
          setIsFileUploading={setIsFileUploading}
        />
      </div>
      <div className="videoAndInputForm">
        {video.data && !selectedFile && (
          <Video url={video.data.hls.video_url} />
        )}
        {!video.data && (
          <p>There is no video in your index. Start uploading one!</p>
        )}
        {video.data && !selectedFile && result.result && (
          <div className="videoTitle">{vidTitleClean}</div>
        )}
        {!selectedFile && (
          <InputForm
            prompt={prompt}
            setPrompt={setPrompt}
            generate={generate}
            result={result}
            setResult={setResult}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && result.result && !selectedFile && video.data && (
        <Result result={result} />
      )}{" "}
    </div>
  );
}
