const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/players", userController.getAllUsers);

router.get("/", userController.helloWorld);

router.get("/:nickname", userController.getPlayerByNickname);
router.post("/add-player", userController.createUser);

router.post("/add-history/all", userController.addHistoryToAllUsers);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
