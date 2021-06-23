import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ChapterForm.css";

const UpdateChapter = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModel, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteWarningHandler = () => {
    setShowConfirmModal(false);
    console.log("deleting...");
  };

  const chapterId = useParams().chapterId;
  const history = useHistory();

  const [loadedChapter, setLoadedChapter] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      number: {
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

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/chapters/${chapterId}`
        );
        setLoadedChapter(responseData.chapter);
        setFormData(
          {
            name: {
              value: responseData.chapter.name,
              isValid: true,
            },
            title: {
              value: responseData.chapter.title,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchChapter();
  }, [sendRequest, chapterId, setFormData]);

  const chapterUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/chapters/${chapterId}`,
        "PATCH",
        JSON.stringify({
          number: formState.inputs.number.value,
          title: formState.inputs.title.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedChapter && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find chapter!</h2>
        </Card>
      </div>
    );
  }

  console.log("formState.inputs: " + formState.inputs);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModel}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        conentClass="stip-display__modal-content"
        footerClass="strip-display__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteWarningHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this chapter? There is no undo!</p>
      </Modal>
      {!isLoading && loadedChapter && (
        <div class="card">
          <div class="card-body">
            <form onSubmit={chapterUpdateSubmitHandler}>
              <Input
                id="number"
                element="input"
                type="number"
                label="Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid chapter number."
                onInput={inputHandler}
                initialValue={loadedChapter.number}
                initialValid={true}
              />
              <Input
                id="title"
                element="textarea"
                label="title"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid title (min. 5 characters)."
                onInput={inputHandler}
                initialValue={loadedChapter.title}
                initialValid={true}
              />
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <Button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={!formState.isValid}
              >
                Update Chapter
              </Button>
              <Button
                onClick={showDeleteWarningHandler}
                className="btn btn-sm btn-danger"
              >
                Delete Chapter
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateChapter;
