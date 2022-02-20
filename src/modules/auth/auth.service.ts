import { ValidateException } from '@/exceptions/validate.exception';
import { check } from '@/utils/digest.util';
import { Teacher } from '@/entities/teacher.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto as C } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Teacher)
    private readonly sessionRepository: Repository<Teacher>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAuthDto: C): Promise<Teacher> {
    const { account, password } = createAuthDto;
    const user = await this.sessionRepository.findOneOrFail({
      mobile: account
    });

    if (!check(password, user.password)) {
      throw new ValidateException('Account or Password error!!!, Please retry');
    }

    const {
      id,
      schoolId,
      name,
      mobile,
      sex,
      education,
      native,
      nation,
      cardNo,
      birthday
    } = user;
    const payload = {
      id,
      schoolId,
      name,
      mobile,
      sex,
      education,
      native,
      nation,
      cardNo,
      birthday
    };

    Object.assign(user, { token: this.jwtService.sign(payload) });
    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
