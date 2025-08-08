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
  size = 250,
  strokeWidth = 12,
  color = '#12b695',
  label,
  status
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const duration = 4000; // 4 seconds (slower)
    const steps = 80; // More steps for smoother animation
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

  // choose color based on status
  const getStatusColor = (): string => {
    const s = status.toLowerCase();
    if (s.includes('extremely')) return '#7f1d1d';
    if (s.includes('severe')) return '#ef4444';
    if (s.includes('moderate')) return '#f97316';
    if (s.includes('mild')) return '#f59e0b';
    if (s.includes('normal')) return '#10b981';
    return color;
  };

  // Calculate color based on animation progress
  const getAnimatedColor = (): string => {
    const progress = animatedPercentage / percentage;
    const finalColor = getStatusColor();
    
    // Start with green and transition to the final color
    const startColor = '#10b981'; // Green
    const endColor = finalColor;
    
    if (progress <= 0.3) {
      // First 30%: Green to Yellow
      const ratio = progress / 0.3;
      return interpolateColor(startColor, '#f59e0b', ratio);
    } else if (progress <= 0.6) {
      // 30% to 60%: Yellow to Orange
      const ratio = (progress - 0.3) / 0.3;
      return interpolateColor('#f59e0b', '#f97316', ratio);
    } else if (progress <= 0.8) {
      // 60% to 80%: Orange to Red
      const ratio = (progress - 0.6) / 0.2;
      return interpolateColor('#f97316', '#ef4444', ratio);
    } else {
      // 80% to 100%: Red to final color
      const ratio = (progress - 0.8) / 0.2;
      return interpolateColor('#ef4444', endColor, ratio);
    }
  };

  // Helper function to interpolate between two colors
  const interpolateColor = (color1: string, color2: string, ratio: number): string => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const ringColor = getAnimatedColor();

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
           stroke={ringColor}
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
      <div className="progress-text" aria-hidden="false" role="img" aria-label={`${label} ${animatedPercentage} percent`}>
        <span className="percentage" aria-live="polite">{animatedPercentage}%</span>
        <span className="label">{label}</span>
        <span className={`status status-${statusClass}`}>{status}</span>
      </div>
    </div>
  );
};

export default CircularProgress; 