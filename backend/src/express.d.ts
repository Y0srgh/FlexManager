declare global {
    namespace Express {
      interface Request {
        rawBody?: any;  
      }
    }
  }