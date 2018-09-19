import React from 'react'


const ListUser = (props) => {
    const {listOfGuilds,server} = props;
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

    if(server){
        for(let i = 0; i< listOfGuilds.length; i++){
            if(listOfGuilds[i].server === server){
                for (let x = 0; x < listOfGuilds[i].users.length; x++) {
                    listOfMembersInServer.push(
                        <li key={`${listOfGuilds[i].users[x].user.tag}-${listOfGuilds[i].server}`}>
                            {listOfGuilds[i].users[x].user.tag}
                            <button onClick={() => props.handleKickUser(listOfGuilds[i].users[x].user.tag,listOfGuilds[i].server)}>Kick</button>
                            <button onClick={() => props.handleBanUser(listOfGuilds[i].users[x].user.tag,listOfGuilds[i].server)}>Ban</button>
                        </li>
                    )
                }
            }

        }
        return (
            <ul>
                {listOfMembersInServer}
            </ul>
        )
    } else {
        return(
            <div>
            </div>
        )
    }
        }
    }
};

export default ListUser;