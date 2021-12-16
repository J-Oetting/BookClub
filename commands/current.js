const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('current')
    .setDescription(`The club's current read.`),
    async currentBook (guildId){

        const club = await Models.Club.findOne({
            where: {
                guildId,
            }
        })

        const currentBook = await Models.Book.findOne({
            include: {
                model: Models.Club,
                where: {
                    id: club.id
                },
                through: {
                    where: {
                        current: true
                    }
                }
            }
        })

        return currentBook ;
        
    },
    async execute (interaction){

        const currentBook = await this.currentBook(interaction.member.guild.id);

        await interaction.reply(`We're currently reading: ${currentBook.dataValues.title} by ${currentBook.dataValues.author}`);
        
    }
}