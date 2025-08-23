import { HabitsPage } from '../pages/habits';

let page: HabitsPage;

describe('Habits Page', () => {
  before(() => {
    page = new HabitsPage();
  });

  beforeEach(() => {
    cy.task('db:cleanup');
    cy.task('db:seedUser');
    cy.task('fixture:habits');
    page.navigate();
  });

  it('displays correctly', () => {
    page
      .getBanner(false)
      .should('be.visible')
      .within(() => {
        cy.contains('Keep it up!').should('be.visible');
        cy.contains(
          "You've completed 0 out of 3 habits today. Every step counts! 🌱"
        ).should('be.visible');
      });

    page.getStatistic('doneToday').should('be.visible').should('contain', '0');

    page
      .getStatistic('successRate')
      .should('be.visible')
      .should('contain', '47%');

    page
      .getStatistic('totalHabits')
      .should('be.visible')
      .should('contain', '3');

    page
      .getStatistic('totalStreaks')
      .should('be.visible')
      .should('contain', '5');

    page.getAddHabitBtn().should('have.length', 2).should('be.visible');

    page
      .getSearchInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Search habits');

    page.getHabits().should('have.length', 3).should('be.visible');
    page
      .getHabits()
      .first()
      .should('contain', 'Exercise')
      .should('contain', '30 minutes of exercise every day')
      .within(() => {
        cy.get('button')
          .contains('✓ Mark Done')
          .should('be.visible')
          .and('not.be.disabled');
        cy.get('button[title="Delete habit"]').should('be.visible');
      });

    page
      .getCalendar()
      .first()
      .should('be.visible')
      .within(() => {
        cy.get('div').should('have.length', 7);
        cy.get('div[aria-selected="true"]').should('have.length', 2);
        cy.get('div')
          .eq(4)
          .should('be.visible')
          .and('have.attr', 'aria-selected', 'true');
        cy.get('div')
          .eq(5)
          .should('be.visible')
          .and('have.attr', 'aria-selected', 'true');
        cy.get('div')
          .eq(6)
          .should('be.visible')
          .and('have.attr', 'aria-selected', 'false');
      });
  });

  it('marks habit as done', () => {
    page.getStatistic('doneToday').should('contain', '0');

    page
      .getHabits()
      .first()
      .within(() => {
        cy.get('button').contains('✓ Mark Done').click();
      });

    page.getStatistic('doneToday').should('contain', '1');

    page
      .getCalendar()
      .first()
      .within(() => {
        cy.get('div')
          .eq(6)
          .should('be.visible')
          .and('have.attr', 'aria-selected', 'true');

        cy.get('div[aria-selected="true"]').should('have.length', 3);
      });
  });

  it('deletes a habit', () => {
    page.getHabits().should('have.length', 3);

    page
      .getHabits()
      .first()
      .within(() => {
        cy.get('button[title="Delete habit"]').click();
      });

    page.getHabits().should('have.length', 2);
  });
});
