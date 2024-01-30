import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
    CoursesModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor],
})
export class AppModule {}
