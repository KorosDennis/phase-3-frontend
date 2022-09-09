import React, {useEffect, useState} from 'react';


function User ({people}) {

    return people.map(user =>{
        return  (
            <>
            <div key={user.id}>
                <p>{user.name}</p>
                <button>delete</button>
            </div>
            </>
        )
    })
}
export default User;
