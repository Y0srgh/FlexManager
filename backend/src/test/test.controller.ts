import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';


@Controller('test')
export class TestController {
    constructor(
        private testService: TestService
    ){}

    @Get()
    async getTests(){
        return this.testService.getData();
    }
}
