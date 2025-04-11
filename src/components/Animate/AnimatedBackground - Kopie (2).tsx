"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, faChalkboard, faChalkboardTeacher, faGraduationCap, 
  faLaptop, faSchool, faPencilAlt, faUniversity, faAppleAlt, 
  faBookReader, faClipboard, faBrain, faFlask, faLightbulb, 
  faRuler, faRulerCombined, faPencilRuler, faMicroscope, faGlobe, 
  faAtom, faCalculator, faUserGraduate, faTheaterMasks, faPalette, 
  faMusic, faArchive, faCertificate, faBookOpen, faDraftingCompass, 
  faChalkboardUser, faKeyboard, faInfinity, faProjectDiagram, faHourglassHalf 
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Constants for animation
const ANIMATION_DURATION = 90;
const RANDOM_FACTOR = 105;

// Icon data
const icons = [
  { type: 'fa', icon: faBook, tooltip: "Literature: The gateway to imagination and knowledge." },
  { type: 'img', src: "/images/UMI.ico", alt: "UMI logo", tooltip: "UMI: University of Excellence" },
  { type: 'fa', icon: faChalkboard, tooltip: "Education: The foundation of progress." },
  { type: 'fa', icon: faChalkboardTeacher, tooltip: "Teaching: Shaping minds for the future." },
  { type: 'img', src: "/images/ENSAM.ico", alt: "ENSAM logo", tooltip: "ENSAM: Engineering Excellence" },
  { type: 'fa', icon: faGraduationCap, tooltip: "Graduation: A milestone of achievement." },
  { type: 'img', src: "/images/EST2.ico", alt: "EST2 logo", tooltip: "EST: Technology and Innovation" },
  { type: 'fa', icon: faLaptop, tooltip: "Technology: Powering the digital age." },
  { type: 'fa', icon: faSchool, tooltip: "School: Where learning begins." },
  { type: 'img', src: "/images/duino3.ico", alt: "Duino logo", tooltip: "UMI-Duino: Empowering makers and creators" },
  { type: 'fa', icon: faPencilAlt, tooltip: "Writing: Expressing ideas through words." },
  { type: 'fa', icon: faUniversity, tooltip: "University: Higher learning and research." },
  { type: 'fa', icon: faAppleAlt, tooltip: "Health: Nurturing body and mind." },
  { type: 'fa', icon: faBookReader, tooltip: "Reading: Opening doors to new worlds." },
  { type: 'img', src: "/images/E-Leraning.icon", alt: "E-Learning logo", tooltip: "E-Learning: Education without boundaries" },
  { type: 'fa', icon: faClipboard, tooltip: "Organization: The key to efficiency." },
  { type: 'fa', icon: faBrain, tooltip: "Neuroscience: Exploring the human mind." },
  { type: 'fa', icon: faFlask, tooltip: "Chemistry: The science of matter." },
  { type: 'fa', icon: faLightbulb, tooltip: "Ideas: Sparking innovation and creativity." },
  { type: 'fa', icon: faRuler, tooltip: "Measurement: Precision in science and engineering." },
  { type: 'fa', icon: faRulerCombined, tooltip: "Engineering: Designing the future." },
  { type: 'fa', icon: faPencilRuler, tooltip: "Design: Where art meets function." },
  { type: 'fa', icon: faMicroscope, tooltip: "Biology: The study of life." },
  { type: 'fa', icon: faGlobe, tooltip: "Geography: Understanding our world." },
  { type: 'fa', icon: faAtom, tooltip: "Science: Unlocking the mysteries of the universe." },
  { type: 'fa', icon: faCalculator, tooltip: "Mathematics: The universal language." },
  { type: 'fa', icon: faUserGraduate, tooltip: "Graduate: A symbol of achievement and learning." },
  { type: 'fa', icon: faTheaterMasks, tooltip: "Drama: Creativity through performing arts." },
  { type: 'fa', icon: faPalette, tooltip: "Art: Expressing creativity and vision." },
  { type: 'fa', icon: faMusic, tooltip: "Music: Harmony, rhythm, and learning." },
  { type: 'fa', icon: faArchive, tooltip: "History: Preserving knowledge and records." },
  { type: 'fa', icon: faCertificate, tooltip: "Certification: Proof of expertise and knowledge." },
  { type: 'fa', icon: faBookOpen, tooltip: "Reading: Expanding horizons." },
  { type: 'fa', icon: faDraftingCompass, tooltip: "Design: Precision in engineering and architecture." },
  { type: 'fa', icon: faChalkboardUser, tooltip: "Interactive Teaching: Engaging with students." },
  { type: 'fa', icon: faKeyboard, tooltip: "Typing: Essential skill in the digital age." },
  { type: 'fa', icon: faInfinity, tooltip: "Mathematics: Endless possibilities in problem-solving." },
  { type: 'fa', icon: faProjectDiagram, tooltip: "Planning: Visualizing and organizing ideas." },
  { type: 'fa', icon: faHourglassHalf, tooltip: "Time Management: Efficient use of time in learning." },
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
);

// AnimatedBackground component
const AnimatedBackground: React.FC<{ type: string }> = ({ type }) => {
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);

  useEffect(() => {
    if (clickedIcon !== null) {
      const timer = setTimeout(() => setClickedIcon(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [clickedIcon]);

  return (
     <div 
      className={`absolute inset-0 overflow-hidden z-[-1]`}
      style={{ 
        background: "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(14, 72, 222) 15.2%, rgb(3, 22, 65) 99.3%)" 
      }}
    >
	{icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${Math.random() * RANDOM_FACTOR}vw`,
            y: `${Math.random() * RANDOM_FACTOR}vh`,
          }}
          animate={{
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
          }}
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
                textShadow: "0 0 8px #ff9900", 
                filter: "brightness(120%) drop-shadow(0 0 8px #ff9900)",
                color: "rgb(255, 124, 0)", // Change color to orange on hover
                borderRadius: "50%" // Make it a circle for better gradient effect 
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
      ))}
    </div>
  );
};

export default AnimatedBackground;