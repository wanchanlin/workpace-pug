const mongoose = require("mongoose");
const db = require("../../db");

const PositionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // auto-generate unique ID for each position
  fullName: String,
  email: String,
  title: String,
  description: String,
  role: { type: String, enum: ["employer", "employee"], default: "employee" }, 
  hireDate: Date
});



const Position = mongoose.model("Position", PositionSchema);

// Get all positions
async function getPositions() {
  await db.connect();
  return await Position.find({}); 
}
// Initialize jobs collection with some sample jobs
async function initializePositions() {

    const positionList = [
      {
        fullName: "John Doe",
        email: "johndoe@example.com",
        title: "CEO",
        description: "Lead the company",
        role: "employee",
        hireDate: new Date("2025-02-28")
      },
      {
        fullName: "Jane Smith",
        email: "janesmith@example.com",
        title: "Software Developer",
        description: "Develop software",
        role: "employer",
        hireDate: new Date("2025-03-10")
      }
    ];

    await Position.insertMany(positionList);
}
async function addPosition(fullName, email, title, description, role, hireDate) {
  const newPosition = new Position({
    _id: new mongoose.Types.ObjectId(),
    fullName,
    email,
    title,
    description,
    role,
    hireDate
  });
  return await newPosition.save();
}

// Update job details
async function updatePosition(id, { fullName, email, title, description, role, hireDate }) {
  return await Position.findByIdAndUpdate(id, { 
    fullName, 
    email, 
    title, 
    description, 
    role, 
    hireDate 
  });
}
// Add this function to get a single position by ID
async function getPositionById(id) {
  await db.connect();
  return await Position.findById(id);
}
// Delete job by ID
async function deletePosition(id) {
  try {
    await db.connect();
    const result = await Position.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error("Error in deletePosition:", error);
    throw error;
  }
}

module.exports = {
  getPositions, 
  initializePositions,
  addPosition,
  updatePosition, 
  getPositionById,  
  deletePosition

}
