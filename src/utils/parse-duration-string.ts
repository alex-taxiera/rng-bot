// parse a duraction string into a number of milliseconds
export function parseDurationString (durationString: string): number {
  if (typeof durationString !== 'string') {
    throw new Error('durationString must be a string')
  }

  const durationRegex = /(\d+)([ms]s|m|h|d|w)/
  const matches = durationRegex.exec(durationString)

  if (!matches) {
    throw new Error(`Invalid duration string: ${durationString}`)
  }

  const [
    val,
    unit,
  ] = matches.slice(1)

  let duration = parseInt(val!, 10)

  if (unit === 's') {
    duration *= 1_000
  } else if (unit === 'm') {
    duration *= 60_000
  } else if (unit === 'h') {
    duration *= 3600_000
  } else if (unit === 'd') {
    duration *= 86400_000
  } else if (unit === 'w') {
    duration *= 604800_000
  } else if (unit !== 'ms') {
    throw new Error(`Invalid duration string: ${durationString}`)
  }

  return duration
}
