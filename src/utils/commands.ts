import * as fromConstants from '../constants'
import type * as fromTypes from '../types'

type CommandKeys = keyof typeof fromConstants.COMMAND_MAP

/**
 * @summary Checks if command is present in string.
 * @param content
 */
const containsCommand = (content: string): boolean =>
  content.startsWith('!') &&
  fromConstants.COMMANDS.some((cmd) => content.startsWith(cmd))

/**
 * @summary Splits explicit command from message.content string.
 * @param content
 */
export const getCommand = (content: string): fromTypes.Commands | undefined => {
  if (containsCommand(content)) {
    const [command, ...subcommands] = content.split(' ')
    return {
      command: command,
      subcommands: subcommands ?? []
    }
  }
  return
}

/**
 * @summary Typeguard to ensure command exists in map and
 * to guide control flow.
 * @param command
 */
export const isValidCommand = (
  command: string | undefined | CommandKeys
): command is CommandKeys =>
  !!command && !!fromConstants.COMMAND_MAP[command as CommandKeys]
