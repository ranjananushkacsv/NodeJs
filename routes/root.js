const express = require('express');
const router = express.Router();
const path = require('path');
const empController = require('../../controllers/empController')


// Route for root path '/'
router.route('/')
    .get(empController.getAllEmployees)
    .post(empController.createNewEmployee)
    .put(empController.updateEmployee)
    .delete(empController.deleteEmployee);

// Route for specific employee by ID
router.route('/:id')
    .get(empController.getEmployee);


module.exports = router;



//MVC-model view controller: way to organize express app