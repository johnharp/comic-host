import React from "react";

import ChapterItem from "./ChapterItem";
import Card from '../../shared/components/UIElements/Card';

import "./ChapterList.css";

const ChapterList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No chapters found.</h2>
                </Card>
            </div>
        )
    }

    return (
        <ul className="chapter-list">
            {props.items.map((chapter) => (
                <ChapterItem
                    key={chapter.id}
                    id={chapter.id}
                    image={chapter.image}
                    name={chapter.name}
                    title={chapter.title}
                    />
            ))}
        </ul>
    )
};

export default ChapterList;