import { BasePage } from './base';

export class SignIpPage extends BasePage {
  protected url = () => '/sign-ip';
  protected autoSignIn = false;

  private selectors = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
  };

  getEmailInput(): Cypress.Chainable {
    return cy.get(this.selectors.emailInput);
  }

  getPasswordInput(): Cypress.Chainable {
    return cy.get(this.selectors.passwordInput);
  }

  getSubmitButton(): Cypress.Chainable {
    return cy.get(this.selectors.submitButton);
  }
}
