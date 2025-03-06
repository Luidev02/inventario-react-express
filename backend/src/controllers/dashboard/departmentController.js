import { departmentService, nuevoDepartmentService } from "../../services/dashboard/department/departmentService.js";

export const departmentController = async(req,res)=>{
    try {
        const response = await departmentService()
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json(ResponseHandler.error(error.message, 500));
    }
}


export const nuevoDepartmentController = async(req,res)=>{
    try {
        
        if(!req.body.name ||!req.body.description){
            return res.status(400).json({status: 400, message: "Por favor, complete los campos obligatorios"});
        }
        const response = await nuevoDepartmentService(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json(ResponseHandler.error(error.message, 500));
    }
}