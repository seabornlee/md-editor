describe('App', () => {
  describe('Mode', () => {
    describe('Edit mode', () => {
      beforeEach(() => {
        cy.visit('/')
      })

      it('should be the default mode', () => {
        cy.contains('编辑模式').find('input').should('be.checked')
        cy.get('#previewer').should('not.visible')
      })

      it('should show editor', () => {
        cy.get('#editor').should('be.visible')
      })

      it('should not show previewer', () => {
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

  describe('Syntax', () => {
    it('should bold text surrounded by **', () => {
      cy.visit('/')
      cy.contains('预览模式').click()
      cy.get('#editor').type('**Hello world!**')
      cy.get('#previewer').should('contains.text', 'Hello world!')
      cy.get('#previewer').should('not.contains.text', '**')
    })

    it('should render h1-h6 if row start with #', () => {
      cy.visit('/')
      cy.contains('预览模式').click()
      cy.get('#editor')
        .type('# 一级标题 {enter}')
        .type('## 二级标题 {enter}')
        .type('### 三级标题 {enter}')
        .type('#### 四级标题 {enter}')
        .type('##### 五级标题 {enter}')
        .type('###### 六级标题 {enter}')

      cy.get('#previewer').should('contains.text', '一级标题')
      cy.get('#previewer').should('contains.text', '二级标题')
      cy.get('#previewer').should('contains.text', '三级标题')
      cy.get('#previewer').should('contains.text', '四级标题')
      cy.get('#previewer').should('contains.text', '五级标题')
      cy.get('#previewer').should('contains.text', '六级标题')
      cy.get('#previewer').should('not.contains.text', '#')
    })
  })
})
