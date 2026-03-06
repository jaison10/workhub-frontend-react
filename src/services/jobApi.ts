import { apiClient } from './apiClient';
import type { Job } from '../types';

export function fetchEmployerJobs(employerId: string): Promise<Job[]> {
  return apiClient.get<Job[]>(`/api/jobs/employer/${employerId}`);
}
