
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastState } from '../state/useToastStore';

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200", 
    text: "text-red-800",
    icon: <AlertCircle className="w-5 h-5 text-red-500" />
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800", 
    icon: <Info className="w-5 h-5 text-blue-500" />
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
  },
};

export default function Toast() {
  const { toast, hideToast } = useToastState();
  
  if (!toast) return null;
  
  const styles = toastStyles[toast.type || "info"];
  
  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full
      ${styles.bg} ${styles.border} ${styles.text}
      border rounded-lg p-4 shadow-lg
      transform transition-all duration-300 ease-in-out
      translate-x-0 opacity-100
    `}>
      <div className="flex items-start gap-3">
        {styles.icon}
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={hideToast}
          className={`
            ${styles.text} hover:opacity-70 transition-opacity
            flex-shrink-0 p-1 rounded-full hover:bg-gray-100
          `}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}