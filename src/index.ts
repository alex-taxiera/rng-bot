/* eslint-disable no-console */
import {
  Client,
  Intents,
} from 'discord.js'
import config from 'config'

import commands from './commands'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', async () => {
  console.log('Logged in as')
  console.log(client.user?.tag)
  console.log(`ID: ${client.user?.id ?? ''}`)
  console.log('------')

  // create command for each command in commands.js
  const c = await Promise.all(Object.values(commands).map((command) => {
    console.log(`Registering command: ${command.name}`)
    return client.application?.commands.create(command)
  }))
  console.log('c :', c)
})

client.on('interactionCreate', (interaction) => {
  console.log(`${interaction.user.tag} ${interaction.type}`)
  if (!interaction.isCommand()) {
    return
  }
  commands[interaction.commandName]?.runner(interaction)
})

client.login(config.get<string>('DISCORD_TOKEN')).catch(console.error)
