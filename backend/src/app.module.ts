import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChargingRecordsModule } from './charging-records/charging-records.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
  
    UsersModule,
    ChargingRecordsModule,
    AiModule,
  ],
})
export class AppModule {}