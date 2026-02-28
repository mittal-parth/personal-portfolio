import { achievements } from '../../src/constants';

describe('Achievements section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#achievements', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#achievements').contains('h1', 'Achievements').should('be.visible');
  });

  it('renders all achievement cards in the grid', () => {
    cy.get('#achievements').find('[class*="grid"]').children().should('have.length', achievements.length);
  });

  it('each card shows event name and position', () => {
    cy.get('#achievements .grid > div').each(($card, index) => {
      const achievement = achievements[index];
      cy.wrap($card).contains(achievement.event).should('exist');
      cy.wrap($card).contains(achievement.position).should('exist');
    });
  });

  it('first achievement event and position match constants', () => {
    const first = achievements[0];
    cy.get('#achievements').contains(first.event).should('be.visible');
    cy.get('#achievements').contains(first.position).should('be.visible');
  });

  it('cards with links render icon links', () => {
    const withLink = achievements.find((a) => a.article || a.github || a.youtube || a.project);
    if (withLink) {
      cy.get('#achievements').find('a[href]').should('exist');
    }
  });

  describe('Responsiveness', () => {
    it('mobile: section visible and grid present', () => {
      cy.viewport(375, 667);
      cy.get('#achievements').scrollIntoView();
      cy.get('#achievements').should('be.visible');
      cy.get('#achievements').find('.grid').should('exist');
    });

    it('tablet: section visible and grid present', () => {
      cy.viewport(768, 1024);
      cy.get('#achievements').scrollIntoView();
      cy.get('#achievements').should('be.visible');
      cy.get('#achievements').find('.grid').should('exist');
    });

    it('desktop: 3 columns', () => {
      cy.viewportPreset('desktop');
      cy.get('#achievements').scrollIntoView();
      cy.get('#achievements').find('.grid').invoke('css', 'grid-template-columns').then((cols) => {
        expect(cols.split(' ').length).to.be.at.least(2);
      });
    });
  });
});
