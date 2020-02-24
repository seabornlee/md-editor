const editor = () => {
  return cy.get('#editor')
}

const previewer = () => {
  return cy.get('#previewer')
}

describe('App', () => {
  describe('Editor', () => {
    it('should have a title', () => {
      cy.visit('/')
      cy.get('#title').type('My First Document').should('have.value', 'My First Document')
    })
  })

  describe('Mode', () => {
    describe('Edit mode', () => {
      it('should be the default mode', () => {
        cy.visit('/')
        cy.contains('编辑模式').find('input').should('be.checked')
        previewer().should('not.visible')
      })

      it('should show editor', () => {
        cy.visit('/')
        editor().should('be.visible')
      })

      it('should not show previewer', () => {
        cy.visit('/')
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

  describe('Syntax', () => {
    it('should bold text surrounded by **', () => {
      cy.visit('/')
      cy.contains('预览模式').click()
      editor().type('**Hello world!**')
      previewer().should('contains.text', 'Hello world!')
      previewer().should('not.contains.text', '**')
    })

    it('should render h1-h6 if row start with #', () => {
      cy.visit('/')
      cy.contains('预览模式').click()
      editor()
        .type('# 一级标题 {enter}')
        .type('## 二级标题 {enter}')
        .type('### 三级标题 {enter}')
        .type('#### 四级标题 {enter}')
        .type('##### 五级标题 {enter}')
        .type('###### 六级标题 {enter}')

      previewer().should('contains.text', '一级标题')
      previewer().should('contains.text', '二级标题')
      previewer().should('contains.text', '三级标题')
      previewer().should('contains.text', '四级标题')
      previewer().should('contains.text', '五级标题')
      previewer().should('contains.text', '六级标题')
      previewer().should('not.contains.text', '#')
    })
  })
})
