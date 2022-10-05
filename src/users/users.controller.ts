import {Body, Controller, Get, Inject, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService:UsersService) {

    }

    @ApiOperation({summary:"Создание пользователя"})
    @ApiOkResponse({status:200, type:User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto:CreateUserDto){
      return this.userService.createUser(dto);
    }


    @ApiOperation({summary:"Получение всех пользователей"})
    @ApiOkResponse({status:200, type:[User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary:"Выдача роли"})
    @ApiOkResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    @UsePipes(ValidationPipe)
    addRole(@Body() dto:AddRoleDto){
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary:"Бан пользователя"})
    @ApiOkResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto){
        return this.userService.ban(dto);
    }


}
