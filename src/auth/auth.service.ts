import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, JWT} from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService{
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ){}
    
    async signup(dto: AuthDto){
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
            return this.signToken(user.id, user.email)           
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw err
        }

    }
    async signin(dto: AuthDto){
        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        // if user doesn't exist throw exception
        if(!user) throw new ForbiddenException('Credentials incorrect')

        // compare password
        const pwMatches = await argon.verify(user.hash,dto.password)
        // if pass incorrent throw exception
        if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<JWT> {
        const payload = {
            id: userId,
            email
        }
        const options = {
            expiresIn:'1h',
            secret: this.config.get('JWT_SECRET_KEY')
        }

        const token = await this.jwt.signAsync(payload,options)

        return {
            status: 'success',
            access_token:token
        }
    }
} 