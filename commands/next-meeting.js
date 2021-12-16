const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next-meeting')
        .setDescription(`View the club's next meeting time.`),
        async execute (interaction){
            const club = await Models.Club.findOne({
                where: {
                    guildId: interaction.member.guild.id
                }
            })

            const meeting = club.meeting;
            const link = club.link;
            let reply = [`The club's next meeting is on ${meeting}`];

            if (link){
                reply.push(`Here is your video conference link: ${link}`);
                reply = reply.join('\n');
            } else {
                reply = reply[0] ;
            }

            await interaction.reply(reply);
        }
}