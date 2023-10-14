import { React } from "react";
import "./InputForm.css";

export function InputForm({
  prompt,
  setPrompt,
  generate,
  setLoading,
  loading,
  result,
  setResult,
}) {
  function handleChange(event) {
    const inputValue = event.target.value;
    setPrompt(inputValue);
  }

  async function handleClick(event) {
    event.preventDefault();
    if (prompt?.length === 0) {
      alert("Please type in what you would like to generate");
      return;
    }

    setLoading(true);

    try {
      // Make the generate API call
      const data = { prompt: prompt };
      const generateResponse = await generate(data);
      setResult(generateResponse);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inputForm">
      <div className="title">Prompt</div>
      <form className="form">
        <div>
          <textarea
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={handleChange}
          />
        </div>
        <button
          className="generateButton"
          onClick={handleClick}
          disabled={loading}
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
