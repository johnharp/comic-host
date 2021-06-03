import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import StripList from "../components/StripList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Button from "../../shared/components/FormElements/Button";


const ChapterStrips = () => {
  const { loadedStrips, setLoadedStrips } = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const chapterId = useParams().chapterId;

  useEffect(() => {
    const fetchStrips = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/strips/chapter/${chapterId}`);
        setLoadedStrips(responseData.strips);
      } catch(err) {

      }
    };
    fetchStrips();
  }, [sendRequest, chapterId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <div className="center">
        <LoadingSpinner />
      </div>}
      {auth.isLoggedIn && <div className="center">
        <Button to={`/chapter/${chapterId}/edit`}>Edit Chapter</Button>
      </div>}

      {!isLoading && loadedStrips && <StripList items={loadedStrips} />}

      {auth.isLoggedIn && <div className="center">
        <Button to={`/chapter/${chapterId}/newstrip`}>Add new Page</Button>
      </div>}
    </React.Fragment>
  );
};

export default ChapterStrips;
