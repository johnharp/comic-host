import React from "react";
import { useHistory, useParams } from 'react-router-dom';

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

import "./StripForm.css";

const ChapterNewStrip = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const chapterId = useParams().chapterId;
  const [formState, inputHandler] = useForm(
    {
      number: {
        value: "",
        isValid: false,
      },
      caption: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const stripSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/strips",
        "POST",
        JSON.stringify({
          number: formState.inputs.number.value,
          caption: formState.inputs.caption.value,
          chapter: chapterId
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="strip-form" onSubmit={stripSubmitHandler}>
        <h2>Add a page</h2>

        <Input
          id="number"
          element="input"
          type="number"
          label="Number"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid page number."
          onInput={inputHandler}
        />

        <Input
          id="caption"
          element="input"
          type="textarea"
          label="Caption"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid caption (at least 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Page
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ChapterNewStrip;
