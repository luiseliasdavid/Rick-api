const { Router } = require("express");


const { 
  chalenge,
  
} = require("../ApiInfo/ApiInfo");

const router = Router();


router.get("/chalenge", chalenge)

module.exports = router;
