import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

type TimeResult = {
  time: Date;
};

@Injectable()
export class AppService {
  constructor(private db: DatabaseService) {}

  async getHello(): Promise<TimeResult> {
    const result = await this.db.query('SELECT NOW() as time');

    return result.rows[0] as TimeResult;
  }
}
