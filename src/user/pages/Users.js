import React from 'react';
import UserList from '../components/UserList.js';
const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Soheil',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUnTTZNCUh3VqBAL_8kLS7w5skv9NwxlrJyA&usqp=CAU',
            place: 3,
        },
    ];
    return <UserList item={USERS} />;
};

export default Users;
