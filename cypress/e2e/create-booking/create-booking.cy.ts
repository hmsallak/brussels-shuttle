describe('Create Booking', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/booking/request');
  });

  it ('complete all the steps', () => {
    fillBookingForm();
    cy.get('#nextStepButton').click();
    cy.get('#vehicleModelPrice.1').click();
    cy.get('#nextStepButton').click();
  });

  const fillBookingForm = () => {
    // Sélectionne la date de départ
    cy.get('#departureDate').click();
    cy.get('#departureDate').type('29122024')

    // Sélectionne l'heure de départ
    cy.get('#departureTime').click();
    cy.get('#departureTime').type('1200')

    // Remplit les champs de localisation de départ et de destination
    cy.get('#pickupLocation').click();
    cy.get('#pickupLocation').type('Overijse');
    cy.wait(500);
    cy.get('.pac-item').first().click();

    cy.get('#destination').click();
    cy.get('#destination').type('Anvers');
    cy.wait(500);
    cy.get('.pac-item').first().click();
  }
})
