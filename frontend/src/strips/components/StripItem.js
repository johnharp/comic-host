import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './StripItem.css';

const StripItem = props => {
    return (
        <li className="strip-item">
            <Card className="strip-item__content">
                <Link to={`/strip/${props.id}`}>
                    <div className="strip-item__info">
                        <h2>#{props.number}</h2>
                        <h3>more info....</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default StripItem;