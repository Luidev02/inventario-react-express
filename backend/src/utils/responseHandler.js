class ResponseHandler {
    static success(data, message = "Operación exitosa", status = 200) {
      return {
        ok: true,
        status,
        message,
        ...data,
      };
    }
  
    static error(message = "Ocurrió un error", status = 500) {
      return {
        ok: false,
        status,
        message,
      };
    }
  }
  
  export default ResponseHandler;
  