import compile from './markdown-compiler'

test('should compile bold text', () => {
  const md = '**hello** **world**'
  const html = compile(md)
  expect(html).toEqual('<b>hello</b> <b>world</b>')
})

test('should compile H1', () => {
  const md = '#hello\r\n#world'
  const html = compile(md)
  expect(html).toEqual('<h1>hello</h1>\r\n<h1>world</h1>')
})