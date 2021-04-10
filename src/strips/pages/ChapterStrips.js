import React from 'react';
import { useParams } from 'react-router-dom';

import StripList from '../components/StripList';

var DUMMY_STRIPS = [
    { id: 1, chapterId: 1, imageUrl: 'http://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg' },
    { id: 2, chapterId: 1, imageUrl: 'http://www.girlgeniusonline.com/ggmain/strips/ggmain20021106.jpg' },
    { id: 3, chapterId: 2, imageUrl: 'http://www.girlgeniusonline.com/ggmain/strips/ggmain20021108.jpg' }
];

const ChapterStrips = () => {
    const chapterId = parseInt(useParams().chapterId);
    const loadedStrips = DUMMY_STRIPS.filter(s => s.chapterId === chapterId);
    console.log(loadedStrips);
    return <StripList items={loadedStrips} />;
};

export default ChapterStrips;