const express = require("express"), 
bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const booksRouter = require("./routes/books");


const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description:"A simple Express Library API",
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  app.use("/books", booksRouter);
console.debug("Server listening on port: " + PORT);