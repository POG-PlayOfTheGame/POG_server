import { CommonResponseFormInterceptor } from './common/interceptors/common.response.form.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { UserShowDto } from './dto/userShow.dto';

@UseInterceptors(CommonResponseFormInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'Kildong',
      lastName: 'Hong',
      password: 'password',
      role: new RoleEntity({ id: 1, name: 'admin' }),
    });
  }

  @Get('user')
  getUser(): UserShowDto {
    return new UserShowDto({
      id: 1,
      firstName: 'Kildong',
      lastName: 'Hong',
    });
  }
}
