require("dotenv").config();
const server = require("./app");

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`The Server is listening on ${PORT}`));
