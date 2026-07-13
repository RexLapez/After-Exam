import type { CareerData } from '@/types/Career';
import { research_scientist } from './research-scientist';
import { clinical_research } from './clinical-research';
import { pharma_manager } from './pharma-manager';

const allCareers: CareerData[] = [research_scientist, clinical_research, pharma_manager];

export const careerRegistry = new Map<string, CareerData>();
allCareers.forEach(c => careerRegistry.set(c.id, c));
