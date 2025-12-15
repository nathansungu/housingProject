export interface UserPayload {
  id: string;
  firstName: string;  
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  
      token?: string;     
    }
  }
}

export {};
