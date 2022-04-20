import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class InternalServerError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: ResponseStatus.SERVER_ERROR,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    title: '응답 메시지',
    example: 'Internal Server Error',
    description: '',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: 'Internal Server Error',
  })
  data: string;
}
