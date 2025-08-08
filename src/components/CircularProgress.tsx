import React, { useEffect, useRef, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  status: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#12b695',
  label,
  status
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = percentage / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPercentage = Math.min(increment * currentStep, percentage);
      setAnimatedPercentage(Math.round(currentPercentage));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  // Convert status to CSS class format (lowercase with hyphens)
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="circular-progress-container">
      <svg
        width={size}
        height={size}
        className="circular-progress"
      >
                 {/* Background circle */}
         <circle
           cx={size / 2}
           cy={size / 2}
           r={radius}
           fill="none"
           stroke="rgba(18, 182, 149, 0.2)"
           strokeWidth={strokeWidth}
         />
         
         {/* Progress circle */}
         <circle
           ref={circleRef}
           cx={size / 2}
           cy={size / 2}
           r={radius}
           fill="none"
           stroke="#12b695"
           strokeWidth={strokeWidth}
           strokeLinecap="round"
           strokeDasharray={strokeDasharray}
           strokeDashoffset={strokeDashoffset}
           style={{
             transition: 'stroke-dashoffset 0.1s ease-out',
             transform: 'rotate(-90deg)',
             transformOrigin: '50% 50%'
           }}
         />
      </svg>
      
      {/* Percentage text */}
      <div className="progress-text">
        <span className="percentage">{animatedPercentage}%</span>
        <span className="label">{label}</span>
        <span className={`status status-${statusClass}`}>{status}</span>
      </div>
    </div>
  );
};

export default CircularProgress; 