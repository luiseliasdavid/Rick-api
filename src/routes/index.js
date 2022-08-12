const { Router } = require("express");


const { 
  chalenge,
  
} = require("../ApiInfo/ApiInfo");

const router = Router();


router.get("/solucion", chalenge)

module.exports = router;
