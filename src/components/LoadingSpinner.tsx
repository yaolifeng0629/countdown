import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-40 h-40"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          
          {/* Spinning arc */}
          <motion.path
            d="M50 5 A45 45 0 0 1 95 50"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformOrigin: "center"
            }}
          />

          {/* Clock hands */}
          <motion.line
            x1="50"
            y1="50"
            x2="50"
            y2="25"
            stroke="#FF6B6B"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformOrigin: "50% 50%"
            }}
          />
          
          <motion.line
            x1="50"
            y1="50"
            x2="75"
            y2="50"
            stroke="#4ECDC4"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformOrigin: "50% 50%"
            }}
          />

          {/* Center dot */}
          <circle
            cx="50"
            cy="50"
            r="3"
            fill="white"
          />

          {/* Decorative dots */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <motion.circle
              key={angle}
              cx={50 + 40 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 40 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="white"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: angle / 360
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
