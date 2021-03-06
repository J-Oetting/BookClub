const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('members')
    .setDescription('List of members.'),
    async execute(interaction){
        
        const club = await Models.Club.findOne({
            where: {
                guildId: interaction.member.guild.id
            }
        })

        if (!club){
            await interaction.reply(`You don't have a club yet! Use the /found-club command to create it.`);
            return
        }
        
        const members = await club.getMembers();
        let reply = [`Here are the members of ${club.dataValues.name}:`]
        
        members.forEach(member => {
            reply.push(`${member.dataValues.username}`)
        })

        reply = reply.join('\n');
        await interaction.reply(reply);
    }
}