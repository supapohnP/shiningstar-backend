import {
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) { }

  async getCache(key: string): Promise<any> {
    const cachedData = await this.cacheService.get<{ data: string }>(
      key,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      const dataDecode = Buffer.from(cachedData.data, 'base64').toString();
      return JSON.parse(dataDecode);
    }
  }

  async saveCache(key: string, value: any, durationSecs: number): Promise<void> {
    return this.cacheService.set(key, value, durationSecs);
  }
}
