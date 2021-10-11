import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public name: string;

  @IsOptional()
  public hobbies?: [string];
}

export default CreateUserDto;
