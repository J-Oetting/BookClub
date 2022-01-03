const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-to-shelf')
    .setDescription('Add a book you want to read later to the club shelf. Only 5 books can be on the shelf at a given time.'),
    async execute(interaction){

    }
}