import { ConfigService } from './../../../../entity/config/configService';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RiotApiJobService {
  static async riotLeagueApi(summonerId: string): Promise<any> {
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${ConfigService.riotApiKey()}`;
    console.log(url);
    const res = await axios.get(url);

    const soloRankResult = res.data.filter(
      riotApiReturn => riotApiReturn['queueType'] === 'RANKED_SOLO_5x5',
    );
    return soloRankResult.length === 0 ? false : soloRankResult;
  }
}