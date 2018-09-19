import React from 'react'


const ListUser = (props) => {
    const {listOfGuilds} = props;
    let listOfMembersInServer = [];
    for(let i = 0; i< listOfGuilds.length; i++){
        let listOfMembers = [];
        for (let x = 0; x < listOfGuilds[i].users.length; x++) {
            listOfMembers.push(
                <li key={`${listOfGuilds[i].users[x].user.tag}-${listOfGuilds[i].server}`}>
                    {listOfGuilds[i].users[x].user.tag}
                    <button onClick={() => props.handleKickUser(listOfGuilds[i].users[x].user.tag,listOfGuilds[i].server)}>Kick</button>
                    <button onClick={() => props.handleBanUser(listOfGuilds[i].users[x].user.tag,listOfGuilds[i].server)}>Ban</button>
                </li>
            )
        }
        listOfMembersInServer.push(
            <div key={listOfGuilds[i].server}>
                <h3>{listOfGuilds[i].server}</h3>
                <ul>
                    {listOfMembers}
                </ul>
            </div>
        )

    }
    listOfMembersInServer = listOfMembersInServer.map(member =>
        <div>
            {member}
        </div>
    );
    return (
        <ul>
            {listOfMembersInServer}
        </ul>
    )
};

export default ListUser;