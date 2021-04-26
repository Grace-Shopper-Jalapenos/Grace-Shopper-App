const { expect } = require("chai");

// Database Imports
const {
    db,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../server/db");

const app = require("supertest")(require("../server/server"));

console.log(db.config);

describe("Routes", () => {
    describe("GET /", () => {
        it("show info", async () => {
            const response = await app.get("/");
            expect(response.status).to.equal(200);
            expect(response.text).to.include("Grace Shopper Project");
        });
    });

    describe("Product Routes", () => {
        let storedProducts;
        const productData = [
            {
                name: "Mona Lisa",
                description: "test data",
                price: "1000",
                year: "2021",
                stock: "10",
                imgUrl: "#",
            },
            {
                name: "Italian Artwork 2",
                description: "test data 2",
                price: "2000",
                year: "1900",
                stock: "1",
                imgUrl: "#",
            },
        ];

        beforeEach(async () => {
            const createdProducts = await Products.bulkCreate(productData);
            storedProducts = createdProducts.map(
                (product) => product.dataValues,
            );
        });

        describe("GET `/api/products`", () => {
            it("serves up all Products", async () => {
                const response = await app.get("/api/products").expect(200);
                expect(response.body).to.have.length(2);
                expect(response.body[0].name).to.equal(storedProducts[0].name);
            });
        });
    });
});

describe("Testing", () => {
    it("equals 2", () => {
        expect(1 + 1).to.equal(2);
    });
});
