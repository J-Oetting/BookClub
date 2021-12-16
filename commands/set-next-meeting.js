const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, Models } = require('../database/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-next-meeting')
        .setDescription('Set your next meeting.')
        .addStringOption(option => option.setName(`date`).setDescription(`Date`))
        .addStringOption(option => option.setName(`time`).setDescription(`Time`))
        .addStringOption(option => option.setName('link').setDescription(`Link for video conferencing.`)),
        async execute(interaction){
            const date = interaction.options.getString('date');
            const time = interaction.options.getString('time');
            const link = interaction.options.getString('link');


            if (!date || !time){
                await interaction.reply(`Please specify a date and time. *hint* If you don't have a time yet, you can write TBD`);
                return;
            }
            
            await Models.Club.update({ meeting: `${date} @ ${time}`}, {
                where: {
                    guildId: interaction.member.guild.id
                }
            })

            if (link){
                await Models.Club.update({ link: link }, {
                    where: {
                        guildId: interaction.member.guild.id
                    }
                })
            }

            await interaction.reply('Meeting set!')
        }
}