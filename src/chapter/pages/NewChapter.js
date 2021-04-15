import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import "./ChapterForm.css";

const NewChapter = (props) => {
  const [formState, inputHandler] = useForm(
      {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }},
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
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />

      <Input
        id="description"
        element="input"
        type="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
          Add Chapter
      </Button>
    </form>
  );
};

export default NewChapter;
