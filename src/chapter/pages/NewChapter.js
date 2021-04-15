import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./ChapterForm.css";

const NewChapter = (props) => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const chapterSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="chapter-form" onSubmit={chapterSubmitHandler}>
      <h2>Create Chapter</h2>

      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />

      <Input
        id="title"
        element="input"
        type="textarea"
        label="Title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid title (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Chapter
      </Button>
    </form>
  );
};

export default NewChapter;
