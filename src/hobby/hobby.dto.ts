import { Allow, Contains, IsIn, IsNumber, IsString } from 'class-validator';

class CreateHobbyDto {
  @IsString()
  @IsIn(['Low', 'Medium', 'High', 'Very-High'])
  public passionLevel: string;

  @IsString()
  public name: string;

  @IsNumber()
  public year: number;
}

export default CreateHobbyDto;
