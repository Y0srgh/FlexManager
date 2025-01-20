import { Injectable, PipeTransform, BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserSignInValidationPipe implements PipeTransform {
    transform(value: any) {
        const { username, email } = value;

        if (username && email) {
            throw new BadRequestException('Either username or email must be provided not both.');
        }

        if (!username && !email) {
            throw new BadRequestException('Either username or email must be provided .');
        }

        return value;
    }
}
