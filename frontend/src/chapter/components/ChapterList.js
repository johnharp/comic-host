import React from "react";

import ChapterItem from "./ChapterItem";

const ChapterList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="card">
                <div className="card-body card-secondary">
                    <h2>No chapters found.</h2>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>

        <div className="row">
            {props.items.map((chapter) => (
                    <ChapterItem
                        key={chapter.id}
                        id={chapter.id}
                        image={chapter.image}
                        number={chapter.number}
                        title={chapter.title}
                        stripCount={chapter.strips.length}
                        />
                ))}   
        </div>
        <ul className="chapter-list">
            {props.items.map((chapter) => (
                <ChapterItem
                    key={chapter.id}
                    id={chapter.id}
                    image={chapter.image}
                    number={chapter.number}
                    title={chapter.title}
                    stripCount={chapter.strips.length}
                    />
            ))}
        </ul>
        </React.Fragment>
    )
};

export default ChapterList;