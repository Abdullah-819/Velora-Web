/**
 * Copy to Clipboard utility
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} - Success status.
 */
export const copyToClipboard = async (text) => {
  if (!navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
