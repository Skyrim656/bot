    const { timeout } = require('async');
const Discord = require('discord.js');
    const fs = require('fs');
const { resolve } = require('path');
    const client = new Discord.Client({
        disableEveryone: true,
    });
    client.commands = new Discord.Collection();
    const config = require('./config.json');

    client.on('guildMemberAdd', member => {
        console.log(member)
        if (member.user.bot) member.ban();
    })

    client.on('guildMemberAdd', member => {
        member.guild.channels.cache.get(config.greeting.channel).send(`**${member}** a rejoint le serveur. Nous sommes désormais **${member.guild.memberCount}** ! 🎉`)
        member.roles.add(config.greeting.role)
    })
     
    client.on('guildMemberRemove', member => {
        member.guild.channels.cache.get(config.greeting.channel).send(`**${member.user.tag}**  a quitté le serveur... Nous sommes désormais **${member.guild.memberCount}** 😢`)
    })
    

    fs.readdir("./commandes/", (error, f) => {
        if (error) console.log(error);
        let Commandes = f.filter(f => f.split(".").pop() === "js");
        if (Commandes.length <= 0) return console.log("Aucune commande trouvé !");
        Commandes.forEach((f) => {
            let commande = require(`./commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
    });

    fs.readdir("./events/", (error, f) => {
        if (error) console.log(error);
        console.log(`${f.length} events en chargement`);
        f.forEach((f) => {
            const events = require(`./events/${f}`);
            const event = f.split(".")[0];
            client.on(event, events.bind(null, client));
        });
    });
    client.login(config.token);
