import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  static generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
  }
  
  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch {
      return null;
    }
  }
  
  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
    } catch {
      return null;
    }
  }
  
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}