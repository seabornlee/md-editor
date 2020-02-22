describe('App', () => {
  it('Can edit text', () => {
    cy.visit('/')
    cy.get('#content')
      .type('Hello world!')
      .should('have.text', 'Hello world!')
  })
})
