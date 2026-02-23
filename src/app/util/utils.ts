export default function generateRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function transformEvaluate(value: string) {
  let valueFormat: string = ''
  if (!value) {
    return valueFormat;
  }
  if (value.trim() === 'N') {
    valueFormat = 'Não Analisado'
  } else if (value.trim() === 'Y') {
    valueFormat = 'A analisar...'
  } else if (value.trim() === 'D') {
    valueFormat = 'Analisado'
  }
  return valueFormat;
}
