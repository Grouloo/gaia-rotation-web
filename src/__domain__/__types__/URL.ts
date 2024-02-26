export type URL = `https://${string}.${string}`

export type t_URL = URL

export function isURL(val: unknown): val is URL {
  if (typeof val !== 'string') {
    return false
  } else {
    return !!val.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    )
  }
}
