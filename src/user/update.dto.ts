import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public name: string;
}

export default UpdateUserDto;
