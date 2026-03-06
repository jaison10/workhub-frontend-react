import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../common/Modal';
import { Select } from '../common/Select';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { Toast } from '../common/Toast';
import { useToast } from '../../hooks/useToast';
import { useAuthStore } from '../../store/useAuthStore';
import { fetchEmployerJobs } from '../../services/jobApi';
import { createJobRequest } from '../../services/connectApi';
import type { Job, JobRequestWorkType } from '../../types';

interface JobInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: string;
  candidateName: string;
}

const workTypeOptions = [
  { value: 'FullTime', label: 'Full-Time' },
  { value: 'Freelance', label: 'Freelance' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'INR', label: 'INR' },
];

const validationSchema = Yup.object({
  workType: Yup.string()
    .oneOf(['FullTime', 'Freelance'], 'Select a valid work type')
    .required('Work type is required'),
  freelanceHours: Yup.number().when('workType', {
    is: 'Freelance',
    then: (schema) => schema.required('Freelance hours is required').min(1, 'Must be at least 1'),
    otherwise: (schema) => schema.notRequired(),
  }),
  offeredRate: Yup.number()
    .required('Offered rate is required')
    .moreThan(0, 'Rate must be greater than 0'),
  rateCurrency: Yup.string()
    .required('Currency is required')
    .max(3, 'Max 3 characters'),
  linkedJobId: Yup.string().notRequired(),
  message: Yup.string().notRequired(),
});

export const JobInviteModal: React.FC<JobInviteModalProps> = ({
  isOpen,
  onClose,
  candidateId,
  candidateName,
}) => {
  const user = useAuthStore((s) => s.user);
  const { toast, showToast, dismissToast } = useToast();
  const [employerJobs, setEmployerJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user?.id) {
      setLoadingJobs(true);
      fetchEmployerJobs(user.id)
        .then(setEmployerJobs)
        .catch(() => setEmployerJobs([]))
        .finally(() => setLoadingJobs(false));
    }
  }, [isOpen, user?.id]);

  const formik = useFormik({
    initialValues: {
      workType: '' as string,
      freelanceHours: '' as string | number,
      offeredRate: '' as string | number,
      rateCurrency: 'USD',
      linkedJobId: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitError(null);
      try {
        await createJobRequest({
          targetUserId: candidateId,
          workType: values.workType as JobRequestWorkType,
          freelanceHours: values.workType === 'Freelance' ? Number(values.freelanceHours) : undefined,
          offeredRate: Number(values.offeredRate),
          rateCurrency: values.rateCurrency,
          linkedJobId: values.linkedJobId || undefined,
          message: values.message || undefined,
        });
        resetForm();
        showToast(`Job invite sent to ${candidateName}`, 'success');
        onClose();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to send job invite';
        setSubmitError(message);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setSubmitError(null);
    onClose();
  };

  const jobOptions = employerJobs.map((j) => ({ value: j.id, label: j.title }));

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title={`Send Job Invite to ${candidateName}`}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {submitError}
            </div>
          )}

          <Select
            label="Work Type"
            name="workType"
            required
            options={workTypeOptions}
            value={formik.values.workType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.workType ? formik.errors.workType : undefined}
          />

          {formik.values.workType === 'Freelance' && (
            <Input
              label="Freelance Hours"
              name="freelanceHours"
              type="number"
              required
              min={1}
              value={formik.values.freelanceHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.freelanceHours ? formik.errors.freelanceHours : undefined}
            />
          )}

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Input
                label="Offered Rate"
                name="offeredRate"
                type="number"
                required
                min={0}
                step="0.01"
                value={formik.values.offeredRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.offeredRate ? formik.errors.offeredRate : undefined}
              />
            </div>
            <Select
              label="Currency"
              name="rateCurrency"
              required
              options={currencyOptions}
              value={formik.values.rateCurrency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rateCurrency ? formik.errors.rateCurrency : undefined}
            />
          </div>

          <Select
            label="Link to Job"
            name="linkedJobId"
            options={jobOptions}
            value={formik.values.linkedJobId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loadingJobs}
            error={formik.touched.linkedJobId ? formik.errors.linkedJobId : undefined}
          />

          <Textarea
            label="Message"
            name="message"
            rows={3}
            placeholder="Add a personal note to the candidate..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </form>
      </Modal>

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
};
