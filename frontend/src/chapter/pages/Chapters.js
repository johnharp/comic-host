import React, { useEffect, useState } from "react";
import ChapterList from "../components/ChapterList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Chapters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedChapters, setLoadedChapters] = useState();

  const CHAPTERS = [
    {
      id: "1",
      name: "Chapter 1",
      title: "Agatha Heterodyne and the Beetleburg Clank",
      image: "https://www.girlgeniusonline.com/books/1.jpg",
    },
    {
      id: "2",
      name: "Chapter 2",
      title: "Agatha Heterodyne and the Airship City",
      image: "https://www.girlgeniusonline.com/books/2.jpg",
    },
    {
      id: "3",
      name: "Chapter 3",
      title: "Agatha Heterodyne and the Monster Engine",
      image: "https://www.girlgeniusonline.com/books/3.jpg",
    },
  ];

  // run only once
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/chapters");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedChapters(responseData.chapters);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedChapters && <ChapterList items={loadedChapters} />}
    </React.Fragment>
  );
};

export default Chapters;
