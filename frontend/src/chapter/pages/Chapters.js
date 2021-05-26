import React, { useEffect, useState } from "react";
import ChapterList from "../components/ChapterList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from '../../shared/hooks/http-hook';

const Chapters = () => {
  const { isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedChapters, setLoadedChapters] = useState();

  // run only once
  useEffect(() => {
    const fetchChapters = async () => {

      try {
        const responseData = await sendRequest('http://localhost:5000/api/chapters');
      
        setLoadedChapters(responseData.chapters);
      } catch (err) {
      }
    };
    fetchChapters();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
