import {Injectable} from "@nestjs/common";
import {createClient, RedisClientType} from "redis";

@Injectable()
export class RedisService {
  private _client: RedisClientType;
  constructor() {
    const init = async () =>
      createClient()
        .on('error', (err) => {
          console.error(err);
        })
        .connect();

    init().then((client: any) => {
      this._client = client;
      console.info('Connected to redis');
    });

  }
  get client() {
    return this._client;
  }
}