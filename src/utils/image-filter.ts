export default (files: Array<File>) => {
  const allowedSuffixes = ['png', 'jpeg', 'jpg', 'gif']
  return files.filter(f => allowedSuffixes.includes(suffixOf(f.name)))
}

const suffixOf = (fileName: string) => {
  const array = fileName.split('.')
  return array[array.length - 1]
}
