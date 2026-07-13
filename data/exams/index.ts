import type { ExamData } from '@/types/Exam';
import { neet_ug } from './neet-ug';
import { cuet } from './cuet';
import { jee_main } from './jee-main';
import { gpat } from './gpat';

const allExams: ExamData[] = [neet_ug, cuet, jee_main, gpat];

export const examRegistry = new Map<string, ExamData>();
allExams.forEach(e => examRegistry.set(e.id, e));
