import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import './ChapterItem.css';

const ChapterItem = props => {
    return (
        <li className="chapter-item">
            <Card className="chapter-item__content">
                <Link to={`/${props.id}/strips`}>
                    <div className="chapter-item__image">
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className="chapter-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.title}</h3>
                    </div>
                    <div className="chapter-item__actions">
                        <Button to={`/chapter/${props.id}/edit`}>Edit</Button>
                        <Button to={`/chapter/${props.id}/delete`} danger>Delete</Button>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default ChapterItem;