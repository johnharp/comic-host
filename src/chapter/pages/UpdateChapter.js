import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ChapterForm.css';

const CHAPTERS = [
    {
        id: "1",
        name: "Chapter 1",
        title: "Agatha Heterodyne and the Beetleburg Clank",
        image: "https://www.girlgeniusonline.com/books/1.jpg"
    },
    {
        id: "2",
        name: "Chapter 2",
        title: "Agatha Heterodyne and the Airship City",
        image: "https://www.girlgeniusonline.com/books/2.jpg"
    },
    {
        id: "3",
        name: "Chapter 3",
        title: "Agatha Heterodyne and the Monster Engine",
        image: "https://www.girlgeniusonline.com/books/3.jpg"
    }
];

const UpdateChapter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const chapterId = useParams().chapterId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      title: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedChapter = CHAPTERS.find(p => p.id === chapterId);

  useEffect(() => {
    setFormData(
      {
        name: {
          value: identifiedChapter.name,
          isValid: true
        },
        title: {
          value: identifiedChapter.title,
          isValid: true
        }
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedChapter]);

  const chapterUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedChapter) {
    return (
      <div className="center">
        <h2>Could not find chapter!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  console.log("formState.inputs: " + formState.inputs);

  return (
    <form className="chapter-form" onSubmit={chapterUpdateSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid chapter name."
        onInput={inputHandler}
        initialValue={formState.inputs.name.value}
        initialValid={formState.inputs.name.isValid}
      />
      <Input
        id="title"
        element="textarea"
        label="title"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid title (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Chapter
      </Button>
    </form>
  );
};

export default UpdateChapter;
