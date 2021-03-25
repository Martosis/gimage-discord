const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json')

const GoogleImages = require('google-images');
const imageClient = new GoogleImages(config.CSE_TOKEN, config.API_TOKEN);

client.login(config.LOGIN_TOKEN);

client.on('ready', () => {
    console.log(`Logged into ${client.user.tag}`);
})

client.on('message', async (message) => {
    if (!message.content.startsWith(config.PREFIX + 'gimage') || message.author.bot) return;
    
    const args = message.content.slice((config.PREFIX + 'gimage').length).trim();
    
    imageClient.search(args).then(images => {
        if (images.length == 0) return;
        message.channel.send(images[0].url);
    })
})