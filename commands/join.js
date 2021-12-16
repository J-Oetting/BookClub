const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join the BookClub!'),
    async execute(interaction){
        const Member = Models.Member;
        const Club = Models.Club;

        try {
             const member = await Member.findOrCreate({
                where: {
                    username: `${interaction.user.username} ${interaction.user.discriminator}`
                }
            })

            const club = await Club.findOne({
                where: {
                    guildId: `${interaction.member.guild.id}`
                }
            })

            if (!club){
                await interaction.reply(`You don't have a club yet! Use the /found-club command to create it.`);
                return
            }

            await club.addMember(member[0]);

            await interaction.reply('Congrats! Youre part of the club!')

        } catch (e){
            await interaction.reply('Oops. Error joining, try again later.')
        }

    }
}