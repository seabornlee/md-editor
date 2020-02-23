describe('App', () => {
  it('Can edit text', () => {
    cy.visit('/')
    cy.get('#content')
      .type('Hello world!')
      .should('have.text', 'Hello world!')
  })

  describe('Preview mode', () => {
    it('Should be invisible by default', () => {
      cy.visit('/')
      cy.get('#preview').should('not.exist')
    })

    it('Can preview text', () => {
      cy.visit('/')
      cy.get('#content').type('Hello world!')
      cy.get('.previewMode').click()
      cy.get('#preview').should('have.text', 'Hello world!')
    })
  })
})
