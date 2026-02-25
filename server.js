const express = require("express");
const cors = require("cors");
const { evaluate } = require("mathjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("AI Calculator Backend is Running 🚀");
});

app.post("/calculate", (req, res) => {
    try {
        const { expression } = req.body;

        if (!expression) {
            return res.status(400).json({
                success: false,
                message: "Expression is required"
            });
        }

        const result = evaluate(expression);

        res.json({
            success: true,
            result: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid mathematical expression"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
