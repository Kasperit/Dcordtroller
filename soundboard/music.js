const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NDg2NDgzMTc3NjI0MzA1Njc0.DnEGnA.0e9GJA_nkFkXLTbxePjfaqkrNIM');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let listOfGuilds = [];
    const listOfGuildsFormat = client.guilds.array();
    for (let i = 0; i < listOfGuildsFormat.length; i++) {
        let listOfMembersActive = [];
        let listOfMembersBanned = [];
        let listOfServerAdmins = [];
        let listOfMemberObjects = [];
        let listOfGuildVoiceChannels = [];
        listOfGuildsFormat[i].channels.array().forEach(element => {
            if (element.type == "voice") {
                listOfGuildVoiceChannels.push(element);
            }
        });
        listOfGuildsFormat[i].fetchBans().then(function (users) {
            Array.from(users).forEach(e => {
                listOfMembersBanned.push(e[1]);
            });
        });
        for (let x = 0; x < listOfGuildsFormat[i].members.array().length; x++) {
            if (listOfGuildsFormat[i].members.array()[x].permissions.has("KICK_MEMBERS")) {
                listOfServerAdmins.push(listOfGuildsFormat[i].members.array()[x].user);
            }
            listOfMembersActive.push(listOfGuildsFormat[i].members.array()[x].user);
            listOfMemberObjects.push(listOfGuildsFormat[i].members.array()[x]);
        }
        listOfGuilds.push(
            {
                serverObject: listOfGuildsFormat[i],
                server: listOfGuildsFormat[i].name,
                serverVoiceChannels: listOfGuildVoiceChannels,
                serverAdmins: listOfServerAdmins,
                usersActive: listOfMembersActive,
                memberObjects: listOfMemberObjects,
                usersBanned: listOfMembersBanned
            }
        )
    }
});

client.on('message', async msg => {
    if (msg.content == "testiplay") {
        msg.channel.send("!asd");
    }

    if (msg.author.bot && msg.content.startsWith("!")) {
        let message = msg
        let voiceChannelString = msg.content.substring(1).split(':')[0];
        let serverNameString = msg.content.substring(1).split(':')[1];
        msg.delete();
        for (let index = 0; index < client.guilds.array().length; index++) {
            if (client.guilds.array()[index].name == serverNameString) {
                for (let y = 0; y < client.guilds.array()[index].channels.array().length; y++) {
                    if (client.guilds.array()[index].channels.array()[y].name === voiceChannelString) {
                        let channelObject = client.guilds.array()[index].channels.array()[y];
                        console.log("kanava type:" + channelObject.type);
                        const ytdl = require('ytdl-core');
                        const streamOptions = { seek: 0, volume: 1 };
                        var voiceChannel = channelObject;
                        voiceChannel.join().then(connection => {
                            console.log("joined channel");
                            const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter: 'audioonly' });
                            const dispatcher = connection.playStream(stream, streamOptions);
                            dispatcher.on("end", end => {
                                console.log("left channel");
                                voiceChannel.leave();
                            });
                        }).catch(err => console.log(err));
                        break;
                    }
                }
            }
        }
    }

    if (msg.content == "play") {
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 1 };
        var voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            console.log("joined channel");
            const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
    }
});