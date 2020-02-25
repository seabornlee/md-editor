const compile = (markdownText: string) => {
  let html = markdownText.replace(/\*\*([^*]*)\*\*/g, '<b>$1</b>')
  html = html.replace(/######(.*)/g, '<h6>$1</h6>')
  html = html.replace(/#####(.*)/g, '<h5>$1</h5>')
  html = html.replace(/####(.*)/g, '<h4>$1</h4>')
  html = html.replace(/###(.*)/g, '<h3>$1</h3>')
  html = html.replace(/##(.*)/g, '<h2>$1</h2>')
  html = html.replace(/#(.*)/g, '<h1>$1</h1>')
  html = html.replace(/!\[(.*)\]\((.*)\)/g, '<img title="$1" src="$2" />')
  return html
}

export default compile
