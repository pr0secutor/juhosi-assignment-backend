const { Router } = require("express");
const { login, checkAuth, verifyJwt } = require("../controllers/auth");
const { createOrder, fecthData } = require("../controllers/data");

const router = Router();

router.get("/healthy", async (req, res) => {
  return res.status(200).json("App running....");
});
router.post("/login", login);
router.get("/checkauth",verifyJwt,checkAuth);
router.get("/fetchdata",verifyJwt,fecthData)
router.post("/order",createOrder);

module.exports = router;
