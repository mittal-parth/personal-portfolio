describe('Open Source section', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/.netlify/functions/fetchContributions', { fixture: 'contributions.json' }).as('fetchContributions');
    cy.waitForApp();
    cy.get('#openSource', { timeout: 8000 }).scrollIntoView();
  });

  it('shows section heading', () => {
    cy.get('#openSource').contains('h1', 'Open Source Contributions').should('be.visible');
  });

  it('renders contribution cards from stubbed API', () => {
    cy.wait('@fetchContributions', { timeout: 15000 });
    cy.get('#openSource').contains('Add dark mode support', { timeout: 5000 }).should('be.visible');
    cy.get('#openSource').contains('publiclab/plots2').should('be.visible');
  });

  it('filter buttons include All and each repo', () => {
    cy.wait('@fetchContributions', { timeout: 15000 });
    cy.get('#openSource').contains('button', 'All').should('be.visible');
    cy.get('#openSource').contains('button', 'plots2').should('be.visible');
    cy.get('#openSource').contains('button', 'zulip').should('be.visible');
    cy.get('#openSource').contains('button', 'polkadot-sdk').should('be.visible');
  });

  it('clicking repo filter shows only that repo contributions', () => {
    cy.wait('@fetchContributions', { timeout: 15000 });
    cy.get('#openSource').contains('button', 'zulip').click();
    cy.get('#openSource').contains('Fix notification badge').should('be.visible');
    cy.get('#openSource').contains('zulip/zulip').should('be.visible');
  });

  it('error state shows error message when API fails', () => {
    cy.intercept('POST', '**/.netlify/functions/fetchContributions', { statusCode: 500, body: { error: 'Failed' } }).as('fetchFail');
    cy.intercept('POST', '**/api/contributions', { statusCode: 500, body: { error: 'Failed' } }).as('fetchFailApi');
    cy.visit('/');
    cy.get('nav', { timeout: 15000 }).should('be.visible');
    cy.get('#openSource', { timeout: 8000 }).scrollIntoView();
    cy.get('#openSource').contains('Something went wrong', { timeout: 8000 }).should('be.visible');
  });

  describe('Responsiveness', () => {
    it('section and grid visible on mobile', () => {
      cy.viewport(375, 667);
      cy.wait('@fetchContributions', { timeout: 15000 });
      cy.get('#openSource').scrollIntoView();
      cy.get('#openSource').should('be.visible');
      cy.get('#openSource').find('.grid').should('exist');
    });

    it('grid has multiple columns on desktop', () => {
      cy.viewportPreset('desktop');
      cy.wait('@fetchContributions', { timeout: 15000 });
      cy.get('#openSource').scrollIntoView();
      cy.get('#openSource').find('.grid').should('exist');
    });
  });
});
