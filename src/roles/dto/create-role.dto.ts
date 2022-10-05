import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example:'Админ', description:"Название"})
    readonly value:string;

    @ApiProperty({example:'qwerty', description:"Описание"})
    readonly description:string;
}