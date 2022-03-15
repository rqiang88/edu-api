import { Teacher } from '@/entities/teacher.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    PassportModule.register({ property: 'teacher', session: false }),
    JwtModule.register({
      secret: process.env.LOGIN_SECRET,
      signOptions: { expiresIn: 7200 || +process.env.LOGIN_EXPIRES_IN },
      verifyOptions: { ignoreExpiration: true }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
