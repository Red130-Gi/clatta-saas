import { IsString, MinLength } from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @MinLength(3)
  name: string;
}

