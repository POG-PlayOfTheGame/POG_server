import { CurrentUser } from '@app/common-config/decorator/UserDecorator';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { JwtAuthGuard } from '@app/common-config/jwt/JwtGuard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { Logger } from 'winston';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FavoriteSummonerApiService } from './FavoriteSummonerApiService';
import { UserReq } from '../user/dto/UserReq.dto';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { FavoriteSummonerCreateSuccess } from '@app/common-config/response/swagger/domain/favoriteSummoner/FavoriteSummonerCreateSuccess';
import { UnauthorizedError } from '@app/common-config/response/swagger/common/error/UnauthorizedError';
import { BadRequestError } from '@app/common-config/response/swagger/common/error/BadRequestError';
import { FavoriteSummonerCreateLimitFail } from '@app/common-config/response/swagger/domain/favoriteSummoner/FavoriteSummonerCreateLimitFail';
import { FavoriteSummonerCreateFail } from '@app/common-config/response/swagger/domain/favoriteSummoner/FavoriteSummonerCreateFail';

@Controller('favoriteSummoner')
@ApiTags('소환사 즐겨찾기 API')
export class FavoriteSummonerApiController {
  constructor(
    private readonly favoriteSummonerApiService: FavoriteSummonerApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: '소환사 즐겨찾기 추가',
    description: `
    소환사 즐겨찾기 추가 시 name, tier, win, lose, profileIconId, puuid, summonerId, leaguePoint, rank를 입력받습니다. \n
    소환사 즐겨찾기 추가 시 입력값을 누락한 경우 400 에러를 출력합니다. \n
    소환사 즐겨찾기 추가 시 즐겨찾기 한도가 초과된 경우 400 에러를 출력합니다. \n
    헤더에 토큰 값을 제대로 설정하지 않으면 401 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: '소환사 즐겨찾기 추가에 성공했습니다.',
    type: FavoriteSummonerCreateSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '잘못된 Authorization입니다.',
    type: UnauthorizedError,
  })
  @ApiBadRequestResponse({
    description: '입력 값을 누락했습니다.',
    type: BadRequestError,
  })
  @ApiForbiddenResponse({
    description: '즐겨찾기 한도가 초과되었습니다.',
    type: FavoriteSummonerCreateLimitFail,
  })
  @ApiInternalServerErrorResponse({
    description: 'FCM 토큰 수정에 실패했습니다.',
    type: FavoriteSummonerCreateFail,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createFollow(
    @CurrentUser() userDto: UserReq,
    @Body() favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ) {
    try {
      await this.favoriteSummonerApiService.createFavoriteSummoner(
        userDto,
        favoriteSummonerIdDto,
      );
      return ResponseEntity.CREATED_WITH(
        '소환사 즐겨찾기 추가에 성공했습니다.',
      );
    } catch (error) {
      this.logger.error(
        `dto = ${JSON.stringify(favoriteSummonerIdDto)}`,
        error,
      );
      if (error.status === ResponseStatus.FORBIDDEN) {
        return ResponseEntity.FORBIDDEN_WITH(error.message);
      }
      return ResponseEntity.ERROR_WITH('소환사 즐겨찾기 추가에 실패했습니다.');
    }
  }
}
