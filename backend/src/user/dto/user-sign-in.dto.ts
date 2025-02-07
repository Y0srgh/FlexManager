import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UserSingInDto{

    @ValidateIf((o) => !o.email)
    username:string;

    @ValidateIf((o) => !o.username)
    @IsString({message: "Please enter a valid cred"})
    email:string;

    @IsNotEmpty()
    password:string;
}