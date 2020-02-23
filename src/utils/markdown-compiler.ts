const compile = (markdownText: string) => {
  let html = markdownText.replace(/\*\*([^\*]*)\*\*/g, '<b>$1</b>')
  html = html.replace(/#(.*)/g, '<h1>$1</h1>')
  return html
}

export default compile
