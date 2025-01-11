const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ideasRoute = require("./routes/ideas");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ideas", ideasRoute);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
