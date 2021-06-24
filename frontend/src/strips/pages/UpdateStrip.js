import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const UpdateStrip = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const showDeleteWarnHandler = () => {
    setShowDeleteConfirmModal(true);
  };

  const cancelDeleteWarnHandler = () => {
    setShowDeleteConfirmModal(false);
  };

  const confirmDeleteWarnHandler = () => {
    setShowDeleteConfirmModal(false);
  };

  const stripId = useParams().stripId;
  const history = useHistory();

  const [loadedStrip, setLoadedStrip] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      number: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchStrip = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/strips/${stripId}`
        );
        setLoadedStrip(responseData.strip);
        setFormData({
          number: {
            value: responseData.strip.number,
            isValid: true,
          },
        });
      } catch (err) {}
    };
    fetchStrip();
  }, [sendRequest, stripId, setFormData]);

  const stripUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/strips/${stripId}`,
        "PATCH",
        JSON.stringify({
          number: formState.inputs.number.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {!isLoading && loadedStrip && (
        <React.Fragment>
          <Link to={`/chapter/${loadedStrip.chapter}/strips`}>
            <div>Back</div>
          </Link>

          <form onSubmit={stripUpdateSubmitHandler}>
            <div className="card">
              <div className="card-body">
                <Input
                  id="number"
                  element="input"
                  type="number"
                  label="Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid strip number."
                  onInput={inputHandler}
                  initialValue={loadedStrip.number}
                  initialValid={true}
                />
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formState.isValid}
                  >
                    Update Strip
                  </Button>
                  <Button
                    type="button"
                    onClick={showDeleteWarnHandler}
                    className="btn btn-danger"
                  >
                    Delete Strip
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UpdateStrip;
