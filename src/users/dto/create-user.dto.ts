import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example:'something@some.com', description:"Электронная почта"})
    @IsString({message:'Должен быть строкой'})
    @IsEmail({},{message:'Некорректный email'})
    readonly email:string;

    @ApiProperty({example:'qwerty', description:"Пароль"})
    @IsString({message:'Должен быть строкой'})
    @Length(4,16,{message:'Длина должна быть не меньше чем 4 и не больше чем 16'})
    readonly password:string;
}