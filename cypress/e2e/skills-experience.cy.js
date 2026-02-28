import { skills, experiences } from '../../src/constants';

describe('Skills & Experience section', () => {
  beforeEach(() => {
    cy.waitForApp();
    cy.get('#skills', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#skills').within(() => {
      cy.contains('h1', 'Skills & Experience').should('be.visible');
    });
  });

  it('renders all skill category titles', () => {
    skills.forEach((skill) => {
      cy.get('#skills').contains('h4', skill.title).should('exist');
    });
  });

  it('shows at least one skill name per category', () => {
    skills.forEach((skill) => {
      const firstSkillName = skill.items[0].name;
      cy.get('#skills').contains(firstSkillName).should('exist');
    });
  });

  it('shows at least one experience organisation', () => {
    cy.get('#skills').contains(experiences[0].organisation).should('be.visible');
  });

  describe('Responsiveness', () => {
    it('desktop: skills and experience side by side', () => {
      cy.viewportPreset('desktop');
      cy.get('#skills').scrollIntoView();
      cy.get('#skills').find('[class*="md:flex-row"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('row');
      });
    });

    it('mobile: stacked layout', () => {
      cy.viewport(375, 667);
      cy.get('#skills').scrollIntoView();
      cy.get('#skills').find('[class*="flex-col"]').first().invoke('css', 'flex-direction').then((dir) => {
        expect(dir).to.equal('column');
      });
    });
  });
});
