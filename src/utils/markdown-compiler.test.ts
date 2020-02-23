import compile from './markdown-compiler'

describe.each([
  ['**', '**hello** **world**', '<b>hello</b> <b>world</b>'],
  ['#', '#hello\r\n#world', '<h1>hello</h1>\r\n<h1>world</h1>'],
  ['##', '##hello\r\n##world', '<h2>hello</h2>\r\n<h2>world</h2>'],
  ['###', '###hello\r\n###world', '<h3>hello</h3>\r\n<h3>world</h3>'],
  ['####', '####hello\r\n####world', '<h4>hello</h4>\r\n<h4>world</h4>'],
  ['#####', '#####hello\r\n#####world', '<h5>hello</h5>\r\n<h5>world</h5>'],
  ['######', '######hello\r\n######world', '<h6>hello</h6>\r\n<h6>world</h6>']
])('', (tag, markdownText, html) => {
  test(`should compile ${tag}`, () => {
    expect(compile(markdownText)).toEqual(html)
  })
})
