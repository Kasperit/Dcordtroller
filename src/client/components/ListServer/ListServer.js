import React from 'react'


const ListServer = (props) => {
    const {listOfGuilds} = props;
    let listServer = [];
    for(let i = 0; i< listOfGuilds.length; i++){
        listServer.push(
            <li onClick={() => props.chooseServer(listOfGuilds[i].server)}>
                {listOfGuilds[i].server}
            </li>
        )
    }
    return (
        <ul>
            {listServer}
        </ul>
    )
};

export default ListServer;