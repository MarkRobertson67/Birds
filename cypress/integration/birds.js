import birdData from "../../src/data/birds";

const { PORT = 3000 } = process.env;

describe("Birds cards", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
  });

  it("Displays the name, photo, and amount", () => {
    birdData.forEach((bird) => {
      const { name, amount, img } = bird;

      cy.get(".card")
        .should("contain.text", name)
        .should("contain.text", amount);
      cy.get(`.card img[src="${img}"]`).should("exist");
    });
  });
});

const addShoeBillToCart = () => {
  cy.get(".birds button").first().click();
};

const addFlycatcherToCart = () => {
  cy.get(".birds button").eq(2).click();
};

const addBoatBilledHeronToCart = () => {
  cy.get(".birds button").eq(3).click();
};

const addManyBirdsToCart = () => {
  const selectors = ".birds button";
  cy.get(selectors).each((button, i) => {
    if (i % 2 === 0) {
      button.click();
    }
  });
};

describe("Add to cart", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
  });
  it("Can add Shoebill to cart", () => {
    addShoeBillToCart();
    cy.get(".Cart").within((element) => {
      cy.get("li").contains("Shoebill");
      cy.get("li").contains("Stickers");
      cy.get("h4").contains("$100");
      cy.contains("Discount: 0%");
    });
  });
  it("Can add multiple birds to cart", () => {
    addManyBirdsToCart();
    cy.get(".Cart").within((element) => {
      cy.get("li").contains("Shoebill");
      cy.get("li").contains("$100");
      cy.get("li").contains("Frilled Coquette Hummingbird");
      cy.get("li").contains("$600");
      cy.get("li").contains("Ex Parrot");
      cy.get("li").contains("$700");
      cy.get("li").contains("Turaco");
      cy.get("li").contains("$400");
      cy.get("li").contains("Royal Flycatcher");
      cy.get("li").contains("$300");
    });
  });
});

describe("It can total the birds in the cart", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
  });
  it("Can get the total for one bird in the cart", () => {
    addShoeBillToCart();
    cy.get(".Cart").within(() => {
      cy.get("h4").contains("$100");
    });
  });
  it("Can get the total for multiple birds in the cart", () => {
    addManyBirdsToCart();
    // need to wait because not all birds added to cart otherwise
    cy.wait(1000);
    cy.get(".Cart").within(() => {
      cy.get("h4")
        .invoke("text")
        .then((text) => {
          text = Number(text.match(/[0-9]+/g));
          console.log(text);
          return text;
        })
        .should("be.gte", 1980);
    });
  });
});

describe("Applies 10% discount when 3 or more birds are added", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
  });
  it("Does not add a discount if total is less than 100", () => {
    addShoeBillToCart();
    cy.contains("Discount: 0%");
  });

  it("Applies 0% discount when 2 or less birds are added", () => {
    addManyBirdsToCart();
    cy.contains("Discount: 10%");
  });
});

describe("It adds bonus items as the total increases", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
    addFlycatcherToCart();
  });
  it("Can add Flycatcher to cart, with correct bonus items", () => {
    cy.get(".Cart").within(() => {
      cy.get("li").contains("Flycatcher");
      cy.get("li").contains("Stickers");
      cy.get("li").contains("Background for your computer");
    });
  });

  it("Can add Boat Billed Heron to cart, with correct bonus items", () => {
    addBoatBilledHeronToCart();
    cy.get(".Cart").within(() => {
      cy.get("li").contains("Boat Billed Heron");
      cy.get("li").contains("Stickers");
      cy.get("li").contains("Background for your computer");
      cy.get("li").contains("Tote bag");
    });
  });

  it("Can many birds to cart, with correct bonus items", () => {
    addManyBirdsToCart();
    cy.get(".Cart").within(() => {
      cy.get("li").contains("Boat Billed Heron");
      cy.get("li").contains("Stickers");
      cy.get("li").contains("Background for your computer");
      cy.get("li").contains("Tote bag");
      cy.get("li").contains("Invites to VIP live streams");
    });
  });
});

const formData = {
  firstName: "Erica",
  lastName: "Example",
  email: "erica@example.com",
  zipCode: 11372,
};

const completeForm = (params = {}) => {
  const data = { ...formData, ...params };
  const { firstName, lastName, email, creditCard, zipCode } = data;
  if (firstName) {
    cy.get("form").contains("First Name").type(firstName);
  }
  cy.get("form").contains("Last Name").type(lastName);
  cy.get("form").contains("Email").type(email);
  cy.get("form").contains("Zip Code").type(zipCode);
};

describe("Checkout and reset", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
    cy.get(".birds button").first().click();
    // slow down the tests to help see what is happening for debugging
    cy.wait(500);
  });

  it("I can complete the inputs in the checkout form", () => {
    completeForm();
    const values = Object.values(formData);
    cy.get("input[type=submit]").each((input) => {
      const value = cy.wrap(input).invoke("val");
      values.includes(value);
    });
    // slow down the tests to help see what is happening for debugging
    cy.wait(500);
  });

  let stub;
  it("An alert tells me the purchase was successful and the cart is emptied", () => {
    stub = cy.stub();
    cy.on("window:alert", stub)
      .then(() => {
        cy.get(".Checkout").within(() => {
          cy.get('input[type="submit"]')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith(
                "You have adopted birds. Thank you!"
              );
            });
        });
      })
      .then(() => {
        cy.get(".Cart").within(() => {
          cy.get("li").should("not.exist");
        });
      });
  });
});

describe("Can delete a bird and update the cart accordingly", () => {
  before(() => {
    cy.visit(`http://localhost:${PORT}`);
    addFlycatcherToCart();
    addBoatBilledHeronToCart();
    addFlycatcherToCart();
  });
  it("Deletes a bird on button click", () => {
    cy.get(".Cart li")
      .eq(1)
      .within(() => {
        cy.get("button").click();
      })
      .then(() => {
        cy.get(".Cart").within(() => {
          cy.contains("Boat Billed Heron").should("not.exist");
        });
      });
  });
  it("Deletes only a single bird, if there are duplicates on button click", () => {
    cy.get(".Cart li")
      .eq(1)
      .within(() => {
        cy.get("button").click();
      })
      .then(() => {
        cy.get(".Cart").within(() => {
          cy.contains("Royal Flycatcher");
        });
      });
  });
});
