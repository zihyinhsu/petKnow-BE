import { Types } from 'mongoose';

interface IGetCart {
  courseIds: string[];
  couponCode: string;
}

interface ICheckCartCoursesReturn {
  id?: string;
  platformCoupons?: IPlatformCoupon;
  totalPrice: number;
  shoppingCart: ShoppingCartItem[];
  uniqueTagNames?: string[] | undefined;
  discountedPrice?: number | undefined;
  courseIds?: string[];
}

interface ShoppingCartItem {
  _id: string;
  title: string;
  cover: string;
  tagNames: string[];
  level: string | null;
  time: number;
  total: number;
  instructorName: string;
  price: number;
  discountPrice: number | null;
  isFree: boolean;
}

interface ICheckCourse {
  totalPrice: number;
  shoppingCart: ShoppingCartItem[];
  uniqueTagNames?: string[];
  courseIds?: string[];
  courseIdsStr?: string;
  discountedPrice?: number;
}

interface IPlatformCoupon {
  couponCode: string;
  couponPrice: number;
}

interface ICreateOrderParams {
  user: Types.ObjectId;
  userName: string;
  merchantOrderNo: string;
  tradeSha?: string;
  tradeInfo?: string;
  merchantID: string;
  version: number;
  amt?: number;
  couponCode?: string;
  couponPrice?: number;
  itemDesc: string;
  email: string;
  timeStamp: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IOrderParams {
  email: string;
  amt: number;
  itemDesc: string;
  timeStamp: number;
  merchantOrderNo: string;
}

export {
  IGetCart,
  ICheckCartCoursesReturn,
  ICheckCourse,
  IOrderParams,
  ICreateOrderParams,
  ShoppingCartItem,
};
