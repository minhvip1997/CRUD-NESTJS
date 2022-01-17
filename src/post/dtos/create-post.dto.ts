import { ApiOkResponse, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, isBoolean, IsEnum, isEnum, IsString, ValidateNested } from "class-validator";
import { EnumToString } from "src/common/helpers/enumToString";
import { Post } from "../entities/post.entity";
import { PostCategory } from "../enums";


export class CreatePostDto{

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    slug: string;

    @IsString()
    @ApiProperty()
    excerpt: string;

    @IsString()
    @ApiProperty()
    content: string;

    
    @IsEnum(PostCategory,{message: `Invalid option. Valids options ${EnumToString(PostCategory)}`})
    category: PostCategory;

    
    // @IsArray()
    @IsString({each: true})
    @ApiProperty()
    tags: string[];


    // @IsBoolean()
    @ApiPropertyOptional()
    @ToBoolean()
    status: boolean
}

export function ToBoolean(): (target: any, key: string) => void {
    return Transform((value: any) => value === 'true' || value === true || value === 1 || value === '1');
}