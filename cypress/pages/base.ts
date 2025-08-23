import { Credentials, user as fixtureUser } from '../fixtures/login';

type UrlProvider = (...args: string[]) => string;

export abstract class BasePage {
  protected url: UrlProvider | undefined;
  protected autoSignIn = true;

  baseSelectors = {
    button: 'button span',
  };

  navigate(user: Credentials = fixtureUser, ...args: string[]) {
    if (this.autoSignIn && user) {
      cy.session(
        user.email,
        () => {
          this.signIn(user);
        },
        { cacheAcrossSpecs: true }
      );
    }

    if (this.url) {
      cy.visit(this.url(...args));
    }
  }

  signIn(user: Credentials) {
    cy.visit('/sign-in');

    cy.get('h1')
      .contains(/sign in/i)
      .should('be.visible');

    cy.get('form').should('be.visible');

    cy.get('input[type="email"]').should('be.visible').type(user.email);
    cy.get('input[type="password"]').should('be.visible').type(user.password);

    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.url().should('include', '/habits', { timeout: 15000 });

    cy.get('body').should('contain', 'habit', { timeout: 5000 });
  }

  submit(): Cypress.Chainable {
    return cy.contains('Submit').click();
  }
}
