import userEvent from "@testing-library/user-event";
import React from "react";
import ChapterItem from "./ChapterItem";
import "./ChapterList.css";

const ChapterList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No chapters found.</h2>
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