import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

//#region EnvService [ 環境變數服務器 ]
/**
 * 環境變數服務器
 */
@Injectable()
export class EnvService {
  /**
   * @param configService - 用於訪問配置變數的服務。
   */
  constructor(private configService: ConfigService) {}

  //#region getKey [ 讀取 env 文件 Key 對應的 Value ]
  /**
   * 讀取 env 文件 Key 對應的 Value
   * @param {string} key
   * @return {*}  {string}
   */
  getKey(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error(`在環境變量中找不到 ${key}`);
    }

    return value;
  }
  //#endregion getKey [ 讀取 env 文件 Key 對應的 Value ] End

  //#region getPort [ 讀取 埠 ]
  /**
   *  讀取 埠
   */
  getPort(): string {
    const port = this.configService.get<string>('PORT', '3000');
    if (!port) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 PORT');
    }

    return port;
  }
  //#endregion getPort [ 讀取 埠 ] End

  //#region getEnv [ 讀取 目前環境 ]
  /**
   *  讀取 目前環境
   */
  getNodeEnv(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'dev');
    if (!nodeEnv) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 NODE_ENV');
    }

    return nodeEnv;
  }
  //#endregion getEnv [ 讀取 目前環境 ] End

  //#region getServer [ 讀取 伺服器網域名稱 ]
  /**
   *  讀取 伺服器網域名稱
   */
  getServer(): string {
    const server = this.configService.get<string>('SERVER', 'http://localhost');
    if (!server) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 SERVER');
    }

    return server;
  }
  //#endregion getServer [ 讀取 伺服器網域名稱 ] End

  //#region getEnv [ 讀取 目前環境 ]
  /**
   *  讀取 目前環境
   */
  getIsWaggerJson(): string {
    const isWaggerJson = this.configService.get<string>('IS_WAGGER_JSON', 'false');
    if (!isWaggerJson) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 IS_WAGGER_JSON');
    }

    return isWaggerJson;
  }
  //#endregion getEnv [ 讀取 目前環境 ] End

  //#region getPatKomDB [ 讀取 PatKom 資料庫 ]
  /**
   *  讀取 PatKom 資料庫
   */
  getPatKomDB(): string {
    const mongoDB_Url = this.configService.get<string>(
      'MONGODB_URL',
      'mongodb://127.0.0.1:27017/petknow-be',
    );
    if (!mongoDB_Url) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 PetKnow 數據庫連接字符串');
    }

    return mongoDB_Url;
  }
  //#endregion getPatKomDB [ 讀取 PatKom 資料庫 ] End

  //#region getJwtSecret [ 讀取 Jwt 金鑰 ]
  /**
   *  讀取 Jwt 金鑰
   */
  getJwtSecret(): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('在環境變量中找不到 JWT_SECRET');
    }

    return jwtSecret;
  }
  //#endregion getJwtSecret [ 讀取 Jwt 金鑰 ] End

  //#region getGoogleId [ 讀取 google Id ]
  /**
   *  讀取 google Id
   */
  getGoogleId(): string {
    const googleId = this.configService.get<string>('OAUTH_GOOGLE_ID');
    if (!googleId) {
      throw new Error('在環境變量中找不到 OAUTH_GOOGLE_ID');
    }

    return googleId;
  }
  //#endregion getGoogleId [ 讀取 google Id ] End

  //#region getGoogleSecret [ 讀取 google 金鑰 ]
  /**
   *  讀取 google 金鑰
   */
  getGoogleSecret(): string {
    const googleSecret = this.configService.get<string>('OAUTH_GOOGLE_SECRET');
    if (!googleSecret) {
      throw new Error('在環境變量中找不到 OAUTH_GOOGLE_SECRET');
    }

    return googleSecret;
  }
  //#endregion getGoogleSecret [ 讀取 google 金鑰 ] End

  //#region getGoogleUrl [ 讀取 google 網址 ]
  /**
   *  讀取 google 網址
   */
  getGoogleUrl(): string {
    const googleUrl = this.configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL');
    if (!googleUrl) {
      throw new Error('在環境變量中找不到 OAUTH_GOOGLE_REDIRECT_URL');
    }

    return googleUrl;
  }
  //#endregion getGoogleUrl [ 讀取 google 網址 ] End
}
//#endregion EnvService [ 環境變數服務器 ] End
