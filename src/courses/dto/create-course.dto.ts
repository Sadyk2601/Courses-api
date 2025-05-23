import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  teacherName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
