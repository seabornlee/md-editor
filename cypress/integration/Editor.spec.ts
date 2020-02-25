describe('Editor', () => {
  it('should have a title', () => {
    cy.visit('/')
    cy.get('#title').type('My First Document').should('have.value', 'My First Document')
  })
})
