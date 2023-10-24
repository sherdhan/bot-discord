require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} online.`);
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.channel.id == process.env.CHANNEL_ID) {
        var content = message.content.toLowerCase()
        if(content.includes('share')){
            const thread_author = message.member.displayName;
            content = content.replace('share', '')
            const thread = await message.startThread({
                name: 'Thread ' + thread_author + ' ' +content,
            });

            console.log(`"${thread.name}" created`);
        }else{
            await message.reply({ 
                content: 'dont chat this channel!',
                ephemeral: true
            });
            message.delete(message.id);
        }
    }
});

client.login(process.env.TOKEN);
