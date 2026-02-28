import { aboutMe, socialMedia } from '../../src/constants';

describe('Footer section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#contactMe', { timeout: 8000 }).scrollIntoView();
  });

  it('displays name from constants', () => {
    cy.get('#contactMe').contains('h2', aboutMe.name).should('be.visible');
  });

  it('displays tagline from constants', () => {
    cy.get('#contactMe').contains(aboutMe.tagLine).should('be.visible');
  });

  it('profile picture with name in alt is visible', () => {
    cy.get('#contactMe').find(`img[alt="${aboutMe.name}"]`).should('be.visible');
  });

  it('all social media links are rendered', () => {
    cy.get('#contactMe').find('a[href]').should('have.length.at.least', socialMedia.length);
    socialMedia.forEach((s) => {
      cy.get('#contactMe').find(`a[href="${s.link}"]`).should('exist');
    });
  });

  it('Resume and Star buttons are present', () => {
    cy.get('#contactMe').contains('Resume').should('be.visible');
    cy.get('#contactMe').contains('Star').should('be.visible');
  });

  describe('Responsiveness', () => {
    it('desktop: profile pic and info side by side', () => {
      cy.viewportPreset('desktop');
      cy.get('#contactMe').scrollIntoView();
      cy.get('#contactMe').find('[class*="flex-col-reverse"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('row');
      });
    });

    it('mobile: stacked layout', () => {
      cy.viewport(375, 667);
      cy.get('#contactMe').scrollIntoView();
      cy.get('#contactMe').find('[class*="flex-col-reverse"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('column-reverse');
      });
    });
  });
});
