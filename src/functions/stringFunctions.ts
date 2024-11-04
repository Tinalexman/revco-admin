export function capitalize(value: string) {
  return `${value.substring(0, 1).toUpperCase()}${value
    .substring(1)
    .toLowerCase()}`;
}

export function toLeadingCase(value: string) {
  const words: string[] = value.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = capitalize(words[i]);
  }
  return words.join(" ");
}
