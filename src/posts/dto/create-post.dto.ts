import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example:'Something', description:"Заголовок"})
    readonly title: string;

    @ApiProperty({example:'Something', description:"Контентная часть"})
    readonly content: string;

    @ApiProperty({example:'1', description:"Id автора"})
    readonly userId: number;
}