// cypress/cypress.d.ts - Cypress custom task typings

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Seed the test user in the database
     */
    task(
      event: 'db:seedUser'
    ): Chainable<{ success: boolean; userId?: string; error?: unknown }>;

    /**
     * Cleanup all test data from the database
     */
    task(event: 'db:cleanup'): Chainable<{ success: boolean; error?: unknown }>;

    /**
     * Seed the habits fixture
     */
    task(event: 'fixture:habits'): Chainable<{ success: boolean }>;
  }
}
