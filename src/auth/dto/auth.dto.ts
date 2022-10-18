import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto{
    @ApiProperty({
        type: String,
        description: 'Email address',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Password',
    })
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