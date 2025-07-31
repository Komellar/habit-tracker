import { BasePage } from './base';

export class HabitsPage extends BasePage {
  protected url = () => '/habits';
  protected autoSignIn = true;

  private selectors = {
    stats: {
      totalHabits: 'div[data-testid="stats-total"]',
      doneToday: 'div[data-testid="stats-today"]',
      successRate: 'div[data-testid="stats-rate"]',
      totalStreaks: 'div[data-testid="stats-streaks"]',
    },
    bannerNotCompleted: '[data-testid="banner-not-completed"]',
    bannerCompleted: '[data-testid="banner-completed"]',
    searchInput: 'input[name="search"]',
    addHabitBtn: 'a[href="/habits/create"]',
    habits: '[data-testid="habit-item"]',
    calendar: 'div[data-testid="calendar"]',
  };

  getStatistic(
    statsName: keyof typeof this.selectors.stats
  ): Cypress.Chainable {
    return cy.get(this.selectors.stats[statsName]);
  }

  getBanner(completed: boolean): Cypress.Chainable {
    return cy.get(
      this.selectors[completed ? 'bannerCompleted' : 'bannerNotCompleted']
    );
  }

  getSearchInput(): Cypress.Chainable {
    return cy.get(this.selectors.searchInput);
  }

  getAddHabitBtn(): Cypress.Chainable {
    return cy.get(this.selectors.addHabitBtn);
  }

  getHabits(): Cypress.Chainable {
    return cy.get(this.selectors.habits);
  }

  getCalendar(): Cypress.Chainable {
    return cy.get(this.selectors.calendar);
  }
}
