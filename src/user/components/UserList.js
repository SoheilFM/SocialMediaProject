import React from 'react';

import UserItem from './UserItem.js';
import Card from '../../shared/components/UIElements/Card.js';
import './UserList.css';

const UserList = (props) => {
    if (props.item.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2> No Users Found</h2>
                </Card>
            </div>
        );
    }
    return (
        <ul className='users-list'>
            {props.item.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.place}
                />
            ))}
        </ul>
    );
};
export default UserList;
