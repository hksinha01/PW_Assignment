const express = require("express")
const router = express.Router();
const questionController = require("../controller/questionController")
//const optionController = require("../controller/optionController")

router.post("/create",questionController.create)
router.delete("/questions/:id/delete",questionController.deleteQuestion)
router.post("/questions/:id/options/create",questionController.createOption)
router.get("/questions/:id",questionController.getOption)

router.post("/questions/:id/add_vote",questionController.addVote)
router.delete("/:id/delete",questionController.deleteOption)
module.exports = router