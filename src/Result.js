import "./Result.css";

export function Result({ result }) {
  return (
    <div className="result">
      <div className="resultTitle">Result</div>
      <div>{result.data}</div>
    </div>
  );
}
