import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/UIElements/Card.js';
import './UserItem.css';
import Avatar from '../../shared/UIElements/Avatar.js';

const UserItem = (props) => {
    return (
        <li className='user-item'>
            <Link to={`/${props.id}/places`}>
                <div className='user-item__image'>
                    <Avatar image={props.image} alt={props.name} />
                </div>
                <div className='user-item__info'>
                    <h2>{props.name}</h2>
                    <h3>
                        {props.placeCount}{' '}
                        {props.placeCount === 1 ? 'Place' : 'Places'}
                    </h3>
                </div>
            </Link>
        </li>
    );
};
export default UserItem;
