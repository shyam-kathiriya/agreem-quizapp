function insertAtRandomIndex(array: string[], item: string): string[] {
  const randomIndex = Math.floor(Math.random() * (array.length + 1));
  const result = [...array];
  result.splice(randomIndex, 0, item);
  return result;
}

export { insertAtRandomIndex }