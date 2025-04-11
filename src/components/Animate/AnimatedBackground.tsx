'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
 faSchool,faPencilAlt,faUniversity,   faAppleAlt,   faBookReader,   faClipboard,  faBrain,   faFlask,   faLightbulb,   faRuler,   faRulerCombined,   faPencilRuler,   faMicroscope,   faGlobe,   faFileAlt,   faFileCode ,  faAtom,faChalkboardTeacher,faGraduationCap,faLaptop,  faBook,faChalkboard, faCalculator, faUserGraduate, faTheaterMasks, faPalette, 
  faMusic, faArchive, faCertificate, faBookOpen, faDraftingCompass, 
  faChalkboardUser, faKeyboard, faInfinity, faProjectDiagram, faHourglassHalf,
  faFile, faFilePdf, faFileWord, faFilePowerpoint, faCode, faPython, faJava,
  faJavascript, faHtml5, faCss3, faC, faCpp, faPhp, faRuby, faDatabase, faServer,
  faNetworkWired, faCloud, faCloudDownload, faCloudUpload, faFileExcel, faFileImage, 
  faFileArchive, faFileAudio, faFileVideo, faFileMedical, faFileInvoice, faFileSignature,
  faFileInvoiceDollar, faFileSpreadsheet, faFileCsv, faFileMarkdown, faFileDownload, faFileUpload,
  faFileCirclePlus, faFileCircleMinus, faFileCircleInfo, faFileCircleCheck, faFileCircleExclamation,
  faFileCircleQuestion, faFileCircleEllipsisV, faFileCircleEllipsisH
} from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'

