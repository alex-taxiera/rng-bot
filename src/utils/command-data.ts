import {
  ApplicationCommandData,
  CommandInteraction,
} from 'discord.js'

export interface CommandData extends ApplicationCommandData {
  runner: (interaction: CommandInteraction) => Promise<void> | void
}
