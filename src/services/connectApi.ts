import { apiClient } from './apiClient';
import type { CreateJobRequestPayload, JobRequestDto } from '../types';

export function createJobRequest(data: CreateJobRequestPayload): Promise<JobRequestDto> {
  return apiClient.post<JobRequestDto>('/api/job-requests', data);
}
