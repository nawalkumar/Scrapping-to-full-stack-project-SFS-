// backend/routes/categorization.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const router = express.Router();

router.get("/", (req, res) => {
    const results = [];
    const csvPath = path.join(
        __dirname,
        "../../scrap_to_render/categorized_school_images_with_confidence1.csv"
    );

    fs.createReadStream(csvPath)
        .pipe(csv())
        .on("data", (row) => {
            results.push({
                id: row.ID,
                website: row.Website,
                imageUrl: row.Image_URL,
                altText: row.Alt_Text,
                labels: row.Detected_Labels,
                category: row.Category,
                localFile: row.Local_File,
                // generate local image URL if exists
                imagePath: `/images/${row.Local_File}`,
            });
        })
        .on("end", () => {
            res.json(results);
        })
        .on("error", (err) => {
            console.error("CSV read error:", err);
            res.status(500).json({ error: "Failed to read CSV file" });
        });
});

module.exports = router;