import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./ChapterForm.css";

const NewChapter = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      number: {
        value: "",
        isValid: false,
      },
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

  const chapterSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/chapters",
        "POST",
        JSON.stringify({
          number: formState.inputs.number.value,
          title: formState.inputs.title.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      // redirect
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="chapter-form" onSubmit={chapterSubmitHandler}>
        <h2>Create Chapter</h2>

        <Input
          id="number"
          element="input"
          type="number"
          label="Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid chapter number."
          onInput={inputHandler}
        />

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
    </React.Fragment>
  );
};

export default NewChapter;
