import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

import { SwaggerExamples } from '../../../utils/swagger.constants';

export class UserProfileResponseDto {
  @ApiProperty({ example: 10 })
  id: number;

  @ApiProperty({ example: SwaggerExamples.Common.DATE })
  createdAt: Date;

  @ApiProperty({ example: SwaggerExamples.Common.DATE })
  updatedAt: Date;

  @ApiProperty({ example: SwaggerExamples.User.USERNAME })
  @IsString()
  username: string;

  @ApiProperty({ example: SwaggerExamples.User.EMAIL })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: SwaggerExamples.User.ABOUT })
  @Length(1, 200)
  @IsOptional()
  @IsString()
  about?: string;

  @ApiProperty({ required: false, example: SwaggerExamples.User.AVATAR })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
