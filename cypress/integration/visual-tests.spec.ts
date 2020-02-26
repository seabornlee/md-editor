const sizes = [
  ['iphone-6', 'landscape'],
  'iphone-6',
  'ipad-2',
  ['ipad-2', 'landscape'],
  [1920, 1080],
]

const pages = ['/']

describe('Visual regression tests', () => {
  sizes.forEach(size => {
    pages.forEach(page => {
      it(`Should match previous screenshot '${page} Page' When '${size}' resolution`, () => {
        cy.setResolution(size)
        cy.visit(page)
        cy.matchImageSnapshot()
      })
    })
  })
})
