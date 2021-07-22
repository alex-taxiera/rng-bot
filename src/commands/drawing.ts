import {
  DateTime,
} from 'luxon'
import {
  ApplicationCommandOptionData,
  CommandInteraction,
  CommandInteractionOption,
} from 'discord.js'
import { createDrawing } from '../services/drawing'
import { CommandData } from '../utils/command-data'
import { parseDurationString } from '../utils/parse-duration-string'
import { shortid } from '../utils/shortid'

const options: ApplicationCommandOptionData[] = [
  {
    name: 'description',
    type: 'STRING',
    description: 'description of the prize',
    required: true,
  },
  {
    name: 'duration',
    type: 'STRING',
    description: 'how long until the drawing ends',
    required: true,
  },
  {
    name: 'channel',
    type: 'CHANNEL',
    // eslint-disable-next-line max-len
    description: 'channel to announce the drawing in (defaults to the channel the command was used in)',
    required: false,
  },
  {
    name: 'winners',
    type: 'INTEGER',
    description: 'how many users will win (defaults to 1)',
    required: false,
  },
]

const data: CommandData = {
  name: 'drawing',
  description: 'start a random drawing!',
  options: [
    ...options,
  ],
  runner: async (interaction: CommandInteraction) => {
    const description = interaction.options.get('description')?.value as string
    const duration = interaction.options.get('duration')?.value as string
    const { id: channelId } = interaction.options.get('channel')
      ?.value as CommandInteractionOption['channel'] ??
      interaction.channel ?? {}
    const winners = interaction.options.get('winners')?.value as number ?? 1
    const guildId = interaction.guild?.id as string

    if (!guildId) {
      interaction.reply({
        content: 'This command may onlybe used in a guild!',
        ephemeral: true,
      }).catch(console.error)
    }

    if (winners < 1) {
      interaction.reply({
        content: 'You must specify a number of winners greater than zero!',
        ephemeral: true,
      }).catch(console.error)
    }

    if (!description.trim()) {
      interaction.reply({
        content: 'You must specify a description!',
        ephemeral: true,
      }).catch(console.error)
    }
    let time = 0
    try {
      time = parseDurationString(duration)
    } catch (e) {
      interaction.reply({
        content: 'You must specify a valid duration!',
        ephemeral: true,
      }).catch(console.error)
    }

    try {
      const timestamp = DateTime.fromMillis(Date.now() + time)
      const drawing = await createDrawing({
        description,
        code: shortid(10),
        endTime: timestamp.toJSDate(),
        guildId,
        amountOfWinners: winners,
      })
      const channel = interaction.guild!.channels.resolve(channelId!)
      if (channel!.isText()) {
        channel.send({
          // eslint-disable-next-line max-len
          content: `Drawing started! Use \`/drawing join ${drawing.code}\` to join!`,
          embeds: [
            {
              title: drawing.description,
              description: `Use \`/drawing join ${drawing.code}\` to join!`,
              fields: [
                {
                  name: 'Drawing Time',
                  value: timestamp.toLocaleString(DateTime.DATETIME_FULL),
                },
              ],
            },
          ],
        }).catch(console.error)
      } else {
        throw new Error('Channel is not a text channel!')
      }
    } catch (e) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      }).catch(console.error)
    }

    interaction.reply({
      content: 'Drawing created successfully!',
      ephemeral: true,
    }).catch(console.error)
  },
}

export default data
