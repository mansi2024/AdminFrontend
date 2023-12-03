import React, { useState, useEffect } from 'react';
import "./UserData.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserData = ({ users, selectedRows, onSelectRow, onDeleteSelected }) => {
    const [updateState, setUpdateState] = useState(-1);
    const [displayedUsers, setDisplayedUsers] = useState(users);

    const handleCheckboxChange = (userId) => {
        onSelectRow(userId);
      };

    useEffect(() => {
        setDisplayedUsers(users);
    }, [users]);

    const handleUpdate = (updatedUser) => {
        const updatedUsers = displayedUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        console.log("Updated users:", updatedUsers);
        setDisplayedUsers(updatedUsers);
        setUpdateState(-1);
    };

    const handleDelete = (userId) => {
        const updatedUsers = displayedUsers.filter(user => user.id !== userId);
        console.log("Deleted user:", userId);
        setDisplayedUsers(updatedUsers);
    };

    return (
        <>
        
            {displayedUsers.map((curUser) => {
                const { id, name, email, role } = curUser;

                return updateState === id ? (
                    <Edit key={id} curUser={curUser} handleUpdate={handleUpdate} />
                ) : (
                    <tr className="head" key={id}>
                        <td className="column">
              <input
                type="checkbox"
                checked={selectedRows.includes(id)}
                onChange={() => handleCheckboxChange(id)}
              />
            </td>
                        <td className="column">{name}</td>
                        <td className="column">{email}</td>
                        <td className="column">{role}</td>
                        <td className="column2">
                            <button
                                className="icon-button"
                                onClick={() => setUpdateState(id)}
                                type="button"
                            >
                                <FaRegEdit />
                            </button>
                            <button
                                className="icon-button1"
                                onClick={() => handleDelete(id)}
                                type="button"
                            >
                                <MdDelete />
                            </button>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

const Edit = ({ curUser, handleUpdate }) => {
    const [editedUser, setEditedUser] = useState({ ...curUser });

    const handleInput = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editedUser);
    };

    return (
        <tr>
            <td className="column">
              <input
                type="checkbox"
                
              />
            </td>
            <td className="column">
                <input
                    className="input"
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={(e) => handleInput(e)}
                />
            </td>
            <td className="column">
                <input
                    className="input"
                    onChange={(e) => handleInput(e)}
                    type="text"
                    name="email"
                    value={editedUser.email}
                />
            </td>
            <td className="column">
                <input
                    className="input"
                    onChange={(e) => handleInput(e)}
                    type="text"
                    name="role"
                    value={editedUser.role}
                />
            </td>
            <td className="column3">
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                    Save
                </button>
            </td>
        </tr>
    );
};

export default UserData;

















































// import React, { useState } from 'react';
// import "./UserData.css";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// const UserData = ({ users }) => {
//     const [updateState, setUpdateState] = useState(-1);

//     const handleUpdate = (updatedUser) => {
//         // Implement the logic to update the user data in your state or API
//         // You can use a callback function or dispatch an action to update the state
//         const updatedUsers = users.map((user) =>
//             user.id === updatedUser.id ? updatedUser : user
//         );
//         console.log("Updated users:", updatedUsers);
//         setUpdateState(-1);
//         // Now you can use the updatedUsers state wherever needed
//     };
//     return (
//         <>
//             {users.map((curUser) => {
//                 const { id, name, email, role } = curUser;

//                 return updateState === id ? (
//                     <Edit key={id} curUser={curUser} handleUpdate={handleUpdate} />
//                 ) : (
//                     <tr className="head" key={id}>
//                         <td className="column">{name}</td>
//                         <td className="column">{email}</td>
//                         <td className="column">{role}</td>
//                         <td className="column2">
//                             <button
//                                 className="icon-button"
//                                 onClick={() => setUpdateState(id)}
//                                 type="button"
//                             >
//                                 <FaRegEdit />
//                             </button>
//                             <button className="icon-button1" type="button">
//                                 <MdDelete />
//                             </button>
//                         </td>
//                     </tr>
//                 );
//             })}
//         </>
//     );
// };

// const Edit = ({ curUser, handleUpdate }) => {
//     const [editedUser, setEditedUser] = useState({ ...curUser });

//     const handleInput = (e) => {
//         setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleUpdate(editedUser);
//     };

//     return (
//         <tr>
//             <td className="column">
//                 <input
//                     className="input"
//                     type="text"
//                     name="name"
//                     value={editedUser.name}
//                     onChange={(e) => handleInput(e)}
//                 />
//             </td>
//             <td className="column">
//                 <input
//                     className="input"
//                     onChange={(e) => handleInput(e)}
//                     type="text"
//                     name="email"
//                     value={editedUser.email}
//                 />
//             </td>
//             <td className="column">
//                 <input
//                     className="input"
//                     onChange={(e) => handleInput(e)}
//                     type="text"
//                     name="role"
//                     value={editedUser.role}
//                 />
//             </td>
//             <td className="column">
//                 <button type="submit" onClick={(e) => handleSubmit(e)}>
//                     Save
//                 </button>
//             </td>
//         </tr>
//     );
// };

// export default UserData;







