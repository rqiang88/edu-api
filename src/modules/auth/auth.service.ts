import { RedisService } from '@/shared/redis/redis.service';
import { ValidateException } from '@/core/exceptions/validate.exception';
import { check } from '@/core/utils/digest.util';
import { Teacher } from '@/entities/teacher.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Teacher) private readonly repository: Repository<Teacher>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async login(createAuthDto: CreateAuthDto): Promise<string> {
    const { account, password } = createAuthDto;
    const teacher = await this.repository.findOneByOrFail({ mobile: account });
    if (teacher && check(password, teacher.password)) {
      const { id } = teacher;
      const token = this.jwtService.sign({ id });
      this.redisService.ioClient.setex(token, 7200, id);
      return token;
    } else {
      throw new ValidateException('用户名或者密码错误');
    }
  }

  async logout(token: string) {
    this.redisService.ioClient.del(token);
  }
}
