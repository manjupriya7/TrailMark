import React, { useTransition } from "react";

import UserItem from "./UserItem";

import Card from "../../shared/components/UIElements/Card";
import './UsersList.css';

const UsersList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                <h2>No users found</h2>
                </Card>
            </div>
        );
    }
    return <ul>
        {props.items.map(user => (
            // map array of objects with arrray jsx elements
            <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length} />
        ))}
        {/* output in jsx form */}
    </ul>

};
export default UsersList;