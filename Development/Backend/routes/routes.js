const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require("../middleware/authmiddleware.js");
const projectController = require("../controllers/projectController.js");
const budgetController = require("../controllers/budgetController.js");
const attendanceController = require("../controllers/attendaceController.js");
const chatController = require("../controllers/chatController.js");
const workerController = require("../controllers/workerController.js");
const vendorController = require("../controllers/vendorController.js");
const threeDModelController = require("../controllers/threeDModelController.js");
const upload = workerController.upload;  

// Authentication routes
router.get("/", authController.root);
router.post("/user/signUp", authController.signUp);
router.post("/user/login", authController.login);
router.post("/logout", authMiddleware(), authController.logout);

// Project routes
router.get("/project", authMiddleware(), projectController.getProject);
router.post("/project/create", authMiddleware(), projectController.createProject);
router.post("/project/addWorker", authMiddleware(), projectController.addWorkerToProject);
router.post("/singleProject", authMiddleware(), projectController.projectById);

// Budget routes
router.get("/project/:id/budget", budgetController.getBudget);
router.post("/budget/add-transaction", authMiddleware(), budgetController.addTransaction);
router.post("/budget/transaction", authMiddleware(), budgetController.allTransaction);

// Attendance routes
router.post("/attendance", attendanceController.recordAttendance);
router.put("/attendace/updateShift", attendanceController.updateShift);

// Worker route
router.post("/worker/addWorker", authMiddleware(), upload.single("image"), workerController.addWorker);
router.get("/worker", authMiddleware(), workerController.allWorkers);

//vendor route
router.get("/vendor", authMiddleware(), vendorController.getAllVendors);
router.post("/addVendor",authMiddleware(), upload.single("image"), vendorController.addVendor);

//3D model
router.post("/upload3dmodel", authMiddleware(), upload.single("image"), threeDModelController.addModel);
router.post("/all3dModel",authMiddleware(), threeDModelController.getAllModel);

//chat
router.get("/chat/users",authMiddleware(), chatController.getChatUser);
router.post("/chat/sendRequest",authMiddleware(), chatController.sendRequest);
router.get("/chat/getRequest", authMiddleware(), chatController.getRequest);
router.post("/chat/acceptRequest", authMiddleware(), chatController.acceptRequest);
router.get("/chat/getfriends", authMiddleware(), chatController.getFriends);


module.exports = router;
