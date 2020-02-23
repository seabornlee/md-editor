import compile from './markdown-compiler'

describe.each([
  ['**', '**hello** **world**', '<b>hello</b> <b>world</b>'],
  ['#', '#hello\r\n#world', '<h1>hello</h1>\r\n<h1>world</h1>'],
  ['##', '##hello\r\n##world', '<h2>hello</h2>\r\n<h2>world</h2>']
])('', (tag, markdownText, html) => {
  test(`should compile ${tag}`, () => {
    expect(compile(markdownText)).toEqual(html)
  })
})
