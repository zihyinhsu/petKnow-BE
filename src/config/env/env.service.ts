import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import detect from 'detect-port';

//#region EnvService [ 環境變數服務器 ]
/**
 * 環境變數服務器
 */
@Injectable()
export class EnvService {
  private configService: ConfigService;

  /**
   * @param configService - 用於訪問配置變數的服務。
   */
  constructor() {
    this.configService = new ConfigService();
  }

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
  async getPort(): Promise<number> {
    const defaultPort = parseInt(this.configService.get<string>('PORT', '8000'));

    const port = await detect(defaultPort);

    if (port !== defaultPort) {
      Logger.warn(`Port ${defaultPort} is already in use. Using port ${port} instead.`);
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
    const mongoDBUrl = this.configService.get<string>(
      'MONGODB_URL',
      'mongodb://127.0.0.1:27017/pet-know',
    );
    if (!mongoDBUrl) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 PetKnow 數據庫連接字符串');
    }

    return mongoDBUrl;
  }
  //#endregion getPatKomDB [ 讀取 PatKom 資料庫 ] End

  //#region getCoverUrl [ 讀取 封面網址 ]
  /**
   *  讀取 封面網址
   */
  getCoverUrl(): string {
    const coverUrl = this.configService.get<string>('COVER_URL');

    if (!coverUrl) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 COVER_URL 數據庫連接字符串');
    }

    return coverUrl;
  }
  //#endregion getCoverUrl [ 讀取 封面網址 ] End

  //#region getCoverParamsUrl [ 讀取 封面參數網址 ]
  /**
   *  讀取 封面參數網址
   */
  getCoverParamsUrl(): string {
    const coverParamsUrl = this.configService.get<string>('COVER_PARAMS_URL');

    if (!coverParamsUrl) {
      // 如果環境變數未定義且也沒有提供預設值，則引發錯誤
      throw new Error('在環境變量中找不到 COVER_PARAMS_URL 數據庫連接字符串');
    }

    return coverParamsUrl;
  }
  //#endregion getCoverParamsUrl [ 讀取 封面參數網址 ] End

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
    if (!googleUrl) throw new Error('在環境變量中找不到 OAUTH_GOOGLE_REDIRECT_URL');

    return googleUrl;
  }
  //#endregion getGoogleUrl [ 讀取 google 網址 ] End

  //#region getMerchantId [ 讀取 金流-商家編號 ]
  /**
   *  讀取 金流-商家編號
   */
  getMerchantId(): string {
    const merchantId = this.configService.get<string>('MERCHANT_ID');

    if (!merchantId) throw new Error('在環境變量中找不到 MERCHANT_ID 數據庫連接字符串');

    return merchantId;
  }
  //#endregion getMerchantId [ 讀取 金流-商家編號 ] End

  //#region getRepondType [ 讀取 金流-商家資料類型 ]
  /**
   *  讀取 金流-商家資料類型
   */
  getRespondType(): string {
    const respondType = this.configService.get<string>('REsPOND_TYPE');

    if (!respondType) throw new Error('在環境變量中找不到 REsPOND_TYPE 數據庫連接字符串');

    return respondType;
  }
  //#endregion getRepondType [ 讀取 金流-商家資料類型 ] End

  //#region getVersion [ 讀取 金流-商家版本號 ]
  /**
   *  讀取 金流-商家版本號
   */
  getVersion(): string {
    const version = this.configService.get<string>('VERSION');

    if (!version) throw new Error('在環境變量中找不到 VERSION 數據庫連接字符串');

    return version;
  }
  //#endregion getVersion [ 讀取 金流-商家版本號 ] End

  //#region getGoldFlowHashKey [ 讀取 金流-Key ]
  /**
   *  讀取 金流-Key
   */
  getGoldFlowHashKey(): string {
    const goldFlowHashKey = this.configService.get<string>('GOLD_FLOW_HASH_KEY');

    if (!goldFlowHashKey) throw new Error('在環境變量中找不到 GOLD_FLOW_HASH_KEY 數據庫連接字符串');

    return goldFlowHashKey;
  }
  //#endregion getGoldFlowHashKey [ 讀取 金流-Key ] End

  //#region getGoldFlowHashIv [ 讀取 金流-Iv ]
  /**
   *  讀取 金流-Iv
   */
  getGoldFlowHashIv(): string {
    const goldFlowHashIv = this.configService.get<string>('GOLD_FLOW_HASH_IV');

    if (!goldFlowHashIv) throw new Error('在環境變量中找不到 GOLD_FLOW_HASH_IV 數據庫連接字符串');

    return goldFlowHashIv;
  }
  //#endregion getGoldFlowHashIv [ 讀取 金流-Iv ] End

  //#region getGoldFlowAlgorithm [ 讀取 金流-演算法 ]
  /**
   *  讀取 金流-演算法
   */
  getGoldFlowAlgorithm(): string {
    const goldFlowAlgorithm = this.configService.get<string>('GOLD_FLOW_ALGORITHM');

    if (!goldFlowAlgorithm)
      throw new Error('在環境變量中找不到 GOLD_FLOW_ALGORITHM 數據庫連接字符串');

    return goldFlowAlgorithm;
  }
  //#endregion getGoldFlowAlgorithm [ 讀取 金流-演算法 ] End

  //#region getOrderSalt [ 讀取 訂單-加鹽 ]
  /**
   *  讀取 訂單-加鹽
   */
  getOrderSalt(): string {
    const orderSalt = this.configService.get<string>('ORDER_SALT');

    if (!orderSalt) throw new Error('在環境變量中找不到 ORDER_SALT 數據庫連接字符串');

    return orderSalt;
  }
  //#endregion getOrderSalt [ 讀取 訂單-加鹽 ] End

  //#region getOrderHashKey [ 讀取 訂單-Key ]
  /**
   *  讀取 訂單-Key
   */
  getOrderHashKey(): string {
    const orderHashKey = this.configService.get<string>('ORDER_HASH_KEY');

    if (!orderHashKey) throw new Error('在環境變量中找不到 ORDER_HASH_KEY 數據庫連接字符串');

    return orderHashKey;
  }
  //#endregion getOrderHashKey [ 讀取 訂單-Key ] End

  //#region getOrderHashIv [ 讀取 訂單-Iv ]
  /**
   *  讀取 訂單-Iv
   */
  getOrderHashIv(): string {
    const orderHashKey = this.configService.get<string>('ORDER_HASH_IV');

    if (!orderHashKey) throw new Error('在環境變量中找不到 ORDER_HASH_IV 數據庫連接字符串');

    return orderHashKey;
  }
  //#endregion getOrderHashIv [ 讀取 訂單-Iv ] End

  //#region getOrderHashIv [ 讀取 訂單-Iv ]
  /**
   *  讀取 訂單-Iv
   */
  getOrderAlgorithm(): string {
    const orderAlgorithm = this.configService.get<string>('ORDER_ALGORITHM');

    if (!orderAlgorithm) throw new Error('在環境變量中找不到 ORDER_ALGORITHM 數據庫連接字符串');

    return orderAlgorithm;
  }
  //#endregion getOrderHashIv [ 讀取 訂單-Iv ] End
}
//#endregion EnvService [ 環境變數服務器 ] End
