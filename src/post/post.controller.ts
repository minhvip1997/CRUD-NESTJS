import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreatePostDto,EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){

    }

    @Get()
    async getMany(){
        const data =  await this.postService.getMany();
        return{ 
            message: 'Get data post',
            data
        }
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
        console.log(typeof id)
        return this.postService.getById(id);
    }


    @Post()
    @UseInterceptors(FileInterceptor(''))
    @ApiConsumes('multipart/form-data')
    createOne(@Body() dto: CreatePostDto){
        console.log(dto)
        return this.postService.createOne(dto);
    }

    @Put(':id')
    editOne(@Param('id') id: number, @Body() dto:EditPostDto){
        return this.postService.editOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number){
        return this.postService.deleteOne(id);
    }
}
