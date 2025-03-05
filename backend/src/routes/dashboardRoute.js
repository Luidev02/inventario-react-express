import { Router } from "express";

import { dashboard } from '../controllers/dashboardController.js'
import { departmentController } from "../controllers/dashboard/departmentController.js";

const dash = Router();

dash.get('/',dashboard);
dash.get('/department',departmentController)

export default dash;