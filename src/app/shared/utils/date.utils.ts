/**
 * Convertit une instance de Date en une chaîne de caractères au format 'yyyy-MM-dd\'T\'HH:mm:ss'
 * @param date - L'objet Date à convertir
 * @returns La date formatée en chaîne de caractères
 */
export function formatLocalDate(date: Date): string {
  if (!date) {
    throw new Error('Date must not be null or undefined');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
