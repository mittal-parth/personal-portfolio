import { educationList } from '../../src/constants';

describe('Education section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#education', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#education').contains('h1', 'Education').should('be.visible');
  });

  it('renders all education cards with title, degree, duration', () => {
    cy.get('#education .feature-card').each(($card, index) => {
      const edu = educationList[index];
      cy.wrap($card).contains(edu.title).should('be.visible');
      if (edu.degree) {
        cy.wrap($card).contains(edu.degree).should('be.visible');
      }
      cy.wrap($card).contains(edu.duration).should('be.visible');
    });
  });

  describe('Responsiveness', () => {
    it('desktop: Lottie and cards side by side', () => {
      cy.viewportPreset('desktop');
      cy.get('#education').scrollIntoView();
      cy.get('#education').find('[class*="flex"][class*="flex-col-reverse"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('row');
      });
    });

    it('mobile: cards above animation (flex-col-reverse)', () => {
      cy.viewport(375, 667);
      cy.get('#education').scrollIntoView();
      cy.get('#education').find('[class*="flex-col-reverse"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('column-reverse');
      });
    });
  });
});
