const compile = (markdownText: string) => {
  let regExp = /\*\*([^\*]*)\*\*/g
  let html = markdownText.replace(regExp, '<b>$1</b>')
  return html
}

export default compile
