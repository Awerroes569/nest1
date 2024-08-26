import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 40)
  address: string;
}
