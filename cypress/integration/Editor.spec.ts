const editor = () => {
  return cy.get('[data-testid=editor]')
}

const previewer = () => {
  return cy.get('#previewer')
}

describe('Editor', () => {
  it('should have a title', () => {
    cy.visit('/')
    cy.get('#title').type('My First Document').should('have.value', 'My First Document')
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

    it('should render image', () => {
      cy.visit('/')
      cy.contains('预览模式').click()
      editor().type('![Image](https://www.baidu.com/img/bd_logo1.png?where=super)')
      previewer().find('img').should('be.visible')
      previewer().should('not.contains.text', '![')
    })
  })
})
