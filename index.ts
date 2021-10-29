import DiscordJS, { Channel, Intents, MessageEmbed, TextChannel } from 'discord.js'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
var random = require('./functions/random')
var songrec = require('./functions/songrec')

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.on('ready', () => {
    console.log('ready')
    // slash commands 
    // starting with guild, then moving to global after testing
    const guildId = '885962301071585281'
    const guild = client.guilds.cache.get(guildId)

    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'pings me'
    })
    commands?.create({
        name: 'rr',
        description: 'gives a cool video'
    })
    commands?.create({
        name: 'roll',
        description: 'roll a dice with \`num1\` sides', 
        options: [{
            name: 'num1',
            description: 'number of sides',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    commands?.create({
        name: 'avatar', 
        description: 'displays the avatar of specified user',
        options: [{
            name: 'username',
            description: 'username for avatar',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
        }]
    })

    commands?.create({
        name: 'multiply',
        description: 'multiply 2 numbers',
        options: [{
            name: 'num1',
            description: 'first number to multiply',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: 'num2',
            description: 'second number to multiply',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }
        ]
    })

    commands?.create({
        name: 'songrec',
        description: 'recommends a song based on genre, artist, track',
        options: [{
            name: 'genre',
            description: 'genre you want a rec for',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'artist',
            description: 'artist you want a rec for',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'song',
            description: 'song you want a rec for',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        }
        ]
    })


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    const { commandName, options } = interaction

	if (commandName === 'ping') {
        const start = new Date().getTime()
		await interaction.reply({
            content: 'pinging...', fetchReply: true
        })
        interaction.editReply(`:ping_pong: | ${(new Date().getTime() - start) / 1000}s response`)
	}
    if (commandName === 'rr') {
		await interaction.reply({
            content: '[check out this cool video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
            ephemeral: true
        })
	}
    if (commandName === 'multiply') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!
        await interaction.reply({
            content: `the product is ${num1 * num2}`,
            ephemeral: true
        })
    }
    if (commandName === 'roll') {
        const sides = options.getNumber('num1')!
        await interaction.reply({
            content: `the result of your roll is ${random.random(1, sides)}`,
        })
    }
    if (commandName === 'avatar') {
        const user = options.getUser('username')
        const username = (user) ? user.displayAvatarURL() : interaction.user.displayAvatarURL()
        const avaembed = new DiscordJS.MessageEmbed()
        .setAuthor('Dazai')
        .setImage(username)
        
        await interaction.reply(username)
    } 
    if (commandName === 'songrec') {
        const genre = options.getString('genre')!
        const song = options.getString('song')!
        const artist = options.getString('artist')!
        
        // content: `${song.title} by ${song.artist}`, ephemeral: true
        await interaction.reply(`You want recommendations for: ${songrec.songrec(song, artist, genre)}`)
    }
    
})

})

client.login(process.env.token)
