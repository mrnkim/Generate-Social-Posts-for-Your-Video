import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * GeneratePost -> Video
 * GeneratePost -> {VideoFileUploadForm} -> Video
 *
 */

export function Video({ url }) {
  return (
    <div className="video">
      <ReactPlayer className="react-player" url={url} controls />
    </div>
  );
}
