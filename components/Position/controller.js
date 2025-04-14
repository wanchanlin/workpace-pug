

const positionModel = require("./model");


const welcome = (request, response) => {
  response.render("index");
};

const getAllPositions = async (request, response) => {
  let positionList = await positionModel.getPositions();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  if (!positionList.length) {
    await positionModel.initializePositions(); 
    positionList = await positionModel.getPositions();
  }
  response.render("info", { positions: positionList });
};

const getAddForm = (request, response) => {
  response.render("addPosition");
};
// get the position form and render it
const addPosition = async (request, response) => {
  try {
    // Get values from the form
    const { fullName, email, title, description, role, hireDate } = request.body;

    // Call your Position model to add a new entry
    let resultStatus = await positionModel.addPosition(fullName, email, title, description, role, hireDate);

    console.log(`New position added: ${resultStatus}`);

    if (resultStatus) {
      // Successfully added, redirect to homepage or list page
      response.redirect("/info");
    } else {
      // If adding failed, reload form with an error message
      response.render("addPosition", { err: "Failed to add position. Try again." });  // Changed from "add" to "addPosition"
    }
  } catch (error) {
    console.error("Error adding position:", error);
    response.render("addPosition", { err: "An error occurred. Please try again later." });  // Changed from "add" to "addPosition"
  }
};
const getEditForm = async (request, response) => {
  try {
    const id = request.params.id;
    let position = await positionModel.getPositionById(id);
    if (!position) {
      return response.status(404).send('Position not found');
    }
    response.render("editPosition", { position });  // Changed from updatePosition to editPosition
  } catch (error) {
    console.error("Error getting position:", error);
    response.status(500).send("Error retrieving position");
  }
};

const updatePosition = async (request, response) => {
  const id = request.params.id;
  let resultStatus = await positionModel.updatePosition(id, {
    fullName: request.body.fullName,
    email: request.body.email,
    title: request.body.title,
    description: request.body.description,
    role: request.body.role,
    hireDate: request.body.hireDate
  });
  if (resultStatus) {
    response.redirect("/info");
  } else {
    response.render("editPosition", { err: "Error updating position" });
  }
};

const deletePosition = async (request, response) => {
  try {
    const id = request.params.id;
    const resultStatus = await positionModel.deletePosition(id);
    
    if (resultStatus) {
      console.log(`Successfully deleted position with id: ${id}`);
      response.redirect("/");
    } else {
      console.error(`Position not found with id: ${id}`);
      response.status(404).send("Position not found");
    }
  } catch (error) {
    console.error("Error deleting position:", error);
    response.status(500).render("index", { 
      positions: await positionModel.getPositions(),
      err: "Error deleting position" 
    });
  }
};

const getPositionApi = async (request, response) => {
  try {
    let positionList = await positionModel.getPositions();
    if (!positionList) {
      return response.status(404).json({ error: "No positions found" });
    }
    response.json(positionList);
  } catch (error) {
    console.error("Error fetching positions:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  welcome,
  // getPositionApi,  // Added getPositionApi function
  getAllPositions,
  getAddForm,
  addPosition,
  getEditForm,
  updatePosition,
  deletePosition,
  getPositionApi
};