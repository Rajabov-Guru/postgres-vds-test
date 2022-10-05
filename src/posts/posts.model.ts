import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttrs{
    title: string;
    content: string;
    userId: number;
    image: string;
}


@Table({
    tableName:'posts'
})
export class Post extends Model<Post,PostCreationAttrs>{
    @ApiProperty({example:'1', description:"Уникальный идентификатор"})
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ApiProperty({example:'О фреймворке Nest', description:"Заголовок"})
    @Column({type:DataType.STRING,allowNull:false})
    title:string;

    @ApiProperty({example:'Something', description:"Контентная часть"})
    @Column({type:DataType.TEXT, allowNull:false})
    content:string;

    @ApiProperty({example:'flowers.png', description:"Картинка"})
    @Column({type:DataType.STRING, allowNull:true})
    image:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER, allowNull:false})
    userId:number;

    @BelongsTo(()=>User)
    author:User
}