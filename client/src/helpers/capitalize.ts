export function capitalize(text: string): string {
    return text.split('')[0].toUpperCase() + text.slice(1, text.length);
}
