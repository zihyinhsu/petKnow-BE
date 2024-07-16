import { BadRequestException, Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

/**
 * 檢查工具服務
 */
@Injectable()
export class ValidateUtilsService {
  /**
   * 檢查傳入的值是否為有效的 MongoDB ObjectId
   *
   * @param value 要檢查的字符串值
   * @returns 如果值是有效的 ObjectId，則返回該值
   * @throws BadRequestException 當值不是有效的 ObjectId 時拋出錯誤
   */
  isObjectId(value: string) {
    const isObjectId = isValidObjectId(value);

    if (!isObjectId) {
      throw new BadRequestException('無效的 id');
    }

    return value;
  }
}
