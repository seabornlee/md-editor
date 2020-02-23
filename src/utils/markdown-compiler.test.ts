import compile from './markdown-compiler'

test('should compile bold text', () => {
  const md = '**hello** **world**'
  const html = compile(md)
  expect(html).toEqual('<b>hello</b> <b>world</b>')
})
