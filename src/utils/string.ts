/**
 * Trim the text by the given length.
 *
 * @param content - The raw text content.
 * @param length - The length to render.
 * @returns The trimed text.
 */
export function trimText(content: string, length = 100) {
  const trimmedContent = content.trim();

  const contentArr = [...trimmedContent];
  if (contentArr.length <= length) {
    return trimmedContent;
  }

  // Handle sepcial characters
  return `${contentArr.slice(0, length).join('')}...`;
}

/**
 * Trim the text by the heading length and tailing length.
 *
 * @param content - The raw text content.
 * @param head - The heading length to render.
 * @param tail - The tailing length to render.
 * @returns The trimed text.
 */
export function trimTextByHeadTail(
  content: string,
  head: number,
  tail: number,
) {
  const trimmedContent = content.trim();

  // Handle special characters
  const contentArr = [...trimmedContent];
  if (contentArr.length <= head + tail) {
    return trimmedContent;
  }

  return `${contentArr.slice(0, head).join('')}...${contentArr
    .slice(-tail)
    .join('')}`;
}

/**
 * Renders the short address of a user.
 *
 * @param address - The address to render.
 * @returns The rendered short address.
 */
export function trimAddress(address: string) {
  return trimTextByHeadTail(address, 7, 5);
}
