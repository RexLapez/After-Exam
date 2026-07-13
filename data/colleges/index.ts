import type { CollegeData } from '@/types/College';
import { aiims_delhi } from './aiims-delhi';
import { manipal } from './manipal';
import { vit } from './vit';
import { bits_pilani } from './bits-pilani';
import { jamia_hamdard } from './jamia-hamdard';
import { cmc_vellore } from './cmc-vellore';
import { ict_mumbai } from './ict-mumbai';
import { delhi_university } from './delhi-university';
import { bhu } from './bhu';
import { curaj } from './curaj';

const allColleges: CollegeData[] = [
  aiims_delhi,
  manipal,
  vit,
  bits_pilani,
  jamia_hamdard,
  cmc_vellore,
  ict_mumbai,
  delhi_university,
  bhu,
  curaj,
];

export const collegeRegistry = new Map<string, CollegeData>();
allColleges.forEach(c => collegeRegistry.set(c.id, c));

export function getCollegesByIds(ids: string[]): CollegeData[] {
  return ids.map(id => collegeRegistry.get(id)).filter(Boolean) as CollegeData[];
}
