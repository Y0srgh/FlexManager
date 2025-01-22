
import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Roles } from 'src/enums/user-role.enum';
//decorateur recuperable via @User
export const User = createParamDecorator(
  (data: { roles?: Roles[] }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (data?.roles) {
      // ncheckiw si le role de l utilisateur est dans la liste des roles autorises
      if (!data.roles.includes(user.role)) {
        throw new ForbiddenException('You do not have permission to access this resource.');
      }
    }
    return user;
  },
);
