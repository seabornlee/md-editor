import filterImages from './image-filter'

describe('Image filter', function() {
  it('keep images files and ignore other files', () => {
    const files = [
      { name: '1.png' },
      { name: '2.jpeg' },
      { name: '3.jpg' },
      { name: '4.gif' },
      { name: '5.txt' },
      { name: '6.exe' },
      { name: '7.sh' }
    ]

    const images = filterImages(files)

    expect(images).toHaveLength(4);
  });
});

