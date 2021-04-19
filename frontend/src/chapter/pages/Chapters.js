import React from 'react';
import ChapterList from "../components/ChapterList";

const Chapters = () => {
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

    return <ChapterList items={CHAPTERS} />;
};

export default Chapters;
