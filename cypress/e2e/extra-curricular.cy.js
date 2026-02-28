import { extraCurricular } from '../../src/constants';

describe('Extra Curricular section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#extraCurricular', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#extraCurricular').contains('h1', 'Extra Curricular').should('be.visible');
  });

  it('renders cards with organisation, title, duration from constants', () => {
    extraCurricular.forEach((card) => {
      cy.get('#extraCurricular').contains(card.organisation).should('exist');
      cy.get('#extraCurricular').contains(card.title).should('exist');
      cy.get('#extraCurricular').contains(card.duration).should('exist');
    });
  });

  it('at least one card has content bullets visible', () => {
    const firstContent = extraCurricular[0].content[0].text;
    cy.get('#extraCurricular').contains(firstContent).should('be.visible');
  });

  describe('Responsiveness', () => {
    it('mobile: section visible and grid present', () => {
      cy.viewport(375, 667);
      cy.get('#extraCurricular').scrollIntoView();
      cy.get('#extraCurricular').should('be.visible');
      cy.get('#extraCurricular').find('.grid').should('exist');
    });

    it('desktop: multi-column grid', () => {
      cy.viewportPreset('desktop');
      cy.get('#extraCurricular').scrollIntoView();
      cy.get('#extraCurricular').find('.grid').should('exist');
    });
  });
});
