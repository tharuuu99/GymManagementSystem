require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 5000; // Corrected 'POST' to 'PORT'

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Service Account Setup
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore Database Reference
const db = admin.firestore();



// JWT Authentication Middleware
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).send({ error: true, message: "Unauthorized access" });
  }
  
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ error: true, message: "Forbidden user or token expired" });
    }
    req.decoded = decoded;
    next();
  });
};

// Firestore Collection References
const userCollection = db.collection("user");
const classCollection = db.collection("class");
const packageCollection = db.collection("package");
const trainersCollection = db.collection("trainers");
const membersCollection = db.collection("members");
const adminsCollection = db.collection("admins");

// Verify Admin Middleware
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  try {
    const userDoc = await userCollection.doc(email).get();
    if (!userDoc.exists || userDoc.data().role !== "admin") {
      return res.status(401).send({ error: true, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ error: true, message: "Internal server error" });
  }
};

// Verify Instructor Middleware
const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  try {
    const userDoc = await userCollection.doc(email).get();
    if (!userDoc.exists || !["instructor", "admin"].includes(userDoc.data().role)) {
      return res.status(401).send({ error: true, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ error: true, message: "Internal server error" });
  }
};

// Routes

// Generate JWT Token
app.post("/api/set-token", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});

app.post("/new-user", async (req, res) => {
  const { name, email } = req.body; // Destructure req.body

  try {
    // Check if the email exists in the `trainer` collection
    const trainerDoc = await db.collection("trainers").where("email", "==", email).get();
    if (!trainerDoc.empty) {
      const role = "trainer"; // Role set to trainer
      return res.status(200).send({
        success: true,
        message: "User already exists in the system as a trainer.",
        data: { name, email, role, photoUrl },
      });
    }

    // Check if the email exists in the `member` collection
    const memberDoc = await db.collection("members").where("email", "==", email).get();
    if (!memberDoc.empty) {
      const role = "member"; // Role set to member
      return res.status(200).send({
        success: true,
        message: "User already exists in the system as a member.",
        data: { name, email, role, photoUrl },
      });
    }

    // Check if the email exists in the `admin` collection
    const adminDoc = await db.collection("admins").where("email", "==", email).get();
    if (!adminDoc.empty) {
      const role = "admin"; // Role set to admin
      return res.status(200).send({
        success: true,
        message: "User already exists in the system as an admin.",
        data: { name, email, role , photoUrl},
      });
    }

    // If email is not found in any collection
    res.status(404).send({
      success: false,
      message: "You are not in the system. Please contact the admin to be added.",
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
});



app.post("/new-user2", async (req, res) => {
  const { name, email } = req.body; // Destructure req.body

  try {
    // Add the new user to the `user` collection
    const newUser = {
      name,
      email,
      role: null, // Role is set to null
    };

    const docRef = await db.collection("user").add(newUser);

    res.status(201).send({
      success: true,
      message: "User added successfully to the system.",
      data: { id: docRef.id, ...newUser },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
});



// Home Route
app.get("/", (req, res) => {
  res.send("Gym Management System Server is running!");
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
