import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle, CheckCircle, Flag } from 'lucide-react';

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount,
  flaggedCount,
  isSubmitting,
}) {
  const unanswered = totalQuestions - answeredCount;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Exam" size="sm">
      <div className="text-center py-2">
        {unanswered > 0 ? (
          <div className="w-14 h-14 rounded-2xl bg-warning-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-warning-600" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-success-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-success-600" />
          </div>
        )}

        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {unanswered > 0 ? 'Are you sure?' : 'Ready to submit?'}
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg text-sm">
            <span className="text-slate-600">Total questions</span>
            <span className="font-semibold">{totalQuestions}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-success-50 rounded-lg text-sm">
            <span className="text-success-700">Answered</span>
            <span className="font-semibold text-success-700">{answeredCount}</span>
          </div>
          {unanswered > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-warning-50 rounded-lg text-sm">
              <span className="text-warning-700">Unanswered</span>
              <span className="font-semibold text-warning-700">{unanswered}</span>
            </div>
          )}
          {flaggedCount > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-accent-50 rounded-lg text-sm">
              <span className="flex items-center gap-1.5 text-accent-700">
                <Flag size={14} /> Flagged
              </span>
              <span className="font-semibold text-accent-700">{flaggedCount}</span>
            </div>
          )}
        </div>

        {unanswered > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            You have <strong>{unanswered}</strong> unanswered question{unanswered > 1 ? 's' : ''}.
            Unanswered questions will be marked as incorrect.
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Go Back
          </Button>
          <Button fullWidth onClick={onConfirm} loading={isSubmitting}>
            Submit Exam
          </Button>
        </div>
      </div>
    </Modal>
  );
}
