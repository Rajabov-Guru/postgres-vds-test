import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example:'ADMIN', description:"Роль"})
    @IsString({message:'Должен быть строкой'})
    readonly value:string;

    @ApiProperty({example:'1', description:"Id пользователя"})
    @IsNumber({},{message:'Должен быть числом'})
    readonly userId:number;
}