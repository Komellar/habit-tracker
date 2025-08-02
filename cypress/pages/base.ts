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
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    cy.contains('Incorrect email or password').should('not.exist');

    cy.url().should('include', '/habits', { timeout: 10000 });
  }

  submit(): Cypress.Chainable {
    return cy.contains('Submit').click();
  }
}
