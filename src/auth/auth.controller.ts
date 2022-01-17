import { Controller,Get,Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { Post } from 'src/post/entities/post.entity';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @Req() user: UserEntity
    ){
        return user;
    }

    @Get('profile')
    profile(){
        return 'hello world'
    }
}
