import { Global, Module } from '@nestjs/common';
import { PasswordService } from './utils/password.service';
import { EmailService } from './utils/email.service';
@Global()
@Module({
  providers: [PasswordService, EmailService],
  exports: [PasswordService, EmailService], 
})
export class CommonModule {}