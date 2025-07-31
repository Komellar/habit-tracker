import { user } from '../../fixtures/login';
import { SignIpPage } from '../../pages/sign-in';

let page: SignIpPage;

describe('Sign In Page', () => {
  before(() => {
    page = new SignIpPage();
  });

  beforeEach(() => {
    cy.task('db:cleanup');
    cy.task('db:seedUser');
    page.navigate();
  });

  it('displays the sign-in form with all required elements', () => {
    cy.get('h1')
      .contains(/sign in/i)
      .should('be.visible');

    cy.contains('Welcome back! Please sign in to continue.').should(
      'be.visible'
    );

    page.getEmailInput().should('be.visible');
    page.getPasswordInput().should('be.visible');

    page
      .getSubmitButton()
      .contains(/sign in/i)
      .should('be.visible');

    cy.contains(/sign up/i)
      .should('be.visible')
      .should('have.attr', 'href', '/sign-up');
  });

  it('shows validation errors for empty form submission', () => {
    page.getSubmitButton().click();

    cy.get('input:invalid').should('have.length', 2);
    page
      .getEmailInput()
      .invoke('prop', 'validationMessage')
      .should('have.text', 'Please fill out this field.');

    page.getEmailInput().type('test@test.com');
    page.getSubmitButton().click();

    page
      .getPasswordInput()
      .invoke('prop', 'validationMessage')
      .should('have.text', 'Please fill out this field.');
  });

  it('shows validation error for invalid email format', () => {
    page.getEmailInput().type('invalid-email');

    page.getSubmitButton().click();

    page
      .getEmailInput()
      .invoke('prop', 'validationMessage')
      .should(
        'have.text',
        "Please include an '@' in the email address. 'invalid-email' is missing an '@'."
      );
  });

  it('shows error message for incorrect credentials', () => {
    page.getEmailInput().type('nonexistent@example.com');
    page.getPasswordInput().type('wrong-password');

    page.getSubmitButton().click();

    cy.contains(/incorrect email or password/i, { timeout: 5000 }).should(
      'be.visible'
    );
  });

  it('successfully logs in with valid credentials', () => {
    page.getEmailInput().type(user.email);
    page.getPasswordInput().type(user.password);

    page.getSubmitButton().click();

    cy.contains('Incorrect email or password').should('not.exist');

    cy.url().should('include', '/habits', { timeout: 10000 });

    cy.get('nav a[href="/habits"], header a[href="/habits"]').should('exist');
    cy.get(
      'nav a[href="/habits/create"], header a[href="/habits/create"]'
    ).should('exist');
    cy.get('nav, header')
      .contains(/sign out/i)
      .should('be.visible');
  });

  it('maintains accessibility standards', () => {
    // Check form labels are properly associated with inputs
    cy.get('label[for]').each((label) => {
      const forAttribute = label.attr('for');
      cy.get(`#${forAttribute}`).should('exist');
    });

    // Check focus states
    page.getEmailInput().focus();
    cy.focused().should('have.attr', 'type', 'email');

    page.getPasswordInput().focus();
    cy.focused().should('have.attr', 'type', 'password');
  });
});
