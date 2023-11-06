import "./Result.css";

/** Shows the results
 *
 * App -> GenerateTitles -> {Result}
 *
 */

export function Result({ result }) {
  return (
    <div className="result">
      <div className="resultTitle">Generated post</div>
      <div>{result.data}</div>
    </div>
  );
}
