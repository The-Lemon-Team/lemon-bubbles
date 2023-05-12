import { User } from '../../users/entities/user.entity';

export interface JwtPayload {
  id: User['id'];
}
