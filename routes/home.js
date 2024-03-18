const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a Firestore reference
const db = admin.firestore();

// Route for testing the application
router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

// Route to insert data into Firestore
router.post("/insert", async (req, res, next) => {
  try {
    const data = req.body; // Assuming the data to be inserted is sent in the request body

    // Add a new document with a generated ID
    const docRef = await db.collection("items").add(data);

    return res.status(200).json({
      message: "Data inserted successfully",
      documentId: docRef.id // Return the ID of the newly created document
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
