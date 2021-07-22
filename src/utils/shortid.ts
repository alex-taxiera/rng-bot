// generate alphanumeric id based on integer id
export function shortid (id: number): string {
  return id.toString().replace(/[0-9]/g, '') +
        (id * 0x1000000000000).toString(36).substring(1).toUpperCase()
}
