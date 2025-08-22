import { user } from '../../fixtures/login';
import { SignInPage } from '../../pages/sign-in';

let page: SignInPage;

describe('Sign In Page', () => {
  before(() => {
    page = new SignInPage();
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

    cy.contains('Email is required').should('be.visible');

    page.getEmailInput().type('test@test.com');
    page.getSubmitButton().click();

    cy.contains('Password is required').should('be.visible');
  });

  it('shows validation error for invalid email format', () => {
    page.getEmailInput().type('invalid@email');
    page.getPasswordInput().type('password123');
    page.getSubmitButton().click();

    cy.contains('Invalid email format').should('be.visible');
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
});
