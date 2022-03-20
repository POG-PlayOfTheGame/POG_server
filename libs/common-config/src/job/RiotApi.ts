import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const api_key = process.env.API_KEY;

export const RiotApiJobs = async (summonerId: string) => {
  const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${api_key}`;

  const res = await axios.get(url);
  return res.data[0];
};