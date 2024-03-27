/**
 * Decode a string from base64 to utf-8.
 *
 * @param stringToDecode - String to decode
 */
const decode = (stringToDecode: string): string => {
  return Buffer.from(stringToDecode, 'base64').toString('utf-8');
};

/**
 * Encode a string from utf-8 to base64.
 *
 * @param stringToEncode - String to encode
 */
const encode = (stringToEncode: string): string => {
  return Buffer.from(stringToEncode, 'utf-8').toString('base64');
};

/**
 * Coder utility.
 * This variable is used to have:
 *
 * coder.decode(...)
 * coder.encode(...)
 *
 * This is because we can have more than one encode/decode functions in the future.
 *
 * @note: Now we use base64 and utf-8 to encode and decode files urls
 */
const coder = { encode, decode };

export { coder };
