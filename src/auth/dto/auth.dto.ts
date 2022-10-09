import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}

export class JWT {
    @IsString()
    @IsNotEmpty()
    status: string   
    
    @IsString()
    @IsNotEmpty()
    access_token: string
}