import { Router } from "express";

import { dashboard } from '../controllers/dashboardController.js'
import { departmentController, nuevoDepartmentController } from "../controllers/dashboard/departmentController.js";

const dash = Router();

dash.get('/',dashboard);
dash.get('/departamento',departmentController)
dash.post('/nuevo-departamento', nuevoDepartmentController)

export default dash;