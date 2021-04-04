describe('The home page', () => {
    describe('when visited', () => {
      it('it should open', () => {
        cy.visit('http://localhost:3000/');
        cy.get('button').contains('en').click();
        cy.get('input').should('have.value', '');
        cy.get('button').contains('Submit').click();
        cy.get('p').should('have.text', 'This field is required');
        cy.get('button').contains('Reset').click();
        cy.get('input').should('have.value', '');
        cy.get('input').type('Hello, today I want to do something');
        cy.get('button').contains('Reset').click();
        cy.get('input').should('have.value', '');
        cy.get('button').contains('ру').click();
        cy.get('input').should('have.value', '');
        cy.get('button').contains('Отправить').click();
        cy.get('p').should('have.text', 'Это поле обязательное');
        cy.get('button').contains('Скинуть').click();
        cy.get('input').should('have.value', '');
        cy.get('input').type('Hello, today I want to do something');
        cy.get('button').contains('Скинуть').click();
        cy.get('input').should('have.value', '');
      })
    })
  })