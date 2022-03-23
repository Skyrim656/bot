    const Discord = require('discord.js');
    const config = require('../config.json');

    module.exports.run = async (client, message, args) => {

        const {
            color,
            colorError
        } = require('../config.json');


        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
            const notpermer = new Discord.MessageEmbed();
            notpermer.setAuthor('Erreur')
            notpermer.setColor(colorError)
            notpermer.setDescription(`:x: Vous n'avez pas la permission de créer un sondage`)
            return message.channel.send(notpermer)
        }

        if (!args[0]) {
            const notmentions = new Discord.MessageEmbed();
            notmentions.setAuthor('Erreur')
            notmentions.setColor(colorError)
            notmentions.setDescription(`:x: Vous n'avez pas donné la nature de la suggestion`)
            return message.channel.send(notmentions)
        }

        const sondageslice = args.join(' ');

        const embed = new Discord.MessageEmbed()
        embed.setAuthor(`Suggestion de Skyrim ${message.author}`)
        embed.setColor(color)
        embed.setDescription(`${sondageslice}`)
        message.channel.send(embed).then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function () {});
    }
    module.exports.help = {
        name: 'suggestion',
        category: "utils"
    }
