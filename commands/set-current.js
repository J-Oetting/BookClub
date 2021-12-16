const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');
const { currentBook } = require('./current')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-current')
    .setDescription(`Use this to set what we're currently reading.`)
    .addStringOption( option => option.setName('title').setDescription(`title`))
    .addStringOption( option => option.setName('author').setDescription('author'))
    .addStringOption( option => option.setName('isbn').setDescription('ISBN')),
    async execute (interaction){
        
        const title = interaction.options.getString('title');
        const author = interaction.options.getString('author');
        const isbn = interaction.options.getString('isbn');
        const search = title.replace(/\s/, '').toLowerCase();
        const oldRead = await currentBook(interaction.member.guild.id);


        if ( !title || !author){
            await interaction.reply(`You need the ${ title ? `author` : `title`} to add a book`);
            return;
        }

        let book ;

        if (isbn){
            book = await Models.Book.findOrCreate({
                where: {
                    isbn: isbn
                },
                defaults: {
                    title: title,
                    author: author,
                    search: search
                }
            })
        } else {
            book = await Models.Book.findOrCreate({
                where: {
                    search: search
                },
                defaults: {
                    title: title,
                    author: author,
                }
            })
        }

        if (book[0].current){
            interaction.reply(`We're alreay reading this, but thanks for contributing!`);
            return;
        }

        
        const club = await Models.Club.findOne({
            where: {
                guildId: interaction.member.guild.id
            }
        })
        
        if (oldRead){
            await club.addBook(oldRead, { through: { current: false}});
        }
        
        console.log('old', oldRead);
        
        await club.addBook(book[0], { through: { current: true }});

        await interaction.reply(`Great! The club is now reading: ${title} by ${author}`)

    }
}