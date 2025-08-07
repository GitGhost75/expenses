export function formatGroupCode(code: string): string {
  // Entfernt bestehende Leerzeichen
  const cleanInput = code.replace(/\s+/g, '');

  // Teilt in 3er-Blöcke und verbindet mit Leerzeichen
  return cleanInput.match(/.{1,3}/g)?.join(' ') ?? '';
}