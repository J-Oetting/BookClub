const fs = require('fs');
const { Client, Intents, Interaction, Collection } = require('discord.js');
const dotenv = require('dotenv');
const { db } = require('./database/index');

dotenv.config();

const dbsync = async () => {
    await db.sync();
}

dbsync();

const token = process.env.DISCORD_TOKEN;
const client  = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready!');
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error){
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephermal: true})
    }

    
});

client.login(token);