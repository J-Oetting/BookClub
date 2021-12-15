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
        const MemberClub = Models.MemberClub;

        if (!clubName){
            await interaction.reply('Your club needs a name!');
            return
        }

        try {
            let club = await Club.findOrCreate({
                where: {
                    guildId: interaction.member.guild.id
                },
                defaults: {
                    name: clubName,
                    guildName: interaction.member.guild.name,
                }
            })
            
            let member = await Member.findOrCreate({
                where: {
                    username: `${interaction.user.username} ${interaction.user.discriminator}`
                }
            })
            
            club = club[0];
            member = member[0];

            await club.addMember(member);

            await interaction.reply(`You've founded your book club!`)
        } catch (e){
            await interaction.reply('Couldnt create that club, sorry.')
            console.error(e)
        }
    }
}
