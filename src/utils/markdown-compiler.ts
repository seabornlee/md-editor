const compile = (markdownText: string) => {
  let html = markdownText.replace(/\*\*([^\*]*)\*\*/g, '<b>$1</b>')
  html = html.replace(/###(.*)/g, '<h3>$1</h3>')
  html = html.replace(/##(.*)/g, '<h2>$1</h2>')
  html = html.replace(/#(.*)/g, '<h1>$1</h1>')
  return html
}

export default compile
