import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal:true, // allows use in all modules.
  }),
  AuthModule, 
  UserModule,  
  PrismaModule
  ],
})
export class AppModule {}
