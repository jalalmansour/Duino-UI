'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserSecret,
  faLock,
  faUnlock,
  faKey,
  faShield,
  faShieldAlt,
  faFingerprint,
  faBug,
  faLaptopCode,
  faExclamationTriangle,
  faUserLock,
  faSkull,
  faVirus,
  faVirusSlash,
  faBomb,
  faDatabase,
  faShieldVirus,
  faMask,
  faServer,
  faGavel,
  faHandcuffs,
  faBadge,
  faGun,
  faBalanceScale,
  faExclamationCircle,
  faHammer,
  faEye,
  faEyeSlash,
  faSiren,
  faSpider,
  faNetworkWired,
  faSatelliteDish,
  faExclamationExclamation,
  faSkullCrossbones,
  faRadiation,
} from '@fortawesome/free-solid-svg-icons';

// Brands icons
import {
  faTux,
  faUbuntu,
  faFedora,
  faKaliLinux,
  faBlackArch,
  faWindows,
  faApple,
  faAndroid,
  faDebian,
  faRedHat,
  faCentos,
  faArchLinux,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

// Constants for animation
const ANIMATION_DURATION = 90;
const RANDOM_FACTOR = 105;

const icons = [
  // Operating Systems Icons
  { type: 'fa', icon: faTux, tooltip: "Tux: The official mascot of Linux." },
  { type: 'fa', icon: faUbuntu, tooltip: "Ubuntu: A popular Linux distribution for desktops and servers." },
  { type: 'fa', icon: faFedora, tooltip: "Fedora: Linux distribution based on Red Hat." },
  { type: 'fa', icon: faKaliLinux, tooltip: "Kali Linux: Linux distribution for penetration testing." },
  { type: 'fa', icon: faBlackArch, tooltip: "BlackArch: Security-focused Arch Linux distribution." },
  { type: 'fa', icon: faWindows, tooltip: "Windows: Microsoft’s proprietary operating system." },
  { type: 'fa', icon: faApple, tooltip: "macOS: Apple's Unix-based desktop operating system." },
  { type: 'fa', icon: faAndroid, tooltip: "Android: Linux-based operating system for mobile devices." },
  { type: 'fa', icon: faDebian, tooltip: "Debian: A Linux distribution known for its stability and flexibility." },
  { type: 'fa', icon: faRedHat, tooltip: "Red Hat: Linux distribution for enterprise environments." },
  { type: 'fa', icon: faCentos, tooltip: "CentOS: Community-driven enterprise-class Linux distribution." },
  { type: 'fa', icon: faArchLinux, tooltip: "Arch Linux: A lightweight and flexible Linux distribution." },

  { type: 'fa', icon: faUserSecret, tooltip: "Hacker: Masking identity and intentions." },
  { type: 'fa', icon: faLock, tooltip: "Security: Locked and protected information." },
  { type: 'fa', icon: faUnlock, tooltip: "Breach: Unlocked or compromised security." },
  { type: 'fa', icon: faKey, tooltip: "Encryption: Secure access to information." },
  { type: 'fa', icon: faShield, tooltip: "Defense: Protection against threats." },
  { type: 'fa', icon: faShieldAlt, tooltip: "Security: Additional protection measures." },
  { type: 'fa', icon: faFingerprint, tooltip: "Biometrics: Identity verification and security." },
  { type: 'fa', icon: faBug, tooltip: "Vulnerability: Software flaw or security exploit." },
  { type: 'fa', icon: faLaptopCode, tooltip: "Hacking: Programming or exploiting systems." },
  { type: 'fa', icon: faExclamationTriangle, tooltip: "Warning: Potential security threat or danger." },
  { type: 'fa', icon: faUserLock, tooltip: "Secured User: Locked and authenticated account." },
  { type: 'fa', icon: faSkull, tooltip: "Danger: Death or malicious activity." },
  { type: 'fa', icon: faVirus, tooltip: "Malware: Virus or harmful software." },
  { type: 'fa', icon: faVirusSlash, tooltip: "Protected: Safe from malware and viruses." },
  { type: 'fa', icon: faBomb, tooltip: "Cyber Attack: Destruction or damage to systems." },
  { type: 'fa', icon: faDatabase, tooltip: "Data: Information storage or database system." },
  { type: 'fa', icon: faShieldVirus, tooltip: "Firewall: Protection against viruses and cyber threats." },
  { type: 'fa', icon: faMask, tooltip: "Anonymous: Hidden identity or masked intentions." },
  { type: 'fa', icon: faServer, tooltip: "Servers: Data hosting and network operations." },
  { type: 'fa', icon: faGavel, tooltip: "Law: Justice, legal enforcement or judiciary." },
  { type: 'fa', icon: faHandcuffs, tooltip: "Arrest: Detainment by law enforcement." },
  { type: 'fa', icon: faBadge, tooltip: "Police: Authority and law enforcement." },
  { type: 'fa', icon: faGun, tooltip: "Weapons: Firearms or violent crimes." },
  { type: 'fa', icon: faBalanceScale, tooltip: "Justice: Weighing fairness and law." },
  { type: 'fa', icon: faExclamationCircle, tooltip: "Alert: Urgent notice or issue." },
  { type: 'fa', icon: faHammer, tooltip: "Investigation: Legal or forensic action." },
  { type: 'fa', icon: faEye, tooltip: "Surveillance: Watching or monitoring activity." },
  { type: 'fa', icon: faEyeSlash, tooltip: "Privacy: Hidden or obscured information." },
  { type: 'fa', icon: faSiren, tooltip: "Emergency: Alert for immediate danger or crime." },
  { type: 'fa', icon: faSpider, tooltip: "Web: Networks and cyber threats." },
  { type: 'fa', icon: faNetworkWired, tooltip: "Networks: Communication or internet infrastructure." },
  { type: 'fa', icon: faSatelliteDish, tooltip: "Surveillance: Remote monitoring or communications." },
  { type: 'fa', icon: faExclamationExclamation, tooltip: "Critical: Severe error or critical situation." },
  { type: 'fa', icon: faSkullCrossbones, tooltip: "Fatal: Deadly exploit or malicious threat." },
  { type: 'fa', icon: faRadiation, tooltip: "Hazard: Exposure to harmful or dangerous content." },
];
// Tooltip component
const Tooltip = ({ content, children }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1">
      {content}
      <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
      </svg>
    </div>
  </div>
)

const AnimatedIcon = ({ icon, index, clickedIcon, setClickedIcon }) => {
  const animationProps = useMemo(() => ({
    x: [
      `${Math.random() * RANDOM_FACTOR}vw`,
      `${Math.random() * RANDOM_FACTOR}vw`,
      `${Math.random() * RANDOM_FACTOR}vw`,
    ],
    y: [
      `${Math.random() * RANDOM_FACTOR}vh`,
      `${Math.random() * RANDOM_FACTOR}vh`,
      `${Math.random() * RANDOM_FACTOR}vh`,
    ],
    rotate: [0, 360, 720],
  }), [])

  return (
    <motion.div
      className="absolute"
      initial={{
        x: `${Math.random() * RANDOM_FACTOR}vw`,
        y: `${Math.random() * RANDOM_FACTOR}vh`,
      }}
      animate={animationProps}
      transition={{
        duration: ANIMATION_DURATION + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Tooltip content={icon.tooltip}>
        <motion.div
          className={`text-white opacity-50 cursor-default select-none m-[10px] px-[3px] py-0 transition-all duration-1000 hover:duration-300 ${clickedIcon === index ? 'animate-pulse' : ''}`}
          style={{ filter: 'brightness(0)' }}
          onClick={() => setClickedIcon(index)}
          whileHover={{ 
            scale: 4.1,
            textShadow: "0 0 8px #ff0000", 
            filter: "brightness(120%) drop-shadow(0 0 8px #ff0000)",
            color: "#ff0000",
            borderRadius: "50%"
          }}
          whileTap={{ scale: 0.9 }}
        >
          {icon.type === 'fa' ? (
            <FontAwesomeIcon icon={icon.icon} className="w-8 h-8" />
          ) : (
            <Image src={icon.src} width={50} height={38} alt={icon.alt} />
          )}
        </motion.div>
      </Tooltip>
    </motion.div>
  )
}

const CyberSecurityBackground = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Binary code background */}
    {[...Array(60)].map((_, i) => (
      <text
        key={`binary-${i}`}
        x={`${Math.random() * 100}%`}
        y={`${Math.random() * 100}%`}
        fill="#00ff00"
        fontSize="13"
        opacity="0.16"
        filter="url(#glow)"
      >
        {Math.random().toString(2).substr(2, 8)}
      </text>
    ))}
    
{/* Network connections */}
{[...Array(20)].map((_, i) => {
  // Determine color based on index
  const color = i % 2 === 0 ? "#00ff00" : "#ff0000"; // Green for even indices, Red for odd

  return (
    <line
      key={`line-${i}`}
      x1={`${Math.random() * 100}%`}
      y1={`${Math.random() * 100}%`}
      x2={`${Math.random() * 100}%`}
      y2={`${Math.random() * 100}%`}
      stroke={color}
      strokeWidth="0.5"
      opacity="0.2"
    >
      <animate
        attributeName="opacity"
        values="0.2;0.5;0.2"
        dur="4s"
        repeatCount="indefinite"
      />
    </line>
  );
})}

    
    {/* Cyber security symbols */}
    {[...Array(10)].map((_, i) => (
      <g key={`symbol-${i}`} transform={`translate(${Math.random() * 100}%, ${Math.random() * 100}%)`}>
        <path
          d="M10,0 L0,5 L10,10 L20,5 Z"
          fill="none"
          stroke="#00ff00"
          strokeWidth="1"
          opacity="0.3"
          filter="url(#glow)"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    ))}
  </svg>
)

const AnimatedBackgroundWorm: React.FC = () => {
  const [clickedIcon, setClickedIcon] = useState<number | null>(null)

  useEffect(() => {
    if (clickedIcon !== null) {
      const timer = setTimeout(() => setClickedIcon(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [clickedIcon])

  return (
    <div 
      className="absolute inset-0 overflow-hidden z-[-1]"
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #001a00 50%, #003300 100%)',
      }}
    >
      <CyberSecurityBackground />
      <AnimatePresence>
        {icons.map((icon, index) => (
          <AnimatedIcon
            key={index}
            icon={icon}
            index={index}
            clickedIcon={clickedIcon}
            setClickedIcon={setClickedIcon}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedBackgroundWorm;