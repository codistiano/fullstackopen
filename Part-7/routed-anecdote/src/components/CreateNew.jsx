import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const { reset: resetContent, ...contentInput } = content;
  const { reset: resetAuthor, ...authorInput } = author;
  const { reset: resetInfo, ...infoInput } = info;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: content.author,
      info: content.info,
      votes: 0,
    });
    props.setNotification(`a new anecdote ${content.value} created`);
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault()
    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...content}
          />
        </div>
        <div>
          author
          <input
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            {...info}
          />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
