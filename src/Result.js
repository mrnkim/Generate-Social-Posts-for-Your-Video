import "./Result.css";

export function Result({ result }) {
  return (
    <div className="result">
      <div className="resultTitle">Generated post</div>
      <div>{result.data}</div>
    </div>
  );
}
