const BASE_URL = '/latest';

describe('Currency converter app', () => {

  beforeEach(() => {
    cy.server();
    cy.route('GET', BASE_URL, 'fx:latest');
    cy.route('GET', '?base=USD&symbols=CAD', 'fx:usdcad');
    cy.route('GET', '?base=USD&symbols=INR', 'fx:usdinr');
    cy.visit('/');
  });

  it('Renders app page', () => {
    cy.contains('h1', 'Currency Converter');

    cy.get('.input').should('have.length', 2);
    cy.get('.input').eq(0).should('have.value', '1')
    cy.get('.input').eq(1).should('have.value', '1.5365');


    cy.get('select').should('have.length', 2);
    cy.get('select').eq(0).should('have.value', 'EUR')
    cy.get('select').eq(1).should('have.value', 'CAD');

    cy.get('.hint').should('have.length', 2);
    cy.get('.hint > span').should('have.length', 2);
  });

  it('Calculates quote currency value from base currency value.', () => {
    cy.get('.input').eq(0).should('have.value', '1')
    cy.get('.input').eq(1).should('have.value', '1.5365');

    cy.get('.input').eq(0).type('4').should('have.value', '14');
    cy.get('.input').eq(1).should('have.value', '21.511');

    cy.get('.input').eq(0).clear().should('have.value', '0');
    cy.get('.input').eq(1).should('have.value', '0');

    cy.get('.input').eq(0).type('abc78').should('have.value', '780');
    cy.get('.input').eq(1).should('have.value', '1198.47');
  })

  it('Calculates base currency value from quote currency value.', () => {
    cy.get('.input').eq(1).clear().type('1').should('have.value', '10')
    cy.get('.input').eq(0).should('have.value', '6.5082');

    cy.get('.input').eq(1).clear().type('abc0.5').should('have.value', '0.5');
    cy.get('.input').eq(0).should('have.value', '0.3254');

    cy.get('.input').eq(1).clear().type('$%^&*0').should('have.value', '0');
    cy.get('.input').eq(0).should('have.value', '0');
  })

  it('Toggle currency pairs and recalculate', () => {
    cy.get('.input').eq(0).should('have.value', '1')
    cy.get('.input').eq(1).should('have.value', '1.5365');
    cy.get('select').eq(0).should('have.value', 'EUR')
    cy.get('select').eq(1).should('have.value', 'CAD');

    cy.get('select').eq(0).select('USD');
    cy.get('.input').eq(0).should('have.value', '1')
    cy.get('.input').eq(1).should('have.value', '1.2653');

    cy.get('select').eq(1).select('INR');
    cy.get('.input').eq(0).should('have.value', '1')
    cy.get('.input').eq(1).should('have.value', '72.8152');
  })
})
