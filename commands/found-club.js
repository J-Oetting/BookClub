const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('found-club')
    .setDescription('Found the servers bookclub!')
    .addStringOption(option => option.setName('name').setDescription('whats the name of your club?')),
    async execute(interaction){
        const clubName = interaction.options.getString('name');
        const Club = Models.Club;
        const Member = Models.Member;

        if (!clubName){
            await interaction.reply('Your club needs a name!');
            return
        }

        console.log('ran')
        try {
            const club = await Club.create({
                name: clubName,
                guildName: interaction.member.guild.name,
                guildId: interaction.member.guild.id
            })

            const member = await Member.findOrCreate({
                where: {
                    username: `${interaction.user.username} ${interaction.user.discriminator}`
                }
            })

            await interaction.reply(`You've founded your book club!`)
        } catch (e){
            await interaction.reply('Couldnt create that club, sorry.')
        }
    }
}
