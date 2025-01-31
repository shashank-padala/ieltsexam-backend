import { IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  clerkId: string;
}