import { Injectable } from '@nestjs/common';
import path from 'path';
import dotenv from 'dotenv';

@Injectable()
export class EnvConfigService {
  private readonly mongodbUrl: string;

  constructor() {
    dotenv.config({ path: path.join(path.resolve(process.cwd()), '.env') });
    this.mongodbUrl = process.env.DB_URL;
  }

  getPatKom() {
    if (!this.mongodbUrl) throw new Error('在環境變量中找不到 PetKnow 數據庫連接字符串');
    return this.mongodbUrl;
  }
}
