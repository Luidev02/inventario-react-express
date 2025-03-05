import { departmentService } from "../../services/dashboard/department/departmentService.js";

export const departmentController = async(req,res)=>{
    try {
        const response = await departmentService()
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message  });
    }
}

