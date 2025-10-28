require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "https://love-unsent-app.onrender.com",
}));

app.use(express.json());

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
// root route
app.get("/", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

