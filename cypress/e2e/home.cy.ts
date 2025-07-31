describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main heading and navigation links', () => {
    cy.get('h1').should('contain', 'Habit Tracker');
    cy.contains(
      'Build consistency, track progress, and transform your daily routines into lasting habits.'
    ).should('be.visible');
    cy.contains('Get Started')
      .should('be.visible')
      .should('have.attr', 'href', '/habits');

    cy.contains('Learn More')
      .should('be.visible')
      .should('have.attr', 'href', '/about');

    cy.get('nav, header')
      .should('be.visible')
      .within(() => {
        cy.get('a[href="/"]').should('be.visible');
        cy.get('a[href="/about"]').should('be.visible');
        cy.get('a[href="/sign-in"]').should('be.visible');
      });
  });

  it('has responsive design elements', () => {
    // Test on mobile viewport
    cy.viewport('iphone-x');
    cy.get('nav, header').should('be.visible');
    cy.get('h1').should('be.visible');

    // Test on tablet viewport
    cy.viewport('ipad-2');
    cy.get('nav, header').should('be.visible');
    cy.get('h1').should('be.visible');

    // Back to desktop
    cy.viewport(1280, 720);
    cy.get('nav, header').should('be.visible');
  });
});