// Constants for animation
const ANIMATION_DURATION = 90
const RANDOM_FACTOR = 105

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
  { type: 'fa', icon: faPencilAlt, tooltip: "Writing: Expressing ideas and creativity." },
  { type: 'fa', icon: faUniversity, tooltip: "University: Higher learning and research." },
  { type: 'fa', icon: faAppleAlt, tooltip: "Apple: A symbol of innovation and technology." },
  { type: 'fa', icon: faBookReader, tooltip: "Reading: Engaging with knowledge and stories." },
  { type: 'fa', icon: faClipboard, tooltip: "Information: Gathering and organizing data." },
  { type: 'fa', icon: faBrain, tooltip: "Intelligence: The power of thought and reasoning." },
  { type: 'fa', icon: faFlask, tooltip: "Science: Discovering and exploring the world." },
  { type: 'fa', icon: faLightbulb, tooltip: "Inspiration: Bright ideas and creative solutions." },
  { type: 'fa', icon: faRuler, tooltip: "Measurement: Accuracy and precision." },
  { type: 'fa', icon: faRulerCombined, tooltip: "Design: Combining form and function." },
  { type: 'fa', icon: faPencilRuler, tooltip: "Drawing: Sketching and visualization." },
  { type: 'fa', icon: faMicroscope, tooltip: "Research: Exploring the microcosm." },
  { type: 'fa', icon: faGlobe, tooltip: "Global: Connecting with the world." },
  { type: 'fa', icon: faAtom, tooltip: "Physics: Understanding the building blocks of matter." },
  { type: 'fa', icon: faCalculator, tooltip: "Math: The language of science and engineering." },
  { type: 'fa', icon: faUserGraduate, tooltip: "Student: Eager to learn and grow." },
  { type: 'fa', icon: faTheaterMasks, tooltip: "Arts: Expressing creativity and imagination." },
  { type: 'fa', icon: faPalette, tooltip: "Color: A fundamental element of design." },
  { type: 'fa', icon: faMusic, tooltip: "Music: A universal language of emotion." },
  { type: 'fa', icon: faArchive, tooltip: "Storage: Organizing and preserving information." },
  { type: 'fa', icon: faCertificate, tooltip: "Achievement: Recognition of accomplishments." },
  { type: 'fa', icon: faBookOpen, tooltip: "Knowledge: Opening up new possibilities." },
  { type: 'fa', icon: faDraftingCompass, tooltip: "Navigation: Finding direction and purpose." },
  { type: 'fa', icon: faChalkboardUser, tooltip: "Tutor: Guiding and supporting learning." },
  { type: 'fa', icon: faKeyboard, tooltip: "Coding: Building the future with technology." },
  { type: 'fa', icon: faInfinity, tooltip: "Potential: Endless possibilities." },
  { type: 'fa', icon: faProjectDiagram, tooltip: "Planning:  Organizing and visualizing projects." },
  { type: 'fa', icon: faHourglassHalf, tooltip: "Time:  A valuable resource." },
  { type: 'fa', icon: faFile, tooltip: "General Document:  Files of various types." },
  { type: 'fa', icon: faFileAlt, tooltip: "Alternative File:  Files with alternative formats." },
  { type: 'fa', icon: faFileCode, tooltip: "Code File:  Source code files." },
  { type: 'fa', icon: faFilePdf, tooltip: "PDF Document:  Portable Document Format files." },
  { type: 'fa', icon: faFileWord, tooltip: "Word Document:  Microsoft Word files." },
  { type: 'fa', icon: faFilePowerpoint, tooltip: "PowerPoint Presentation:  Microsoft PowerPoint files." },
  { type: 'fa', icon: faCode, tooltip: "Code:  Programming languages in general." },
  { type: 'fa', icon: faPython, tooltip: "Python:  A popular programming language." },
  { type: 'fa', icon: faJava, tooltip: "Java:  A robust programming language." },
  { type: 'fa', icon: faJavascript, tooltip: "JavaScript:  A versatile scripting language." },
  { type: 'fa', icon: faHtml5, tooltip: "HTML5:  The language of the web." },
  { type: 'fa', icon: faCss3, tooltip: "CSS3:  Styling the web." },
  { type: 'fa', icon: faC, tooltip: "C:  A powerful and efficient programming language." },
  { type: 'fa', icon: faCpp, tooltip: "C++:  An object-oriented programming language." },
  { type: 'fa', icon: faPhp, tooltip: "PHP:  A server-side scripting language." },
  { type: 'fa', icon: faRuby, tooltip: "Ruby:  A dynamic programming language." },
  { type: 'fa', icon: faDatabase, tooltip: "Database:  Storing and managing data." },
  { type: 'fa', icon: faServer, tooltip: "Server:  Hosting applications and services." },
  { type: 'fa', icon: faNetworkWired, tooltip: "Network:  Connecting devices and systems." },
  { type: 'fa', icon: faCloud, tooltip: "Cloud:  Remote computing and storage." },
  { type: 'fa', icon: faCloudDownload, tooltip: "Download:  Getting data from the cloud." },
  { type: 'fa', icon: faCloudUpload, tooltip: "Upload:  Sending data to the cloud." },
  { type: 'fa', icon: faFileExcel, tooltip: "Excel Spreadsheet:  Microsoft Excel files." },
  { type: 'fa', icon: faFileImage, tooltip: "Image File:  Image files like JPG, PNG, GIF." },
  { type: 'fa', icon: faFileArchive, tooltip: "Archive File:  Compressed files like ZIP, RAR." },
  { type: 'fa', icon: faFileAudio, tooltip: "Audio File:  Audio files like MP3, WAV." },
  { type: 'fa', icon: faFileVideo, tooltip: "Video File:  Video files like MP4, AVI." },
  { type: 'fa', icon: faFileCode, tooltip: "Code File:  Source code files." },
  { type: 'fa', icon: faFileMedical, tooltip: "Medical Document:  Files related to healthcare." },
  { type: 'fa', icon: faFileInvoice, tooltip: "Invoice Document:  Files related to billing." },
  { type: 'fa', icon: faFileSignature, tooltip: "Signature Document:  Files with digital signatures." },
  { type: 'fa', icon: faFileInvoiceDollar, tooltip: "Invoice with Dollar:  Billing related to dollars." },
  { type: 'fa', icon: faFileSpreadsheet, tooltip: "Spreadsheet File:  Spreadsheets like CSV, XLSX." },
  { type: 'fa', icon: faFileCsv, tooltip: "CSV File:  Comma-separated values files." },
  { type: 'fa', icon: faFileMarkdown, tooltip: "Markdown File:  Text files formatted with markdown." },
  { type: 'fa', icon: faFileAlt, tooltip: "Alternative File:  Files with alternative formats." },
  { type: 'fa', icon: faFileDownload, tooltip: "File Download:  Downloading a file." },
  { type: 'fa', icon: faFileUpload, tooltip: "File Upload:  Uploading a file." },
  { type: 'fa', icon: faFileCirclePlus, tooltip: "Add File:  Adding a new file." },
  { type: 'fa', icon: faFileCircleMinus, tooltip: "Remove File:  Removing a file." },
  { type: 'fa', icon: faFileCircleInfo, tooltip: "File Information:  Viewing file details." },
  { type: 'fa', icon: faFileCircleCheck, tooltip: "File Approved:  A file that has been approved." },
  { type: 'fa', icon: faFileCircleExclamation, tooltip: "File Warning:  A file with potential issues." },
  { type: 'fa', icon: faFileCircleQuestion, tooltip: "File Question:  A file with unknown information." },
  { type: 'fa', icon: faFileCircleEllipsisV, tooltip: "File Options:  A dropdown with file options." },
  { type: 'fa', icon: faFileCircleEllipsisH, tooltip: "File Options:  A horizontal dropdown with file options." },
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
            textShadow: "0 0 8px #ff00ff", 
            filter: "brightness(120%) drop-shadow(0 0 8px #ff00ff)",
            color: "#ff00ff",
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

const NeonShapes = () => (
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
    {[...Array(20)].map((_, i) => (
      <g key={i} filter="url(#glow)" opacity="0.7">
        <rect
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          width={`${20 + Math.random() * 60}`}
          height="10"
          rx="5"
          fill={`hsl(${280 + Math.random() * 60}, 100%, ${50 + Math.random() * 50}%)`}
          transform={`rotate(${Math.random() * 360} ${Math.random() * 100} ${Math.random() * 100})`}
        />
        {Math.random() > 0.8 && (
          <path
            d="M0,0 V10 H10 V0 H5 V10 M0,5 H10"
            fill="none"
            stroke={`hsl(${280 + Math.random() * 60}, 100%, ${50 + Math.random() * 50}%)`}
            strokeWidth="2"
            transform={`translate(${Math.random() * 100}% ${Math.random() * 100}%) scale(${0.5 + Math.random()})`}
          />
        )}
      </g>
    ))}
  </svg>
)

const AnimatedBackground: React.FC = () => {
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
        background: 'linear-gradient(135deg, #000000 0%, #1e0631 50%, #320c4e 100%)',
      }}
    >
      <NeonShapes />
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

export default AnimatedBackground