import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./PrepareUpload.css";
import TwelveLabsApi from "./TwelveLabsApi";

export function PrepareUpload({ video }) {
  const [loading, setLoading] = useState(false);
  console.log("🚀 > PrepareUpload > loading=", loading);
  const [field1, field2, field3] = ["topic", "title", "hashtag"];
  const [field1Prompt, setField1Prompt] = useState({
    fieldName: field1,
    isChecked: true,
  });
  const [field2Prompt, setField2Prompt] = useState({
    fieldName: field2,
    isChecked: true,
  });
  const [field3Prompt, setField3Prompt] = useState({
    fieldName: field3,
    isChecked: true,
  });
  const [result, setResult] = useState({
    types: [],
    result: "",
  });
  console.log("🚀 > PrepareUpload > result=", result);

  function generate(data) {
    return TwelveLabsApi.generateGist(data, video.data._id);
  }

  return (
    <div className="prepareUpload">
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm />
      </div>
      <div className="videoAndInputForm">
        {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
        <InputForm
          field1Prompt={field1Prompt}
          setField1Prompt={setField1Prompt}
          field2Prompt={field2Prompt}
          setField2Prompt={setField2Prompt}
          field3Prompt={field3Prompt}
          setField3Prompt={setField3Prompt}
          field1={field1}
          field2={field2}
          field3={field3}
          generate={generate}
          result={result}
          setResult={setResult}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && <Result result={result} />}
    </div>
  );
}