import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  static CREATED(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.CREATED, '', '');
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

  @ApiProperty({
    title: '응답 코드',
    example: 'OK | CREATED | SERVER_ERROR',
  })
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @ApiProperty({
    title: '응답 메시지',
    example: `'' | 서버 에러가 발생했습니다. | 입력 값`,
  })
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty({
    title: '응답 데이터',
    example: `'' | {}`,
  })
  @Expose()
  get data(): T {
    return this._data;
  }
}