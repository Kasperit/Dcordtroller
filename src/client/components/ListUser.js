import React from 'react'


const ListUser = (props) => {
    const {listOfGuilds} = props;
    let listOfMembersInServer = [];
    for(let i = 0; i< listOfGuilds.length; i++){
        let listOfMembers = [];
        for (let x = 0; x < listOfGuilds[i].members.array().length; x++) {
            listOfMembers.push(
                <li key={`${listOfGuilds[i].members.array()[x].user.tag}-${listOfGuilds[i].name}`}>
                    {listOfGuilds[i].members.array()[x].user.tag}
                    <button onClick={() => console.log(`Kick ${listOfGuilds[i].members.array()[x].user.tag}`)}>Kick</button>
                </li>
            )
        }
        listOfMembersInServer.push(
            <div key={listOfGuilds[i].name}>
                <h3>{listOfGuilds[i].name}</h3>
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