import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: {id: number, email: string}) {
    const user = await this.prisma.user.findUnique({
      where:{
        id: payload.id
      }
    })
    delete user.hash
    return user // it register as req.user inside the request object.
  }
}