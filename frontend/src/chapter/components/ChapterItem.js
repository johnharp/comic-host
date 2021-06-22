import React, {useContext} from 'react';

import { AuthContext } from "../../shared/context/auth-context";

import './ChapterItem.css';

const ChapterItem = props => {
    const auth = useContext(AuthContext);

    return (
        <div className="col-4">
            <div className="card">
                <div className="card-header bg-secondary">
                    <h3>Chapter {props.number}</h3>
                </div>
                <div className="card-body">

                    <a href={`/chapter/${props.id}/strips`}>
                        <div>
                            <img src={props.image} alt={props.name} />
                        </div>
                        <h3>{props.title}</h3>
                    </a>
                    <div>
                        {props.stripCount} pages
                    </div>
                    
                    {auth.isLoggedIn && 
                        <a href={`/chapter/${props.id}/edit`}
                            className="btn btn-sm btn-primary">
                        Edit
                        </a>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChapterItem;