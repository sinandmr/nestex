import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    // getMe(@Req() req: Request){
    getMe(@GetUser() user : User){
        return user
    }

}
