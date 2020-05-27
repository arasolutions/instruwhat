import { Level } from '../enums/level.enum'
import { Family } from '../enums/family.enum'

export interface Score {
  id: number;
  name: string;
  score: number;
  date: Date;
  family: Family;
  level: Level;
  nbQuestions: number;
}
