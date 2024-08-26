import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateClientDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  name: string;

  @IsNotEmpty()
  @Length(10, 40)
  @IsString()
  address: string;
}
