import { motion } from "framer-motion";

export const AbuseNotification = ({ offenderName, onClose, detected }) => {
  const isAbusive = detected;          // true → abuse confirmed | false → no abuse

  /* pick colours + text based on outcome */
  const bgFrom   = isAbusive ? "from-red-500"  : "from-emerald-500";
  const bgTo     = isAbusive ? "to-red-700"    : "to-emerald-700";
  const barColor = isAbusive ? "bg-white/80"   : "bg-white/80";
  const title    = isAbusive ? "Abuse Detected!" : "No Abuse Found";
  const body     = isAbusive
    ? `${offenderName} used abusive language.\nHonor score -1`
    : `${offenderName} did not violate our policies.\nPlease avoid false reports – repeated misuse may affect your honor score.`;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className={`fixed bottom-6 right-6 z-50 w-80 rounded-lg bg-gradient-to-br ${bgFrom} ${bgTo} shadow-xl`}
    >
      <div className="flex items-start p-4">
        {/* icon */}
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isAbusive ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
                 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5 2a9 9 0 11-18
                 0 9 9 0 0118 0z"
              />
            )}
          </svg>
        </div>

        {/* text */}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-red-100">
            {body}
          </p>
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 rounded-md text-red-200 hover:text-white focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10
               8.586l4.293-4.293a1 1 0 111.414
               1.414L11.414 10l4.293 4.293a1 1 0
               01-1.414 1.414L10 11.414l-4.293
               4.293a1 1 0 01-1.414-1.414L8.586
               10 4.293 5.707a1 1 0
               010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* countdown bar */}
      <div className="h-1 bg-black/20">
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: "linear" }}
          className={`origin-left h-full ${barColor}`}
        />
      </div>
    </motion.div>
  );
};
