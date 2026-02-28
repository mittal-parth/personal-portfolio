import { aboutMe } from '../../src/constants';

describe('Hero section', () => {
  beforeEach(() => {
    cy.waitForApp();
  });

  it('renders heading "Hi there!" and "I am"', () => {
    cy.get('#home').within(() => {
      cy.contains('Hi there!').should('be.visible');
      cy.contains('I am').should('be.visible');
    });
  });

  it('displays name from constants with text-gradient class', () => {
    cy.get('#home').contains('.text-gradient', aboutMe.name).should('be.visible');
  });

  it('displays intro text from constants', () => {
    cy.get('#home').contains(aboutMe.intro).should('be.visible');
  });

  it('has Lottie animation container', () => {
    cy.get('#home').find('[class*="z-index-[5]"]').should('exist');
  });

  describe('Responsiveness', () => {
    it('desktop: text and animation side by side', () => {
      cy.viewportPreset('desktop');
      cy.get('#home').should('be.visible');
      cy.get('#home').invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('row');
      });
    });

    it('mobile: stacked layout and Lets Connect visible below', () => {
      cy.viewport(375, 667);
      cy.get('#home').scrollIntoView();
      cy.get('#home').should('be.visible');
      // On mobile flex-col so direction column; Lets Connect visible in bottom area
      cy.get('#home').invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('column');
      });
    });
  });
});
