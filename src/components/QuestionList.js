import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3000/questions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.prompt}</li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;


