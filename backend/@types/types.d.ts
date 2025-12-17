export interface UserPayload {
  authId: string;
  userId: string;
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
