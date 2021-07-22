import {
  CommandInteraction,
} from 'discord.js'
import { CommandData } from '../utils/command-data'

const options = [
  {
    name: 'low',
    type: 'INTEGER',
    description: 'minimum value to generate',
    required: false,
  },
  {
    name: 'high',
    type: 'INTEGER',
    description: 'maximum value to generate',
    required: false,
  },
] as const

const data: CommandData = {
  name: 'random-number',
  description: 'generate a random number!',
  options: [
    ...options,
  ],
  runner: (interaction: CommandInteraction) => {
    const low = interaction.options.get('low')?.value as number ?? 1
    const high = interaction.options.get('high')?.value as number ?? 100
    interaction
      .reply(`${Math.floor(Math.random() * (high - low) + low)}`)
      .catch(console.error)
  },
}

export default data
