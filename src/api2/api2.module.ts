import { Module } from '@nestjs/common';
import {
  // AuthModule,
  UserModule,
} from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    UserModule.register({
      global: true,
      modelPath: join(process.cwd(), 'casbin/model.conf'),
      policyAdapter: join(process.cwd(), 'casbin/policy.csv'),
    }),
  ],
  exports: [],
})
export class Api2Module {}
