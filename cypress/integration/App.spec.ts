describe('App', () => {
  describe('Mode', () => {
    describe('Edit mode', () => {
      it('should be the default mode', () => {
        cy.visit('/')
        cy.contains('编辑模式').find('input').should('be.checked')
        cy.get('#previewer').should('not.visible')
      })

      it('should show editor', () => {
        cy.visit('/')
        cy.get('#editor').should('be.visible')
      })

      it('should not show previewer', () => {
        cy.visit('/')
        cy.get('#previewer').should('not.visible')
      })
    })

    describe('Preview mode', () => {
      it('should show previewer besides editor', () => {
        cy.visit('/')
        cy.contains('预览模式').click()
        cy.get('#editor').type('Hello world!')
        cy.get('#previewer').should('have.text', 'Hello world!')
      })
    })

    describe('Read mode', () => {
      it('should show previewer only', () => {
        cy.visit('/')
        cy.get('#editor').type('Hello world!')
        cy.contains('阅读模式').click()
        cy.get('#editor').should('not.visible')
        cy.get('#previewer').should('have.text', 'Hello world!')
      })
    })
  })
})
