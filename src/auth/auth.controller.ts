import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService : AuthService){}

    // POST /auth/signup
    @Post('signup')
    signup(){
        return this.authService.signup()
    }
    
    // POST /auth/signup
    @Post('signin')
    signin(){
        return this.authService.signin()
        // 26.20 https://www.youtube.com/watch?v=GHTA143_b-s
    }

}