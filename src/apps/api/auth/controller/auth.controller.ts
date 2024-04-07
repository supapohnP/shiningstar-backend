import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestDTO, RegisterRequestDto } from '../../../../libs/dto/auth.dto';
import { AuthService } from '../../../../libs/service/auth/auth.service';
import { ERROR_CODE } from 'src/libs/constant/error.constant';
import { registerValidationBody } from 'src/libs/validation/auth.validation';
import { JoiValidationPipe } from 'src/libs/validation/joi.validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('/register')
  async register(
    @Body(new JoiValidationPipe(registerValidationBody)) registerRequestDto: RegisterRequestDto
  ) {
    const {
      email,
      password
    } = registerRequestDto;
    const userRegister = await this.authService.register(email, password);
    if (!userRegister) {
      throw new HttpException(
        'CANT_REGISTER_USER',
        HttpStatus.BAD_REQUEST,
      )
    }
    return userRegister;
  }

  @Get('/login')
  async login(
    @Body() loginRequestDTO: LoginRequestDTO
  ) {
    const { email, password } = loginRequestDTO;
    const user = await this.authService.login(email, password);
    if (!user) {
      return ERROR_CODE.LOGIN_FAILED;
    }
    return user;
  }
}
