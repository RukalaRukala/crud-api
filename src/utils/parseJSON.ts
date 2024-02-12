export function parseJSON(body: string) {
  try {
    return JSON.parse(body);
  } catch (error) {
    throw error;
  }
}
