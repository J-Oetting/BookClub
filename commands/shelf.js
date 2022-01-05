const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-to-shelf')
    .setDescription('Add a book you want to read later to the club shelf. Only 5 books can be on the shelf at a given time.')
    .addStringOption( option => option.setName('title').setDescription(`title`))
    .addStringOption( option => option.setName('author').setDescription('author'))
    .addStringOption( option => option.setName('isbn').setDescription('ISBN')),
    async execute(interaction){

        const title = interaction.options.getString('title');
        const author = interaction.options.getString('author');
        const isbn = interaction.options.getString('isbn');
        const search = title.replace(/\s/, '').toLowerCase();

        if (!title || !author){
            await interaction.reply(`You need the ${ title ? `author` : `title`} to add a book`);
            return;
        }
        let book ;

        if (isbn){

            [book, created]= await Models.Book.findOrCreate({
                where: {
                    isbn: isbn
                },
                defaults: {
                    title: title,
                    author: author,
                    search: search,
                }
            })
        } else {

            [book, created] = await Models.Book.findOrCreate({
                where: {
                    search: search
                },
                defaults: {
                    title: title,
                    author: author
                }
            })
        }

        

        //book exists, now add it to the waitlist
        // what is the waitlist?
    }
}