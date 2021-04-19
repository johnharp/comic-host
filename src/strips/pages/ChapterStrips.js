import React, {useContext} from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import StripList from "../components/StripList";
import Button from "../../shared/components/FormElements/Button";

var DUMMY_STRIPS = [
  {
    id: 1,
    chapterId: 1,
    imageUrl:
      "http://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg",
  },
  {
    id: 2,
    chapterId: 1,
    imageUrl:
      "http://www.girlgeniusonline.com/ggmain/strips/ggmain20021106.jpg",
  },
  {
    id: 3,
    chapterId: 2,
    imageUrl:
      "http://www.girlgeniusonline.com/ggmain/strips/ggmain20021108.jpg",
  },
];

const ChapterStrips = () => {
  const auth = useContext(AuthContext);

  const chapterId = parseInt(useParams().chapterId);
  const loadedStrips = DUMMY_STRIPS.filter((s) => s.chapterId === chapterId);
  console.log(loadedStrips);
  return (
    <React.Fragment>
      {auth.isLoggedIn && <div className="center">
        <Button to={`/chapter/${chapterId}/edit`}>Edit Chapter</Button>
      </div>}
      <StripList items={loadedStrips} />
    </React.Fragment>
  );
};

export default ChapterStrips;
