import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Constants } from '../../common/Constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.APP_ENV;
    if (env === Constants.dev || env === Constants.testing) {
      this.envConfig =
        env === 'testing'
          ? dotenv.parse(fs.readFileSync('.env.testing'))
          : dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    const env = process.env.APP_ENV;
    if (env === Constants.dev || env === Constants.testing) {
      return this.envConfig[key];
    }
    return process.env[key] || '';
  }

  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }
}
