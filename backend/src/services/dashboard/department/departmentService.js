import Department from "../../../models/Department.js";
import ResponseHandler from "../../../utils/responseHandler.js";

export const departmentService = async () => {
  try {
    const department = await Department.findAll();
    return ResponseHandler.success(department, 200);
  } catch (error) {
    throw error;
  }
};


export const nuevoDepartmentService = async (data) => {
  try {
    const department = await Department.create(data);
    return ResponseHandler.success(department, 201);
  } catch (error) {
    throw error; 
  }
}