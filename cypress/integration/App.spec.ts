const editor = () => {
  return cy.get('[data-testid=editor]')
}

const previewer = () => {
  return cy.get('#previewer')
}

describe('App', () => {
  describe('Mode', () => {
    describe('Edit mode', () => {
      beforeEach(() => {
        cy.visit('/')
      })

      it('should be the default mode', () => {
        cy.contains('编辑模式').find('input').should('be.checked')
        previewer().should('not.visible')
      })

      it('should show editor', () => {
        editor().should('be.visible')
      })

      it('should not show previewer', () => {
        previewer().should('not.visible')
      })
    })

    describe('Preview mode', () => {
      it('should show previewer besides editor', () => {
        cy.visit('/')
        cy.contains('预览模式').click()
        editor().type('Hello world!')
        previewer().should('have.text', 'Hello world!')
      })
    })

    describe('Read mode', () => {
      it('should show previewer only', () => {
        cy.visit('/')
        editor().type('Hello world!')
        cy.contains('阅读模式').click()
        editor().should('not.visible')
        previewer().should('have.text', 'Hello world!')
      })
    })
  })
})
