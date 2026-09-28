import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useJobContext } from '../context/JobContext';

export const NotificationToast: React.FC = () => {
  const { toast, hideToast } = useJobContext();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full sm:w-auto transition-all duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${
          isSuccess
            ? 'bg-slate-900 text-white border-slate-800'
            : isError
            ? 'bg-rose-900 text-white border-rose-800'
            : 'bg-blue-900 text-white border-blue-800'
        }`}
        role="alert"
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}

        <p className="text-sm font-medium pr-2 text-slate-100">{toast.message}</p>

        <button
          onClick={hideToast}
          className="ml-auto text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
