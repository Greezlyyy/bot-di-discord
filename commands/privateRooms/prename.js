module.exports = {
    name: "prename",
    aliases: [],
    onlyStaff: false,
    channelsGranted: [],
    async execute(message, args, client) {
        var privaterooms = serverstats.privateRooms

        if (!privaterooms.find(x => x.owner == message.author.id)) {
            warning(message, "Non hai una stanza", "Per usare questo comando devi essere owner di una stanza privata")
            return
        }

        var room = privaterooms.find(x => x.owner == message.author.id)

        if (message.channel.id == config.idCanaliServer.commands || (room.text && message.channel.id == room.text)) {

        }
        else {
            var embed = new Discord.MessageEmbed()
                .setTitle("Canale non concesso")
                .setColor("#F15A24")
                .setDescription(`Non puoi utilizzare il comando \`!prename\` in questo canale`)

            var data = new Date()
            if ((data.getMonth() == 9 && data.getDate() == 31) || (data.getMonth() == 10 && data.getDate() == 1)) {
                embed.setThumbnail("https://i.postimg.cc/kXkwZ1dw/Not-Here-Halloween.png")
            }
            else {
                embed.setThumbnail("https://i.postimg.cc/857H22km/Canale-non-conceso.png")
            }

            message.channel.send(embed).then(msg => {
                message.delete({ timeout: 15000 })
                    .catch(() => { })
                msg.delete({ timeout: 15000 })
                    .catch(() => { })
            })
            return
        }

        if (room.type == "textVoice") {
            warning(message, "Quale canale?", `Hai due canali privati e puoi rinominarli **diversamente** entrambi. Per il canale **tesuale** utilizza \`!ptrename [name]\` mentre per il canale **vocale** usa \`!pvrename [name]\``)
            return
        }

        var name = args.join(" ")
        if (!name) {
            error(message, "Nome non valido", "`!prename [name]`")
            return
        }

        if (name.length > 100) {
            error(message, "Nome troppo lungo", "Inserisci un nome con meno di 100 caratteri")
            return
        }
        if (room.text) {
            var canale = client.channels.cache.get(room.text)
            canale.setName(name)
                .then(() => correct(message, "Canale rinominato", `Il tuo canale ?? stato rinominato in \`${canale.name}\``))
                .catch(() => error(message, "Nome non valido", "`!prename [name]`"))
        }
        if (room.voice) {
            var canale = client.channels.cache.get(room.voice)
            canale.setName(name)
                .then(() => correct(message, "Canale rinominato", `Il tuo canale ?? stato rinominato in \`${canale.name}\``))
                .catch(() => error(message, "Nome non valido", "`!prename [name]`"))

        }
    },
};
