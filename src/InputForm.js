import { React } from "react";

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
    <form>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleClick} disabled={loading}>
        Generate
      </button>{" "}
    </form>
  );
}
