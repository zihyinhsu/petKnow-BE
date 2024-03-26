import { Injectable } from '@nestjs/common';
import path from 'path';
import dotenv from 'dotenv';

@Injectable()
export class EnvConfigService {
  private readonly mongodbUrl: string;
  private readonly jwtSecret: string;

  constructor() {
    dotenv.config({ path: path.join(path.resolve(process.cwd()), '.env') });
    this.mongodbUrl = process.env.DB_URL;
    this.jwtSecret = process.env.JWT_SECRET;
  }

  getPatKom() {
    if (!this.mongodbUrl) throw new Error('在環境變量中找不到 PetKnow 數據庫連接字符串');
    return this.mongodbUrl;
  }

  getJwtSecret(){
    if (!this.jwtSecret) throw new Error('在環境變量中找不到 JWT_SECRET');
    return this.mongodbUrl;
  }
}
