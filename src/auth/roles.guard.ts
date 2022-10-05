import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private jwtService:JwtService,
                private reflector:Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const roles = this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ])
            if(!roles){
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer!=='Bearer' || !token){
                throw new UnauthorizedException({message:"Access denied"});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role=>roles.includes(role.value));
        }catch (e) {
            throw new HttpException("Access denied", HttpStatus.FORBIDDEN);
        }
    }

}