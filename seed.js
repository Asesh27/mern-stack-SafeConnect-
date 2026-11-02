import "dotenv/config";
import mongoose from "mongoose";
import Alert from "./models/Alert.js";

const sampleAlerts = [
  {
    title: "Flash flooding reported in Riverside",
    description: "Heavy rainfall has caused flash flooding near the river. Avoid low-lying roads and follow local evacuation guidance.",
    type: "Flood",
    severity: "High",
    status: "Active",
    location: { name: "Riverside District", lat: 22.5726, lng: 88.3639 },
    source: "Local Emergency Services",
  },
  {
    title: "Wildfire moving toward Pine Valley",
    description: "Fire crews are responding to a fast-moving wildfire. Residents in the warning zone should prepare to evacuate.",
    type: "Wildfire",
    severity: "Critical",
    status: "Active",
    location: { name: "Pine Valley", lat: 37.7749, lng: -122.4194 },
    source: "Regional Fire Authority",
  },
  {
    title: "Strong earthquake felt across the city",
    description: "A moderate earthquake was felt across the area. Check for structural damage and keep roads clear for responders.",
    type: "Earthquake",
    severity: "Moderate",
    status: "Active",
    location: { name: "Central City", lat: 35.6762, lng: 139.6503 },
    source: "Emergency Management Office",
  },
  {
    title: "Severe storm watch issued",
    description: "Strong winds and heavy rain are expected this evening. Secure loose outdoor items and monitor official updates.",
    type: "Storm",
    severity: "Moderate",
    status: "Active",
    location: { name: "North County", lat: 27.9506, lng: -82.4572 },
    source: "Weather Service",
  },
  {
    title: "Community shelter reopened",
    description: "The community shelter is open and accepting residents displaced by yesterday's flooding. Supplies and hot meals are available.",
    type: "Flood",
    severity: "Low",
    status: "Resolved",
    location: { name: "Eastside Community Center", lat: 22.5887, lng: 88.3930 },
    source: "Community Response Network",
  },
];

async function seedAlerts() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be configured before seeding alerts.");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "testApp",
  });

  const alerts = await Alert.insertMany(sampleAlerts);
  console.log(`Inserted ${alerts.length} sample alerts.`);
}

try {
  await seedAlerts();
} catch (error) {
  console.error("Could not seed alerts:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
