import React, { useEffect, useRef, useState } from 'react';
import soundManager from './utils/soundManager';
import LiveSubscriberCounter from './components/LiveSubscriberCounter';
import EasterEggs from './components/EasterEggs';
import {
  FaDownload,
  FaYoutube,
  FaPlay,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaArrowUp,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaBars,
  FaSearchPlus,
  FaSearchMinus,
  FaMousePointer,
  FaCut,
  FaHandPointer,
  FaVideo,
  FaPaintBrush,
  FaMagic,
  FaAward,
  FaCertificate,
  FaTrophy,
  FaStar,
  FaGraduationCap,
  FaVolumeUp,
  FaVolumeMute,
  FaMusic,
  FaUser,
  FaCode,
  FaReact,
  FaRobot,
  FaBrain,
  FaDesktop,
  FaLaptop,
  FaHeadphones,
  FaUniversity,
  FaCheckCircle,
  FaInfoCircle,
  FaCube,
  FaFilm,
  FaHeart,
  FaRocket,
  FaUsers,
  FaClock
} from 'react-icons/fa';
import {
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiReact,
  SiPython,
  SiFirebase,
  SiMongodb,
  SiNodedotjs,
} from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import GeminiChatbot from './components/GeminiChatbot';
import GalaxyBackground from './components/GalaxyBackground';

// Import images
import thumbnailImg from './assets/Thumbnail.jpg';
import astralProjectionImg from './assets/astral projection thumbfinal.jpg';
import thumbionaliImg from './assets/thumbionali.jpg';
import thumbnailtayaarImg from './assets/thumbnailtayaar.jpg';

gsap.registerPlugin(ScrollTrigger);

// == Config / Assets ==
const CV_LINK = 'https://drive.google.com/file/d/1rr3c2nfwLZ0h7qJ77JLOj3GyTm3BTYMy/view?usp=drive_link'; // Replace with actual CV URL when available
const PROFILE_IMG = 'src/assets/cv/Profilepicture.jpg'; // Professional headshot image
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@iamsyedtaha';
const DEFAULT_GREEN = '#00E676';
// Social links
const LINKEDIN_URL = 'https://www.linkedin.com/in/syed-taha-516b10230/';
const INSTAGRAM_URL = 'https://www.instagram.com/iamsyedtahareal/';
const GITHUB_URL = 'https://github.com/AKAShahsa';
const WHATSAPP_URL = 'https://wa.me/923115929527?text=Hi%20Syed%2C%20I%27m%20interested%20in%20your%20work!';
const PREMIERE_PURPLE = '#9999ff';

const YOUTUBE_EMBEDS = [
  'https://www.youtube.com/embed/VaArvrBhTS0',
  'https://www.youtube.com/embed/xrjGNH66p-g',
  'https://www.youtube.com/embed/sgTM08X-lL8',
  'https://www.youtube.com/embed/Xi7Y1o2rNKo',
  'https://www.youtube.com/embed/A4LKqrPTAp0',
  'https://www.youtube.com/embed/XngZjYrcagU',
  'https://www.youtube.com/embed/3zHCMDsmnss',
  'https://www.youtube.com/embed/6gvKumlGKzk',
];

function SectionTitle({ children, size = 'text-2xl', className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="inline-block relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E676]" />
          <span className={`${size} font-bold`}>{children}</span>
        </div>
        <svg
          className="absolute left-3 right-0 -bottom-2 h-3 w-[calc(100%-0.75rem)]"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,10 C60,0 140,0 200,10" stroke="#00E676" strokeWidth="3" fill="none" />
        </svg>
      </div>
    </div>
  );
}

const PHOTOSHOP_PROJECTS = [
  {
    src: 'https://images.unsplash.com/photo-1520975922284-7b12d2a66f76?auto=format&fit=crop&w=1600&q=60',
    title: 'Color Grade Portrait',
    description: 'Professional portrait color grading with cinematic tones and mood enhancement.'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60',
    title: 'Creative Double Exposure',
    description: 'Artistic double exposure combining urban and natural elements for visual storytelling.'
  },
  {
    src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=60',
    title: 'Product Retouch',
    description: 'Commercial product photography with advanced retouching and shadow enhancement.'
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=60',
    title: 'Cinematic Poster Design',
    description: 'Movie poster concept with dramatic lighting and professional typography.'
  },
  {
    src: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=60',
    title: 'YouTube Thumbnail Design',
    description: 'Eye-catching thumbnail optimized for CTR with bold text and visual hierarchy.'
  },
  {
    src: 'https://images.unsplash.com/photo-1520974735194-5f73f2b3a52a?auto=format&fit=crop&w=1600&q=60',
    title: 'Portrait Retouching',
    description: 'Professional skin retouching while preserving natural texture and enhancing features.'
  },
];

const SKILLS = [
  { name: 'Adobe Photoshop', years: '3+ yrs', pct: 92, icon: SiAdobephotoshop },
  { name: 'Adobe Premiere', years: '3+ yrs', pct: 90, icon: SiAdobepremierepro },
  { name: 'Adobe After Effects', years: '3+ yrs', pct: 88, icon: SiAdobeaftereffects },
  { name: 'React.js', years: 'Intermediate', pct: 76, icon: SiReact },
  { name: 'Python', years: 'Intermediate', pct: 72, icon: SiPython },
  {
    name: 'Firebase • MongoDB • Node.js',
    years: 'Practical',
    pct: 70,
    icons: [SiFirebase, SiMongodb, SiNodedotjs],
  },
];

// CertificatesCarousel Component
function CertificatesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Certificate data - you can replace these with your actual certificate images
  const certificates = [
    {
      id: 1,
      title: "Adobe Premiere Pro Certification",
      issuer: "Adobe",
      date: "2023",
      image: "https://via.placeholder.com/600x400/063042/00E676?text=Adobe+Premiere+Pro+Certificate",
      description: "Advanced video editing and post-production techniques",
      icon: SiAdobepremierepro,
      color: "#9999ff"
    },
    {
      id: 2,
      title: "Photoshop Expert Certification",
      issuer: "Adobe",
      date: "2023",
      image: "https://via.placeholder.com/600x400/063042/00E676?text=Photoshop+Expert+Certificate",
      description: "Professional photo editing and digital design mastery",
      icon: SiAdobephotoshop,
      color: "#31A8FF"
    },
    {
      id: 3,
      title: "React.js Development",
      issuer: "Meta",
      date: "2024",
      image: "https://via.placeholder.com/600x400/063042/00E676?text=React.js+Development+Certificate",
      description: "Modern web development with React and JavaScript",
      icon: SiReact,
      color: "#61DAFB"
    }
  ];

  const nextCertificate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevCertificate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCertificate();
    } else if (isRightSwipe) {
      prevCertificate();
    }
  };

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextCertificate();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative">
      {/* Header with stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-xl bg-[#041827]/50 border border-[#063042]">
          <div className="flex items-center justify-center mb-2">
            <FaTrophy className="text-2xl text-[#FFD700]" />
          </div>
          <div className="text-2xl font-bold text-white">{certificates.length}</div>
          <div className="text-sm text-gray-400">Certificates</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-[#041827]/50 border border-[#063042]">
          <div className="flex items-center justify-center mb-2">
            <FaGraduationCap className="text-2xl text-[#00E676]" />
          </div>
          <div className="text-2xl font-bold text-white">3+</div>
          <div className="text-sm text-gray-400">Years Learning</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-[#041827]/50 border border-[#063042]">
          <div className="flex items-center justify-center mb-2">
            <FaStar className="text-2xl text-[#FF6B6B]" />
          </div>
          <div className="text-2xl font-bold text-white">Expert</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
      </div>

      {/* Main certificates display */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cert-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 15 L 60 15 M 15 0 L 15 60" stroke="#00E676" strokeWidth="1" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cert-grid)" />
          </svg>
        </div>

        {/* Certificate Stack */}
        <div 
          className="relative w-full max-w-md h-80 cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={nextCertificate}
        >
          {certificates.map((cert, index) => {
            // Calculate position relative to current index
            let position = index - currentIndex;
            if (position < 0) position += certificates.length;
            
            // Stack positioning
            const zIndex = certificates.length - position;
            const rotateZ = position === 0 ? 0 : position === 1 ? -8 : 8;
            const translateY = position * 10;
            const translateX = position === 1 ? -15 : position === 2 ? 15 : 0;
            const scale = position === 0 ? 1 : 0.9;
            const opacity = position === 0 ? 1 : position === 1 ? 0.8 : 0.6;
            
            const IconComponent = cert.icon;
            
            return (
              <div
                key={cert.id}
                className={`absolute inset-0 transition-all duration-600 ease-out will-change-transform ${
                  isAnimating ? 'pointer-events-none' : ''
                }`}
                style={{
                  transform: `
                    translateX(${translateX}px) 
                    translateY(${translateY}px) 
                    rotateZ(${rotateZ}deg) 
                    scale(${scale})
                  `,
                  zIndex,
                  opacity
                }}
              >
                {/* Certificate Card */}
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  {/* Gradient Background */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${cert.color}20, transparent, ${cert.color}10)`
                    }}
                  />
                  
                  {/* Certificate Image */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                        >
                          <IconComponent className="text-xl" style={{ color: cert.color }} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">{cert.issuer} • {cert.date}</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-gray-300">{cert.description}</p>
                    </div>
                  </div>

                  {/* 3D Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
                    style={{
                      boxShadow: `
                        0 8px 32px rgba(0, 230, 118, 0.2),
                        0 2px 8px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prevCertificate(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#041827]/80 border border-[#063042] text-[#00E676] hover:bg-[#063042] transition-all duration-300 backdrop-blur-sm z-10"
          disabled={isAnimating}
        >
          <FaChevronLeft />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); nextCertificate(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#041827]/80 border border-[#063042] text-[#00E676] hover:bg-[#063042] transition-all duration-300 backdrop-blur-sm z-10"
          disabled={isAnimating}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Certificate Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {certificates.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#00E676] scale-125' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-sm text-gray-400">
        <div className="flex items-center justify-center gap-4">
          <span>🖱️ Click to flip</span>
          <span>📱 Swipe on mobile</span>
          <span>⏰ Auto-rotates every 5s</span>
        </div>
      </div>
    </div>
  );
}

// GraphicDesignStack Component
function GraphicDesignStack() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [currentZ, setCurrentZ] = useState(0);
  const [targetZ, setTargetZ] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDesign, setHoveredDesign] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  
  // Create a longer array with duplicates for seamless looping
  const [designs] = useState([
    { 
      src: thumbnailImg, 
      title: 'Cinematic YouTube Thumbnail', 
      description: 'Created for a tech review channel with dramatic lighting and color grading to increase CTR.', 
      alt: 'Cinematic YouTube Thumbnail Design' 
    },
    { 
      src: astralProjectionImg, 
      title: 'Astral Projection Concept Art', 
      description: 'Surreal digital artwork exploring consciousness themes with advanced compositing techniques.', 
      alt: 'Astral Projection Concept Art' 
    },
    { 
      src: thumbionaliImg, 
      title: 'Gaming Channel Branding', 
      description: 'Eye-catching thumbnail design with custom typography and visual effects for a gaming channel.', 
      alt: 'Gaming Channel Branding' 
    },
    { 
      src: thumbnailtayaarImg, 
      title: 'Tech Review Thumbnail', 
      description: 'Clean, modern design with product focus and vibrant color accents to drive engagement.', 
      alt: 'Tech Review Thumbnail' 
    },
    // Duplicate for seamless looping
    { 
      src: thumbnailImg, 
      title: 'Cinematic YouTube Thumbnail', 
      description: 'Created for a tech review channel with dramatic lighting and color grading to increase CTR.', 
      alt: 'Cinematic YouTube Thumbnail Design' 
    },
    { 
      src: astralProjectionImg, 
      title: 'Astral Projection Concept Art', 
      description: 'Surreal digital artwork exploring consciousness themes with advanced compositing techniques.', 
      alt: 'Astral Projection Concept Art' 
    },
    { 
      src: thumbionaliImg, 
      title: 'Gaming Channel Branding', 
      description: 'Eye-catching thumbnail design with custom typography and visual effects for a gaming channel.', 
      alt: 'Gaming Channel Branding' 
    },
    { 
      src: thumbnailtayaarImg, 
      title: 'Tech Review Thumbnail', 
      description: 'Clean, modern design with product focus and vibrant color accents to drive engagement.', 
      alt: 'Tech Review Thumbnail' 
    }
  ]);

  // Smooth animation loop
  const animateToTarget = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startZ = currentZ;
    const startTime = Date.now();
    const duration = 400; // Faster, smoother animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newZ = startZ + (targetZ - startZ) * easeProgress;
      
      setCurrentZ(newZ);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        
        // Handle infinite loop - reset position when needed
        const maxZ = designs.length * 50; // Half the original designs length * 100
        if (Math.abs(newZ) >= maxZ) {
          const resetZ = newZ % maxZ;
          setCurrentZ(resetZ);
          setTargetZ(resetZ);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (targetZ !== currentZ) {
      animateToTarget();
    }
  }, [targetZ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollThreshold = 50; // More responsive

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold || isAnimating) return;
      lastScrollTime = now;
      
      setIsAnimating(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      setTargetZ(prev => prev + direction * 100);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      container.touchStartY = touch.clientY;
      container.touchStartTime = Date.now();
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!container.touchStartY) return;
      
      const touch = e.touches[0];
      const diff = container.touchStartY - touch.clientY;
      const timeDiff = Date.now() - container.touchStartTime;
      
      if (Math.abs(diff) > 30 && timeDiff > 100 && !isAnimating) {
        setIsAnimating(true);
        const direction = diff > 0 ? 1 : -1;
        setTargetZ(prev => prev + direction * 100);
        container.touchStartY = touch.clientY;
        container.touchStartTime = Date.now();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Zoom functionality
  const openZoom = (design, e) => {
    e.stopPropagation();
    setZoomedImage(design);
    setZoomScale(1);
    setZoomPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomScale(1);
    setZoomPosition({ x: 0, y: 0 });
    setIsDragging(false);
    document.body.style.overflow = 'unset'; // Restore background scroll
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev * 1.5, 4));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleZoomReset = () => {
    setZoomScale(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  // Pan functionality for zoomed image
  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomScale <= 1) return;
    
    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;
    
    setZoomPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (zoomScale <= 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setLastPanPoint({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || zoomScale <= 1) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPanPoint.x;
    const deltaY = touch.clientY - lastPanPoint.y;
    
    setZoomPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastPanPoint({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for zoom modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!zoomedImage) return;
      
      switch(e.key) {
        case 'Escape':
          closeZoom();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleZoomReset();
          break;
      }
    };

    if (zoomedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [zoomedImage]);

  return (
    <div className="relative rounded-xl p-6 bg-[#021728]/50 border border-[#063042] overflow-hidden h-[350px] sm:h-[450px] md:h-[600px]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="#00E676" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* 3D Stack Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
      >
        {/* Instructions */}
        <div className="absolute inset-0 flex items-center justify-center text-[#00E676] text-lg pointer-events-none z-10">
          <div className="flex flex-col items-center gap-2 opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Scroll to explore designs</span>
          </div>
        </div>
        
        {/* Design Images */}
        {designs.map((design, index) => {
          const zOffset = -index * 100 + currentZ;
          const yOffset = index * 3 - (currentZ / 100) * 3; // Reduced for smoother movement
          const scale = Math.max(0.5, Math.min(1.2, 1 - Math.abs(zOffset) / 800)); // Better scaling
          const opacity = Math.max(0.2, Math.min(1, 1 - Math.abs(zOffset) / 400)); // Better opacity curve
          const brightness = Math.max(0.6, Math.min(1, 1 - Math.abs(zOffset) / 600)); // Better brightness
          const blur = Math.max(0, Math.abs(zOffset) / 500); // Add blur for depth
          
          // Calculate rotation for more dynamic effect
          const rotateX = Math.sin(index * 0.5) * 2;
          const rotateY = Math.cos(index * 0.5) * 3;
          
          const isVisible = Math.abs(zOffset) < 600; // Only render visible images for performance
          
          if (!isVisible) return null;
          
          return (
            <div
              key={`${index}-${design.title}`}
              className="absolute transition-all duration-300 ease-out will-change-transform group"
              style={{
                left: '50%',
                top: '50%',
                transform: `
                  translate(-50%, -50%) 
                  translateZ(${zOffset}px) 
                  translateY(${yOffset}px) 
                  scale(${scale})
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                `,
                opacity,
                filter: `brightness(${brightness}) blur(${blur}px)`,
                zIndex: Math.round(1000 - Math.abs(zOffset)),
                width: '75%',
                maxWidth: '450px',
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={() => setHoveredDesign(design)}
              onMouseLeave={() => setHoveredDesign(null)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={design.src}
                  alt={design.alt}
                  className="w-full h-auto rounded-lg shadow-2xl border-2 border-[#063042] object-cover transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,230,118,0.3)] cursor-pointer"
                  style={{ 
                    aspectRatio: '16/9',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x450/063042/00E676?text=${encodeURIComponent(design.title)}`;
                  }}
                  onClick={(e) => openZoom(design, e)}
                  draggable={false}
                />
                
                {/* Zoom Overlay Button */}
                <div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={(e) => openZoom(design, e)}
                >
                  <div className="bg-[#00E676]/90 text-[#001313] px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <FaSearchPlus />
                    <span className="hidden sm:inline">View Details</span>
                  </div>
                </div>
                
                {/* Corner Zoom Icon */}
                <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <FaSearchPlus className="text-sm" />
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Design Info Overlay */}
        {hoveredDesign && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#021220] via-[#021220]/90 to-transparent p-6 transition-all duration-300 z-20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{hoveredDesign.title}</h3>
            <p className="text-sm text-gray-300 drop-shadow-md">{hoveredDesign.description}</p>
          </div>
        )}
        
        {/* Navigation Hints */}
        <div className="absolute top-4 right-4 text-xs text-gray-400 opacity-60 pointer-events-none">
          <div className="flex flex-col items-end gap-1">
            <div>🖱️ Scroll to navigate</div>
            <div>📱 Swipe on mobile</div>
          </div>
        </div>
      </div>
      
      {/* Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
          onClick={closeZoom}
        >
          {/* Modal Content */}
          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#021728]/90 backdrop-blur-sm rounded-t-lg">
              <div>
                <h3 className="text-xl font-bold text-white">{zoomedImage.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{zoomedImage.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-[#041827] hover:bg-[#063042] text-white rounded-lg transition-colors"
                  title="Zoom Out (- key)"
                >
                  <FaSearchMinus />
                </button>
                <span className="text-white text-sm px-2">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-[#041827] hover:bg-[#063042] text-white rounded-lg transition-colors"
                  title="Zoom In (+ key)"
                >
                  <FaSearchPlus />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="p-2 bg-[#041827] hover:bg-[#063042] text-white rounded-lg transition-colors"
                  title="Reset Zoom (0 key)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={closeZoom}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors ml-2"
                  title="Close (Esc key)"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            {/* Image Container */}
            <div 
              className="flex-1 overflow-hidden relative bg-[#041827]/50 rounded-b-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="w-full h-full flex items-center justify-center overflow-hidden"
                style={{ 
                  cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
              >
                <img
                  src={zoomedImage.src}
                  alt={zoomedImage.alt}
                  className="max-w-none transition-transform duration-200 select-none"
                  style={{
                    transform: `scale(${zoomScale}) translate(${zoomPosition.x / zoomScale}px, ${zoomPosition.y / zoomScale}px)`,
                    maxHeight: zoomScale <= 1 ? '100%' : 'none',
                    maxWidth: zoomScale <= 1 ? '100%' : 'none'
                  }}
                  draggable={false}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/1200x675/063042/00E676?text=${encodeURIComponent(zoomedImage.title)}`;
                  }}
                />
              </div>
              
              {/* Pan Instructions */}
              {zoomScale > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <FaMousePointer className="text-[#00E676]" />
                    <span>Drag to pan • Scroll to zoom</span>
                  </div>
                </div>
              )}
              
              {/* Zoom Instructions */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                <div className="space-y-1">
                  <div>+ / - : Zoom</div>
                  <div>0 : Reset</div>
                  <div>Esc : Close</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SERVICES = [
  { title: 'Video Editing', desc: 'YouTube shorts, cinematic edits, color grade, sound design.', icon: FaVideo },
  { title: 'Graphic Design', desc: 'Thumbnails, posters, banners and brand visuals.', icon: FaPaintBrush },
  { title: 'Brand Vibe', desc: "Design that matches your brand's voice and audience.", icon: FaMagic },
];

// Helper function to get service features
const getServiceFeatures = (index) => {
  const features = [
    [ // Video Editing
      'YouTube Shorts & Reels',
      'Cinematic Color Grading',
      'Professional Sound Design',
      'Motion Graphics & Effects'
    ],
    [ // Graphic Design
      'Custom Thumbnails',
      'Social Media Graphics',
      'Print & Digital Designs',
      'Brand Visual Identity'
    ],
    [ // Brand Vibe
      'Brand Strategy',
      'Audience Analysis',
      'Visual Consistency',
      'Creative Direction'
    ]
  ];
  return features[index] || [];
};

export default function SyedTahaPortfolio() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const [isCvAvailable] = useState(CV_LINK && CV_LINK !== '#');
  const [serviceModal, setServiceModal] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [psIndex, setPsIndex] = useState(null);
  const [psZoom, setPsZoom] = useState(1);
  // Mobile navigation state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const savedScrollPosition = useRef(0);
  // Active section tracking
  const [activeSection, setActiveSection] = useState('home');
  // custom cursor state
  // State for cursor and performance
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorDown, setCursorDown] = useState(false);
  const [cursorHoverInteractive, setCursorHoverInteractive] = useState(false);
  const [cursorHoverMedia, setCursorHoverMedia] = useState(false);
  const [showNativeCursor, setShowNativeCursor] = useState(false);
  const [enableCursor, setEnableCursor] = useState(false); // Default to false (native cursor)
  const [customCursorEnabled, setCustomCursorEnabled] = useState(false); // User preference toggle

  // Sound system state
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [soundInitialized, setSoundInitialized] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      // Save current scroll position
      savedScrollPosition.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      // Restore to the saved position
      window.scrollTo(0, savedScrollPosition.current);
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  // Active section tracking
  useEffect(() => {
    const sections = ['home', 'skills', 'services', 'about', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Less aggressive margin for better detection
      threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for better accuracy
    };

    const observerCallback = (entries) => {
      // Find the entry with the highest intersection ratio that's actually intersecting
      let bestEntry = null;
      let bestRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          bestEntry = entry;
          bestRatio = entry.intersectionRatio;
        }
      });

      // If we found a good candidate, update the active section
      if (bestEntry) {
        const sectionId = bestEntry.target.id;
        if (sections.includes(sectionId) && sectionId !== activeSection) {
          setActiveSection(sectionId);
        }
      }
      
      // Fallback: if no section is intersecting but we have entries, pick the one closest to viewport center
      if (!bestEntry && entries.length > 0) {
        const viewportCenter = window.innerHeight / 2;
        let closestEntry = null;
        let closestDistance = Infinity;

        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          
          if (distance < closestDistance && sections.includes(entry.target.id)) {
            closestDistance = distance;
            closestEntry = entry;
          }
        });

        if (closestEntry && closestEntry.target.id !== activeSection) {
          setActiveSection(closestEntry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []); // Remove activeSection dependency to prevent infinite re-renders

  // Additional scroll-based active section detection as fallback
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'services', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of viewport
      
      let currentSection = 'home'; // Default to home
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const absoluteBottom = absoluteTop + element.offsetHeight;
          
          // Check if scroll position is within this section
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            currentSection = sectionId;
          }
        }
      });
      
      // Update active section if it's different
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledHandleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeSection]);

  useEffect(() => {
    // inject Roboto font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(link);

    // small entrance animation
    if (!navRef.current) return;
    const tl = gsap.timeline();
    tl.from(navRef.current, { y: -50, opacity: 0, duration: 0.6, ease: 'power2.out' });

    try {
      const heroCols = heroRef.current ? heroRef.current.querySelectorAll('.hero-col') : [];
      if (heroCols && heroCols.length) {
        // Ensure hero columns always start at full opacity and never get stuck half-visible
        gsap.set(heroCols, { opacity: 1 });
        // Only animate position; avoid animating opacity so inline styles don't override
        tl.from(heroCols, { y: 30, stagger: 0.12, duration: 0.6 }, '-=0.2')
          // Clear any inline transform/opacity that GSAP may have applied during tween
          .set(heroCols, { clearProps: 'transform,opacity' });
      }
    } catch (err) {
      console.warn('Hero animation skipped:', err);
    }

    // back-to-top visibility
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Sound system initialization
  useEffect(() => {
    const initSounds = async () => {
      try {
        await soundManager.init();
        setSoundInitialized(true);
        setIsSoundMuted(soundManager.getMuted());
      } catch (error) {
        console.warn('Sound system initialization failed:', error);
      }
    };

    // Initialize sounds on first user interaction
    const handleFirstInteraction = () => {
      initSounds();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Sound helper functions
  const playSound = (soundType, volume = 1) => {
    if (soundInitialized && !isSoundMuted) {
      soundManager.play(soundType, volume);
    }
  };

  const toggleSound = () => {
    if (soundInitialized) {
      const newMutedState = soundManager.toggleMute();
      setIsSoundMuted(newMutedState);
      
      if (newMutedState) {
        setAmbientPlaying(false);
        toast.info("🔇 Sound disabled", { autoClose: 2000 });
      } else {
        toast.info("🔊 Sound enabled", { autoClose: 2000 });
      }
    }
  };

  const toggleAmbient = async () => {
    // Initialize sound manager if not already done
    if (!soundInitialized) {
      try {
        await soundManager.init();
        setSoundInitialized(true);
        setIsSoundMuted(soundManager.getMuted());
        console.log('Sound manager initialized from ambient toggle');
      } catch (error) {
        console.warn('Sound system initialization failed:', error);
        toast.error("❌ Failed to initialize audio system", { autoClose: 3000 });
        return;
      }
    }

    if (!isSoundMuted) {
      if (ambientPlaying) {
        soundManager.stopAmbient();
        setAmbientPlaying(false);
        toast.info("🎵 Ambient sound stopped", { autoClose: 2000 });
      } else {
        try {
          await soundManager.startAmbient();
          setAmbientPlaying(true);
          toast.info("🎵 Ambient sound playing", { autoClose: 2000 });
        } catch (error) {
          console.warn('Failed to start ambient sound:', error);
          toast.error("❌ Failed to play ambient sound", { autoClose: 3000 });
        }
      }
    } else {
      toast.info("🔇 Sound is muted - unmute first", { autoClose: 2000 });
    }
  };

  // custom cursor setup (desktop only) - opt-in for better performance
  useEffect(() => {
    // Only enable custom cursor if user has opted in
    if (!customCursorEnabled) {
      setEnableCursor(false);
      return;
    }

    const setEnabled = () => setEnableCursor(window.innerWidth >= 768 && customCursorEnabled);
    setEnabled();
    window.addEventListener('resize', setEnabled);

    // Throttle mouse movement for better performance
    let mouseMoveCooldown = false;
    const onMove = (e) => {
      if (!mouseMoveCooldown) {
        mouseMoveCooldown = true;
        requestAnimationFrame(() => {
          setCursor({ x: e.clientX, y: e.clientY });
          mouseMoveCooldown = false;
        });
      }
    };

    const onDown = () => setCursorDown(true);
    const onUp = () => setCursorDown(false);
    const interactiveSelector = 'a,button,.cursor-interactive,.swiper-button-prev,.swiper-button-next,img,iframe,.cv-btn';
    const inputsSelector = 'input,textarea,[contenteditable="true"]';
    
    // Throttle hover detection
    let hoverCooldown = false;
    const onOver = (e) => {
      if (!hoverCooldown) {
        hoverCooldown = true;
        setTimeout(() => {
          const target = e.target;
          const isInput = target.closest(inputsSelector);
          setShowNativeCursor(!!isInput);
          const isInteractive = target.closest(interactiveSelector);
          setCursorHoverInteractive(!!isInteractive);
          const isMedia = !!(target.closest('img,iframe')) || target.tagName === 'IMG' || target.tagName === 'IFRAME';
          setCursorHoverMedia(isMedia);
          hoverCooldown = false;
        }, 16); // ~60fps
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver, true);

    return () => {
      window.removeEventListener('resize', setEnabled);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver, true);
    };
  }, [customCursorEnabled]); // Add dependency on customCursorEnabled

  // Separate useEffect for skills animation to ensure DOM elements exist
  useEffect(() => {
    const timer = setTimeout(() => {
      const skillEls = document.querySelectorAll('.skill-progress');
      skillEls.forEach((el) => {
        const pct = el.getAttribute('data-pct') || '80';
        gsap.set(el, { width: '0%' });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(el, { width: `${pct}%`, duration: 1.2, ease: 'power3.out' });
          }
        });
      });

      // Section reveal sounds completely disabled for now
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
    };
  }, [soundInitialized]); // Add soundInitialized as dependency

  const handleDownloadCV = (e) => {
    e.preventDefault();
    if (!isCvAvailable) {
      toast.info('CV not uploaded yet — please provide the PDF link to enable download.');
    } else {
      toast.success('Starting download...');
      window.open(CV_LINK, '_blank');
    }
  };

  const scrollTo = (id) => (e) => {
    e && e.preventDefault();
    playSound('click');
    
    // Close mobile nav first
    setMobileNavOpen(false);
    
    // Small delay to ensure mobile nav closes before scrolling
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Manually update active section for immediate feedback
        const sectionId = id.replace('#', '');
        setActiveSection(sectionId);
      }
    }, 300); // Wait for mobile nav animation to complete
  };

  const openService = (idx) => setServiceModal(idx);
  const closeService = () => setServiceModal(null);

  const [sending, setSending] = useState(false);

  const handleContact = async (ev) => {
    ev.preventDefault();
    if (sending) return;
    const form = ev.target;
    
    // Get form values
    const userName = form.name?.value || 'Friend';
    const userEmail = form.email?.value || '';
    const userMessage = form.message?.value || '';
    
    // Prepare data for EmailJS template
    const formData = {
      from_name: userName,           // Name of the person sending
      from_email: userEmail,         // Email of the person sending  
      to_name: 'Syed Taha',          // Your name (recipient)
      message: userMessage,          // The message content
      reply_to: userEmail,           // Reply-to email address
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'syedtahaportfolio';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_95ca5db';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5HH5isPnRXff_in5D';

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service not configured. Please add EmailJS keys to .env');
      return;
    }

    try {
      setSending(true);
      
      // Send email notification to you
      const res = await emailjs.send(serviceId, templateId, formData, { publicKey });
      
      // Store message in Firebase for backup
      if (typeof window !== 'undefined' && window.firebase) {
        try {
          const db = window.firebase.database();
          const messagesRef = db.ref('contact_messages');
          await messagesRef.push({
            name: userName,
            email: userEmail,
            message: userMessage,
            timestamp: Date.now(),
            date: new Date().toISOString(),
            status: 'received'
          });
        } catch (firebaseError) {
          console.warn('Firebase storage failed:', firebaseError);
        }
      }
      
      toast.success(`Thanks ${userName}! Your message has been sent successfully.`);
      playSound('success');
      form.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      toast.error(err?.text || err?.message || 'Failed to send message. Please try again later.');
      playSound('error');
    } finally {
      setSending(false);
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openPhotoshopLightbox = (index) => {
    setPsIndex(index);
    setPsZoom(1);
  };
  const closePhotoshopLightbox = () => setPsIndex(null);
  const nextPhotoshop = () => setPsIndex((i) => (i + 1) % PHOTOSHOP_PROJECTS.length);
  const prevPhotoshop = () => setPsIndex((i) => (i + PHOTOSHOP_PROJECTS.length - 1) % PHOTOSHOP_PROJECTS.length);
  const zoomIn = () => setPsZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setPsZoom((z) => Math.max(z - 0.25, 0.5));

  return (
    <div className={`min-h-screen font-roboto bg-transparent text-gray-200 leading-relaxed relative ${enableCursor && !showNativeCursor && customCursorEnabled ? 'custom-cursor-enabled' : ''}`}>
      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes iconFloat-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }
        @keyframes iconFloat-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-5deg); }
        }
        @keyframes iconFloat-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(3deg); }
        }
        @keyframes iconFloat-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
        }
        @keyframes iconFloat-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(4deg); }
        }
        @keyframes iconFloat-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-2deg); }
        }
        
        @keyframes iconPulse-0 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.1) rotate(2deg); opacity: 0.8; }
        }
        @keyframes iconPulse-1 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.05) rotate(-2deg); opacity: 0.9; }
        }
        @keyframes iconPulse-2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.08) rotate(1deg); opacity: 0.85; }
        }
        @keyframes iconPulse-3 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.06) rotate(-1deg); opacity: 0.9; }
        }
        @keyframes iconPulse-4 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.1) rotate(3deg); opacity: 0.8; }
        }
        @keyframes iconPulse-5 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.07) rotate(-3deg); opacity: 0.85; }
        }
        
        @keyframes navIconFloat-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes navIconFloat-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes navIconFloat-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        @keyframes navIconFloat-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes navIconFloat-4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes navIconFloat-5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes navIconPulse-0 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes navIconPulse-1 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.95; }
        }
        @keyframes navIconPulse-2 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes navIconPulse-3 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.9; }
        }
        @keyframes navIconPulse-4 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.95; }
        }
        @keyframes navIconPulse-5 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.07); opacity: 0.88; }
        }
      `}</style>
      
      {/* 3D Galaxy Background */}
      <GalaxyBackground />
      
      {/* Top navigation */}
      <nav style={{ transform: 'translateY(0px)' , opacity: 1}} ref={navRef} className="fixed w-full z-40 top-4 left-0 bg-transparent border-b border-transparent">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Enhanced Logo */}
            <div className="group cursor-pointer" role="heading" aria-level="1">
              <div className="relative flex items-center">
                {/* Logo Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 via-transparent to-[#00E676]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm" />
                
                {/* Main Logo Text */}
                <div className="relative text-xl font-bold tracking-wide text-white whitespace-nowrap flex items-center gap-1.5">
                  <span className="transition-all duration-300 group-hover:scale-105">Syed</span>
                  
                  {/* Animated Separator */}
                  <div className="relative">
                    <div className="w-1 h-1 bg-[#00E676] rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-1 h-1 bg-[#00E676] rounded-full animate-ping opacity-75" />
                  </div>
                  
                  <span className="text-[#00E676] transition-all duration-300 group-hover:scale-105 group-hover:text-[#00ff88] relative">
                    Taha
                    {/* Underline Effect */}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00E676] to-[#00ff88] group-hover:w-full transition-all duration-500" />
                  </span>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg" />
              </div>
              
              {/* Subtitle */}
              <div className="text-xs text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium tracking-wider">
                Creative Developer
              </div>
            </div>
            <nav aria-label="Main navigation" className="hidden md:block ml-6">
              <ul className="flex items-center gap-1">
                {[
                  { href: '#home', id: 'home', label: 'Home', color: '#00E676' },
                  { href: '#skills', id: 'skills', label: 'Skills', color: '#FFD700' },
                  { href: '#services', id: 'services', label: 'Services', color: '#FF6B6B' },
                  { href: '#about', id: 'about', label: 'About', color: '#4ECDC4' },
                  { href: '#projects', id: 'projects', label: 'Projects', color: '#9999ff' },
                  { href: '#contact', id: 'contact', label: 'Contact', color: '#FF9800' }
                ].map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.href}>
                      <a 
                        href={item.href} 
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          scrollTo(item.href)(e);
                        }} 
                        className={`group relative block px-6 py-3 transition-all duration-500 focus:outline-none overflow-hidden ${
                          isActive 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={{ '--item-color': item.color }}
                        aria-label={`Go to ${item.label.toLowerCase()}`}
                      >
                        {/* Morphing Background */}
                        <div 
                          className={`absolute inset-0 transition-all duration-500 ease-out ${
                            isActive 
                              ? 'bg-gradient-to-r from-[var(--item-color)]/30 via-[var(--item-color)]/20 to-[var(--item-color)]/30 opacity-100 scale-100 rounded-xl' 
                              : 'bg-gradient-to-r from-[var(--item-color)]/0 via-[var(--item-color)]/5 to-[var(--item-color)]/0 opacity-0 scale-75 rounded-lg group-hover:opacity-100 group-hover:scale-100 group-hover:rounded-xl'
                          }`}
                          style={{ '--item-color': item.color }}
                        />
                        
                        {/* Removed animated border for cleaner look */}
                        
                        {/* Glowing Orb Effect */}
                        <div 
                          className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                            isActive 
                              ? 'opacity-100 scale-100 animate-pulse' 
                              : 'opacity-0 scale-50 group-hover:opacity-75 group-hover:scale-100'
                          }`}
                          style={{ 
                            backgroundColor: item.color,
                            boxShadow: `0 0 8px ${item.color}, 0 0 16px ${item.color}40`
                          }}
                        />
                        
                        {/* Particle Trail */}
                        {isActive && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-[var(--item-color)] to-transparent opacity-75 animate-ping" style={{ '--item-color': item.color }} />
                        )}
                        
                        {/* Text with Advanced Typography */}
                        <span className={`relative z-10 font-medium tracking-wide transition-all duration-500 ${
                          isActive 
                            ? 'font-bold tracking-wider transform scale-105 drop-shadow-sm' 
                            : 'group-hover:font-semibold group-hover:tracking-wider group-hover:transform group-hover:scale-105'
                        }`}>
                          {item.label}
                        </span>
                        
                        {/* Sliding Underline */}
                        <div 
                          className={`absolute bottom-1 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[var(--item-color)] to-transparent transition-all duration-500 ${
                            isActive 
                              ? 'opacity-100 scale-x-100' 
                              : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                          }`}
                          style={{ '--item-color': item.color }}
                        />
                        
                        {/* Shimmer Effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ${
                            isActive 
                              ? 'translate-x-full animate-pulse opacity-50' 
                              : '-translate-x-full group-hover:translate-x-full group-hover:opacity-30'
                          }`}
                        />
                        
                        {/* Corner Accents */}
                        {isActive && (
                          <>
                            <div 
                              className="absolute top-1 left-1 w-1 h-1 rounded-full animate-ping"
                              style={{ backgroundColor: item.color }}
                            />
                            <div 
                              className="absolute top-1 right-1 w-1 h-1 rounded-full animate-ping"
                              style={{ backgroundColor: item.color, animationDelay: '0.5s' }}
                            />
                            <div 
                              className="absolute bottom-1 left-1 w-1 h-1 rounded-full animate-ping"
                              style={{ backgroundColor: item.color, animationDelay: '1s' }}
                            />
                            <div 
                              className="absolute bottom-1 right-1 w-1 h-1 rounded-full animate-ping"
                              style={{ backgroundColor: item.color, animationDelay: '1.5s' }}
                            />
                          </>
                        )}
                        
                        {/* Hover Glow */}
                        <div 
                          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                            isActive ? 'opacity-30' : ''
                          }`}
                          style={{ 
                            background: `radial-gradient(circle at center, ${item.color}40, transparent 70%)`
                          }}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Sound Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={toggleSound}
                title={isSoundMuted ? "Enable sound effects" : "Disable sound effects"}
                className="flex items-center justify-center w-10 h-10 p-2 rounded bg-[#0f2430]/40 hover:bg-[#0f2430]/60 transition focus:outline-none focus:ring-2 focus:ring-[#00E676] text-xs"
                aria-label="Toggle sound effects"
              >
                {isSoundMuted ? <FaVolumeMute className="text-gray-400" /> : <FaVolumeUp className="text-[#00E676]" />}
              </button>
              
              <button 
                onClick={toggleAmbient}
                title={ambientPlaying ? "Stop ambient sound" : "Play ambient sound"}
                className="flex items-center justify-center w-10 h-10 p-2 rounded bg-[#0f2430]/40 hover:bg-[#0f2430]/60 transition focus:outline-none focus:ring-2 focus:ring-[#00E676] text-xs"
                aria-label="Toggle ambient sound"
                disabled={isSoundMuted}
              >
                <FaMusic className={ambientPlaying && !isSoundMuted ? "text-[#00E676]" : "text-gray-400"} />
              </button>
            </div>

            {/* Custom Cursor Toggle */}
            <button 
              onClick={() => {
                playSound('click');
                const newState = !customCursorEnabled;
                setCustomCursorEnabled(newState);
                if (newState) {
                  toast.info("Custom cursor enabled! 🎨 Enjoy the Premiere Pro style cursor.", { autoClose: 3000 });
                } else {
                  toast.info("Switched to native cursor for better performance ⚡", { autoClose: 2000 });
                }
              }}
              title={customCursorEnabled ? "Switch to native cursor" : "Enable custom cursor (Premiere Pro style)"}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded bg-[#0f2430]/40 hover:bg-[#0f2430]/60 transition focus:outline-none focus:ring-2 focus:ring-[#00E676] text-xs"
              aria-label="Toggle custom cursor"
            >
              {customCursorEnabled ? <FaMousePointer className="text-[#00E676]" /> : <FaMousePointer className="text-gray-400" />}
            </button>
            
            {/* Enhanced YouTube and CV buttons */}
            
            {/* Professional YouTube Button */}
            <a 
              href={YOUTUBE_CHANNEL} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSound('click')} 
              aria-label="Visit my YouTube channel" 
              className="group hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] hover:from-[#ff0000]/20 hover:via-[#ff0000]/10 hover:to-[#ff0000]/20 border border-[#333] hover:border-[#ff0000]/50 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#ff0000] shadow-lg hover:shadow-xl overflow-hidden relative"
            >
              {/* YouTube Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/0 via-[#ff0000]/10 to-[#ff0000]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated YouTube Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <FaYoutube className="text-[#ff0000] group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300" />
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border border-[#ff0000]/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              
              {/* Text with Enhanced Typography */}
              <span className="hidden lg:inline text-white group-hover:text-[#ff4444] font-medium transition-all duration-300 relative z-10">
                YouTube
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff0000] rounded-bl-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#ff0000] rounded-tr-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 delay-100" />
            </a>
            
            {/* Professional Download CV Button */}
            <button 
              onClick={() => {
                playSound('click');
                handleDownloadCV();
              }}
              aria-label="Download my CV" 
              className="group cv-btn hidden sm:flex items-center gap-3 bg-gradient-to-r from-[#003d5c] via-[#004d73] to-[#003d5c] hover:from-[#00E676]/30 hover:via-[#00E676]/20 hover:to-[#00E676]/30 px-5 py-2.5 rounded-xl text-sm border border-[#00E676]/30 hover:border-[#00E676]/60 shadow-lg hover:shadow-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#00E676] overflow-hidden relative transform hover:scale-105"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/0 via-[#00E676]/20 to-[#00E676]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Download Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <FaDownload className="text-[#00E676] group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
                {/* Download Arrow Trail */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-[#00E676] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500" />
              </div>
              
              {/* Enhanced Text */}
              <span className="text-white group-hover:text-[#00E676] font-medium transition-all duration-300 relative z-10 tracking-wide">
                Download CV
              </span>
              
              {/* File Icon Indicator */}
              <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg className="w-4 h-4 text-[#00E676]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
              
              {/* Success Pulse */}
              <div className="absolute inset-0 rounded-xl border border-[#00E676]/50 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-3 rounded-full bg-[#041827]/80 border border-[#063042] text-[#00E676] hover:bg-[#063042] transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#00E676]"
              aria-label="Toggle mobile menu"
            >
              {mobileNavOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${mobileNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onTouchMove={(e) => e.preventDefault()}
        onWheel={(e) => e.preventDefault()}
      >
        {/* Animated Backdrop */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-black/80 via-[#041827]/90 to-black/80 backdrop-blur-md transition-all duration-500 ${mobileNavOpen ? 'scale-100' : 'scale-110'}`}
          onClick={() => setMobileNavOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
        />
        
        {/* Modern Floating Menu Panel */}
        <div 
          className={`absolute top-4 left-4 right-4 max-w-sm mx-auto bg-gradient-to-br from-[#0a1235]/98 via-[#071029]/98 to-[#041827]/98 backdrop-blur-xl rounded-3xl border border-[#00E676]/30 shadow-2xl transform transition-all duration-700 flex flex-col max-h-[calc(100vh-2rem)] ${mobileNavOpen ? 'translate-y-0 scale-100 rotate-0' : 'translate-y-8 scale-95 -rotate-2'}`}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          style={{
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(0, 230, 118, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/8 via-transparent to-[#9999ff]/8" />
            <div className="absolute inset-0 bg-gradient-to-tl from-[#FF6B6B]/4 via-transparent to-[#4ECDC4]/4" />
            
            {/* Animated Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mobile-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="url(#gridGradient)" strokeWidth="0.5" fill="none" />
                  <circle cx="30" cy="30" r="1" fill="url(#dotGradient)" opacity="0.6" />
                </pattern>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E676" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#9999ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00E676" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="dotGradient">
                  <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00E676" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#mobile-grid)" />
            </svg>
            
            {/* Floating Orbs */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#00E676]/10 to-transparent rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 left-8 w-16 h-16 bg-gradient-to-br from-[#9999ff]/10 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
          </div>
          
          {/* Header with Floating Close Button */}
          <div className="relative p-4 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Enhanced Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] flex items-center justify-center shadow-lg shadow-[#00E676]/25 relative overflow-hidden">
                    <span className="text-black font-bold text-lg relative z-10">ST</span>
                    {/* Avatar Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#00C853] opacity-50 blur-sm animate-pulse" />
                  </div>
                  {/* Status Ring */}
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] opacity-75 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                
                <div>
                  <div className="text-xl font-bold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    Syed <span className="text-[#00E676] drop-shadow-sm">Taha</span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                    Creative Developer
                  </div>
                </div>
              </div>
              
              {/* Enhanced Close Button */}
              <button 
                onClick={() => setMobileNavOpen(false)}
                className="relative group p-3 rounded-full bg-[#041827]/90 border border-[#063042] hover:border-[#00E676]/60 transition-all duration-300 overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl"
                aria-label="Close mobile menu"
              >
                {/* Button Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/0 via-[#00E676]/10 to-[#00E676]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                
                {/* Close Icon with Animation */}
                <FaTimes className="relative z-10 text-[#00E676] group-hover:text-white group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" size={16} />
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-[#00E676]/20 scale-0 group-active:scale-100 transition-transform duration-200" />
              </button>
            </div>
            
            {/* Enhanced Status Indicators */}
            <div className="flex items-center gap-2 mt-4">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${soundInitialized ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400 border border-green-500/30' : 'bg-gradient-to-r from-gray-500/20 to-gray-600/10 text-gray-400 border border-gray-500/30'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${soundInitialized ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                Audio {soundInitialized ? 'Ready' : 'Loading'}
              </div>
              {ambientPlaying && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#00E676]/20 to-green-500/10 text-[#00E676] border border-[#00E676]/30 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-bounce" />
                  Music Playing
                  {/* Audio Wave Animation */}
                  <div className="flex items-center gap-0.5 ml-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 h-2 bg-[#00E676] rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 150}ms`, animationDuration: '1s' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Links with Creative Animations */}
          <nav 
            className="px-4 flex-1 overflow-y-auto overscroll-contain min-h-0"
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="space-y-3">
              {[
                { href: '#home', id: 'home', label: 'Home', icon: '🏠', color: '#00E676', desc: 'Welcome page', gradient: 'from-emerald-500/20 to-green-400/10' },
                { href: '#skills', id: 'skills', label: 'Skills', icon: '💡', color: '#FFD700', desc: 'My expertise', gradient: 'from-yellow-500/20 to-amber-400/10' },
                { href: '#services', id: 'services', label: 'Services', icon: '🚀', color: '#FF6B6B', desc: 'What I offer', gradient: 'from-red-500/20 to-pink-400/10' },
                { href: '#about', id: 'about', label: 'About', icon: '👨‍💻', color: '#4ECDC4', desc: 'My story', gradient: 'from-cyan-500/20 to-teal-400/10' },
                { href: '#projects', id: 'projects', label: 'Projects', icon: '🎬', color: '#9999ff', desc: 'My work', gradient: 'from-purple-500/20 to-indigo-400/10' },
                { href: '#contact', id: 'contact', label: 'Contact', icon: '📧', color: '#FF9800', desc: 'Get in touch', gradient: 'from-orange-500/20 to-yellow-400/10' }
              ].map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.href}
                    className={`transform transition-all duration-700 ${mobileNavOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        
                        // If clicking the same section, just close mobile nav
                        if (activeSection === item.id) {
                          setMobileNavOpen(false);
                          return;
                        }
                        
                        // For different sections, close nav then scroll
                        setMobileNavOpen(false);
                        // Add a small delay to ensure mobile nav closes properly
                        setTimeout(() => {
                          scrollTo(item.href)(e);
                        }, 150);
                      }}
                      className={`group relative block p-4 rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-xl ${
                        isActive 
                          ? `bg-gradient-to-r ${item.gradient} border-2 border-[var(--item-color)]/60 shadow-[var(--item-color)]/25` 
                          : 'bg-gradient-to-r from-[#041827]/60 via-[#0a1a2e]/40 to-[#041827]/60 border border-[#063042]/60 hover:border-[#00E676]/40'
                      }`}
                      style={{ '--item-color': item.color }}
                    >
                      {/* Active Background Glow */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 bg-gradient-to-r opacity-30 rounded-2xl animate-pulse"
                          style={{ background: `linear-gradient(45deg, ${item.color}20, transparent, ${item.color}20)` }}
                        />
                      )}
                      
                      {/* Animated Background Gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl`}
                      />
                      
                      {/* Animated Border Glow */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: `linear-gradient(45deg, transparent, ${item.color}20, transparent)`,
                          filter: 'blur(1px)'
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative flex items-center gap-4">
                        {/* Enhanced Icon Container with Looping Animation */}
                        <div 
                          className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl overflow-hidden ${
                            isActive 
                              ? 'bg-gradient-to-br from-[var(--item-color)]/40 to-[var(--item-color)]/20 scale-110 animate-pulse' 
                              : 'bg-gradient-to-br from-[#063042]/80 to-[#041827]/60 group-hover:from-[var(--item-color)]/30 group-hover:to-[var(--item-color)]/10'
                          }`}
                          style={{ '--item-color': item.color }}
                        >
                          {/* Icon Background Pulse */}
                          <div 
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br transition-all duration-500 ${
                              isActive ? 'opacity-40 animate-ping' : 'opacity-0 group-hover:opacity-20'
                            }`}
                            style={{ background: `radial-gradient(circle, ${item.color}40, transparent)` }}
                          />
                          
                          {/* Animated Icon with Looping Animation */}
                          <span 
                            className={`text-xl relative z-10 transition-all duration-500 filter group-hover:brightness-110 ${
                              isActive 
                                ? 'scale-125 drop-shadow-lg animate-bounce' 
                                : 'group-hover:scale-125 group-hover:drop-shadow-lg'
                            }`}
                            style={{
                              animation: isActive 
                                ? `iconFloat-${index} 3s ease-in-out infinite`
                                : mobileNavOpen ? `iconPulse-${index} 4s ease-in-out infinite ${index * 0.5}s` : 'none'
                            }}
                          >
                            {item.icon}
                          </span>
                          
                          {/* Icon Shine Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 rounded-xl ${
                            isActive ? 'translate-x-full animate-pulse' : '-translate-x-full group-hover:translate-x-full'
                          }`} />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1">
                          <div className={`text-base font-bold transition-all duration-300 group-hover:translate-x-1 ${
                            isActive ? 'text-white scale-105' : 'text-gray-200 group-hover:text-white'
                          }`}>
                            {item.label}
                          </div>
                          <div className={`text-xs transition-all duration-300 opacity-80 group-hover:opacity-100 ${
                            isActive ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
                          }`}>
                            {item.desc}
                          </div>
                        </div>
                        
                        {/* Enhanced Status Indicator */}
                        <div className="flex items-center gap-2">
                          {/* Animated Dot */}
                          <div 
                            className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
                              isActive ? 'scale-150 animate-ping' : 'group-hover:scale-150'
                            }`}
                            style={{ backgroundColor: isActive ? item.color : `${item.color}60` }}
                          >
                            <div 
                              className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                                isActive ? 'opacity-75 animate-ping' : 'opacity-0 group-hover:opacity-75'
                              }`}
                              style={{ backgroundColor: item.color }}
                            />
                            <div 
                              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                              }`}
                              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                            />
                          </div>
                          
                          {/* Enhanced Arrow */}
                          <div className="relative overflow-hidden">
                            <FaChevronRight 
                              className={`transition-all duration-300 group-hover:scale-110 ${
                                isActive 
                                  ? 'text-[var(--item-color)] translate-x-1 scale-110' 
                                  : 'text-gray-400 group-hover:text-[#00E676] group-hover:translate-x-1'
                              }`}
                              style={{ '--item-color': item.color }}
                              size={10} 
                            />
                            {/* Arrow Trail Effect */}
                            <FaChevronRight 
                              className={`absolute top-0 left-0 transition-all duration-500 delay-100 ${
                                isActive 
                                  ? 'opacity-60 translate-x-2 text-[var(--item-color)]' 
                                  : 'text-[#00E676] opacity-0 group-hover:opacity-60 group-hover:translate-x-2'
                              }`}
                              style={{ '--item-color': item.color }}
                              size={10} 
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Accent Line */}
                      <div 
                        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--item-color)] to-transparent transition-all duration-500 rounded-full ${
                          isActive ? 'opacity-80 scale-x-100' : 'opacity-0 group-hover:opacity-60 scale-x-75 group-hover:scale-x-100'
                        }`}
                        style={{ '--item-color': item.color }}
                      />
                      
                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
                              isActive 
                                ? 'opacity-60 animate-pulse' 
                                : 'opacity-0 group-hover:opacity-60'
                            }`}
                            style={{
                              backgroundColor: item.color,
                              left: `${20 + i * 20}%`,
                              top: `${30 + i * 10}%`,
                              animationDelay: `${i * 200}ms`
                            }}
                          />
                        ))}
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </nav>
          
          {/* Modern Action Panel */}
          <div className="p-4 pt-3 border-t border-[#063042]/50 flex-shrink-0">
            <div className="space-y-2">
              {/* Sound Controls Row */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    playSound('click');
                    toggleSound();
                  }}
                  className="group relative flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0f2430]/60 border border-[#063042] hover:border-[#00E676]/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/0 to-[#00E676]/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2">
                    {isSoundMuted ? 
                      <FaVolumeMute className="text-gray-400 group-hover:text-red-400 transition-colors duration-300" size={16} /> : 
                      <FaVolumeUp className="text-[#00E676] group-hover:scale-110 transition-transform duration-300" size={16} />
                    }
                    <span className="text-sm font-medium text-white group-hover:text-[#00E676] transition-colors duration-300">
                      {isSoundMuted ? 'Unmute' : 'Mute'}
                    </span>
                  </div>
                </button>
                
                <button 
                  onClick={() => {
                    playSound('click');
                    toggleAmbient();
                  }}
                  disabled={isSoundMuted}
                  className="group relative flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0f2430]/60 border border-[#063042] hover:border-[#9999ff]/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9999ff]/0 to-[#9999ff]/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2">
                    <FaMusic className={`${ambientPlaying && !isSoundMuted ? "text-[#9999ff] animate-pulse" : "text-gray-400"} group-hover:scale-110 transition-all duration-300`} size={16} />
                    <span className="text-sm font-medium text-white group-hover:text-[#9999ff] transition-colors duration-300">
                      {ambientPlaying ? 'Stop' : 'Music'}
                    </span>
                  </div>
                </button>
              </div>
              
              {/* Social & Download Row */}
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={YOUTUBE_CHANNEL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="group relative flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#ff0000]/10 border border-[#ff0000]/30 hover:border-[#ff0000]/50 hover:bg-[#ff0000]/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/0 to-[#ff0000]/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2">
                    <FaYoutube className="text-[#ff0000] group-hover:scale-110 transition-transform duration-300" size={16} />
                    <span className="text-sm font-medium text-white group-hover:text-[#ff0000] transition-colors duration-300">
                      YouTube
                    </span>
                  </div>
                </a>
                
                <button 
                  onClick={() => {
                    playSound('click');
                    handleDownloadCV();
                    setMobileNavOpen(false);
                  }}
                  className="group relative flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#05324b]/80 to-[#002138]/80 border border-[#093044] hover:from-[#06425b] hover:to-[#003148] hover:border-[#00E676]/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/0 to-[#00E676]/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2">
                    <FaDownload className="text-[#00E676] group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300" size={16} />
                    <span className="text-sm font-medium text-white group-hover:text-[#00E676] transition-colors duration-300">
                      Resume
                    </span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Bottom Signature */}
            <div className="mt-4 pt-3 border-t border-[#063042]/30 text-center">
              <div className="text-xs text-gray-500">
                Made with <span className="text-red-400 animate-pulse">❤️</span> by Syed Taha
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page container */}
      <main className="pt-20 md:pt-32">
        {/* Mobile Action Buttons - Only visible on mobile/tablet */}
        <div className="sm:hidden relative z-30 bg-gradient-to-r from-[#071029] via-[#0a1235] to-[#071029] border-b border-[#063042]/30">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-4">
              {/* YouTube Button */}
              <a 
                href={YOUTUBE_CHANNEL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff0000]/10 to-[#ff0000]/5 border border-[#ff0000]/30 hover:border-[#ff0000]/50 hover:from-[#ff0000]/15 hover:to-[#ff0000]/10 transition-all duration-300 backdrop-blur-sm shadow-lg group"
                aria-label="Visit my YouTube channel"
              >
                <FaYoutube className="text-[#ff0000] text-xl group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col items-start">
                  <span className="text-white font-semibold text-sm leading-tight">YouTube</span>
                  <span className="text-gray-400 text-xs">@iamsyedtaha</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#ff0000]/50 group-hover:bg-[#ff0000] transition-colors duration-300" />
              </a>

              {/* Download CV Button */}
              <button 
                onClick={handleDownloadCV}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E676]/10 to-[#00E676]/5 border border-[#00E676]/30 hover:border-[#00E676]/50 hover:from-[#00E676]/15 hover:to-[#00E676]/10 transition-all duration-300 backdrop-blur-sm shadow-lg group"
                aria-label="Download my CV"
              >
                <FaDownload className="text-[#00E676] text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div className="flex flex-col items-start">
                  <span className="text-white font-semibold text-sm leading-tight">Download</span>
                  <span className="text-gray-400 text-xs">My CV</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#00E676]/50 group-hover:bg-[#00E676] transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* EPIC HERO SECTION */}
        <section ref={heroRef} id='home' className="relative min-h-screen flex items-center overflow-hidden opacity-100">
          {/* ANIMATED BACKGROUND MAGIC */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Massive Floating Orbs */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#0066cc]/15 to-[#00E676]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-[#00E676]/12 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>

            {/* Floating Tech Icons */}
            <div className="hidden lg:block absolute top-20 right-32 text-[#00E676]/20 text-6xl animate-bounce transform rotate-12" style={{animationDelay: '1s'}}>
              <SiAdobephotoshop />
            </div>
            <div className="hidden lg:block absolute bottom-32 left-24 text-[#0066cc]/20 text-5xl animate-bounce transform -rotate-12" style={{animationDelay: '3s'}}>
              <SiAdobepremierepro />
            </div>
            <div className="hidden lg:block absolute top-1/3 right-1/4 text-[#00E676]/20 text-4xl animate-bounce transform rotate-45" style={{animationDelay: '5s'}}>
              <SiAdobeaftereffects />
            </div>
            <div className="hidden lg:block absolute bottom-1/4 left-1/4 text-[#0066cc]/20 text-3xl animate-bounce transform -rotate-6" style={{animationDelay: '7s'}}>
              <SiReact />
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="m 60 0 l 0 60 l -60 0 l 0 -60 z" fill="none" stroke="#00E676" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroGrid)" />
              </svg>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-40 left-1/2 w-2 h-2 bg-[#00E676] rounded-full animate-ping"></div>
            <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-[#0066cc] rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-[#00E676] rounded-full animate-bounce"></div>
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#071029]/30 via-transparent to-[#000811]/40 z-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent z-6"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center opacity-100">
              <div className="hero-col opacity-100 space-y-6 lg:space-y-8">
                <div className="relative inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 border border-[#00E676]/30 backdrop-blur-sm hover:shadow-lg hover:shadow-[#00E676]/20 transition-all duration-300 mb-4">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#00E676] animate-pulse shadow-lg shadow-[#00E676]/50"></div>
                  <span className="text-xs sm:text-sm font-medium text-[#00E676]">Available for Epic Projects</span>
                  <div className="hidden sm:flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#00E676] animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-[#0066cc] animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 rounded-full bg-[#00E676] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight relative group">
                  Hi, I’m <span className="text-white">Syed <span className="text-[#00E676]">Taha</span></span>
                </h1>
                <p className="mt-4 max-w-xl text-gray-200">I’m a passionate video editor, graphic designer and YouTuber (channel: <strong>@iamsyedtaha</strong>). I create viral shorts, cinematic edits and Photoshop tutorials — I help voices become visuals.</p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      playSound('click');
                      scrollTo('#contact')(e);
                    }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#00E676] to-[#0066cc] text-[#001313] font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-[#00E676]/30 transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00E676]"
                    aria-label="Hire me for your project"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <FaRocket className="group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base" />
                      <span className="whitespace-nowrap">Let's Create Together</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  </a>
                  <a 
                    href={YOUTUBE_CHANNEL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#041827]/80 to-[#001a1f]/60 border border-[#063042] hover:border-[#00E676]/40 text-white font-semibold text-base sm:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#00E676]"
                    aria-label="Visit my YouTube channel"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      <FaYoutube className="text-[#ff2b2b] group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base" aria-hidden="true" /> 
                      <span className="group-hover:text-[#00E676] transition-colors duration-300 whitespace-nowrap">@iamsyedtaha</span>
                    </span>
                  </a>
                </div>

                {/* Live Subscriber Counter - Prominent Position */}
                <div className="mt-6">
                  <LiveSubscriberCounter 
                    channelId="UCdFVYz_Kflq2TXcjqt8jTEQ" 
                    className="mx-auto max-w-md"
                  />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { number: '3+', label: 'Years Experience', icon: FaAward },
                    { number: '50+', label: 'Projects Done', icon: FaTrophy },
                    { number: '24/7', label: 'Available', icon: FaClock }
                  ].map((stat, idx) => (
                    <div key={idx} className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm text-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#0066cc]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <stat.icon className="text-[#00E676] text-xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl font-bold text-white group-hover:text-[#00E676] transition-colors duration-300">{stat.number}</div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-col flex justify-center lg:justify-end opacity-100 mt-8 lg:mt-0">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Main Profile Card */}
                  <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00E676]/20 backdrop-blur-sm">
                    
                    {/* Floating Elements Around Card */}
                    <div className="hidden sm:block absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                      <FaVideo className="text-[#001313] text-xl" />
                    </div>
                    <div className="hidden sm:block absolute -bottom-4 -left-4 w-10 h-10 rounded-xl bg-gradient-to-r from-[#0066cc] to-[#00E676] flex items-center justify-center animate-bounce" style={{animationDelay: '3s'}}>
                      <FaPaintBrush className="text-[#001313] text-sm" />
                    </div>
                    <div className="hidden sm:block absolute top-1/4 -left-6 w-8 h-8 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center animate-pulse">
                      <FaCode className="text-[#001313] text-xs" />
                    </div>

                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="cardPattern" width="15" height="15" patternUnits="userSpaceOnUse">
                          <circle cx="7.5" cy="7.5" r="0.5" fill="#00E676"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#cardPattern)"/>
                      </svg>
                    </div>

                    {/* Profile Image */}
                    <div className="relative">
                      <img src={PROFILE_IMG} alt="Syed Taha" className="w-full h-56 sm:h-64 lg:h-80 object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041827]/60 via-transparent to-transparent"></div>
                      
                      {/* Live Status Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#00E676]/90 to-[#0066cc]/90 text-[#001313] text-xs font-bold backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#001313] animate-pulse"></div>
                          AVAILABLE
                        </div>
                      </div>
                    </div>
                    {/* Card Content */}
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-white group-hover:text-[#00E676] transition-colors duration-300">
                            Creative Portfolio
                          </div>
                          <div className="text-sm text-gray-400">Latest YouTube Content</div>
                        </div>
                        <button 
                          onClick={() => toast.info('Check out my latest YouTube videos!')} 
                          className="p-3 rounded-xl bg-gradient-to-r from-[#00E676] to-[#0066cc] hover:shadow-lg hover:shadow-[#00E676]/25 transition-all duration-300 hover:scale-110"
                        >
                          <FaPlay className="text-[#001313] text-lg" />
                        </button>
                      </div>

                      {/* Mini Video Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {YOUTUBE_EMBEDS.slice(0, 3).map((src, idx) => (
                          <div key={idx} className="group/video relative rounded-xl overflow-hidden bg-[#021b25]/60 border border-[#083145] hover:border-[#00E676]/50 transition-all duration-300 hover:transform hover:scale-105">
                            <iframe
                              title={`yt-${idx}`}
                              className="w-full aspect-video"
                              src={src}
                              frameBorder="0"
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00E676]/20 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        ))}
                      </div>

                      {/* Social Proof */}
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#00E676]">@iamsyedtaha</div>
                          <div className="text-xs text-gray-400">YouTube Channel</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Epic Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
              <div className="text-xs font-medium">Scroll to explore my universe</div>
              <div className="w-6 h-10 border-2 border-[#00E676]/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#00E676] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE ME */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Background Orbs */}
            <div className="absolute top-20 left-16 w-64 h-64 bg-gradient-to-r from-[#00E676]/12 to-[#0066cc]/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-16 right-20 w-80 h-80 bg-gradient-to-r from-[#0066cc]/8 to-[#00E676]/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-to-r from-[#00E676]/6 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}}></div>

            {/* Floating Tech Icons */}
            <div className="absolute top-32 right-32 text-[#00E676]/20 text-4xl animate-bounce" style={{animationDelay: '1s'}}>
              <SiAdobephotoshop />
            </div>
            <div className="absolute bottom-40 left-24 text-[#0066cc]/20 text-3xl animate-bounce" style={{animationDelay: '2s'}}>
              <SiReact />
            </div>
            <div className="absolute top-1/3 right-1/4 text-[#00E676]/20 text-3xl animate-bounce" style={{animationDelay: '4s'}}>
              <SiAdobeaftereffects />
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00E676]/50"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-pulse"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#0066cc]/50"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00E676] to-[#0066cc] bg-clip-text text-transparent mb-4">
              Why Choose Me?
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your vision deserves a creator who combines technical expertise with creative passion. 
              Here's what makes me the perfect choice for your project.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Side - What I Can Do */}
            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                    <FaCheckCircle className="text-[#001313] text-lg" />
                  </div>
                  What I Excel At
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: SiAdobephotoshop, title: 'Photoshop Mastery', desc: 'Photo manipulation, posters, banners, logos, thumbnails' },
                    { icon: SiAdobeaftereffects, title: 'After Effects', desc: 'Motion graphics, animations, visual effects, transitions' },
                    { icon: SiAdobepremierepro, title: 'Premiere Pro', desc: 'Video editing, color grading, storytelling, sound design' },
                    { icon: SiReact, title: 'React Development', desc: 'Modern websites, e-commerce stores, web applications' },
                    { icon: FaPaintBrush, title: 'Creative Design', desc: 'Brand identity, social media graphics, print materials' },
                    { icon: FaUsers, title: 'Easy Adaptation', desc: 'Quick learner, flexible approach, client-focused solutions' }
                  ].map((skill, idx) => (
                    <div key={idx} className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#0066cc]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#001a1f] to-[#041827] border border-[#063042] flex items-center justify-center mb-3 group-hover:border-[#00E676]/50 transition-all duration-500">
                          <skill.icon className="text-[#00E676] text-xl group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-[#00E676] transition-colors duration-300">
                          {skill.title}
                        </h4>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - What I Can't Do */}
            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#ffa500] flex items-center justify-center">
                    <FaInfoCircle className="text-white text-lg" />
                  </div>
                  Honest Limitations
                </h3>

                <div className="space-y-4">
                  {[
                    { icon: FaCube, title: '3D Modeling', desc: 'Complex 3D models, sculptures, architectural renders' },
                    { icon: FaMagic, title: 'Heavy VFX', desc: 'Hollywood-level visual effects, complex simulations' },
                    { icon: FaFilm, title: 'Complex Animation', desc: 'Cartoon productions, animated movies, character rigging' }
                  ].map((limitation, idx) => (
                    <div key={idx} className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#2a1810]/60 to-[#1a0f0f]/40 border border-[#4a2c1a]/50 hover:border-[#ffa500]/40 transition-all duration-500 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/5 to-[#ffa500]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a0f0f] to-[#2a1810] border border-[#4a2c1a] flex items-center justify-center group-hover:border-[#ffa500]/50 transition-all duration-500">
                          <limitation.icon className="text-[#ffa500] text-xl" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-[#ffa500] transition-colors duration-300">
                            {limitation.title}
                          </h4>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {limitation.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Honesty Badge */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#041827]/80 to-[#001a1f]/60 border border-[#00E676]/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                      <FaHeart className="text-[#001313] text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Transparent & Honest</h4>
                      <p className="text-xs text-gray-300">I believe in setting clear expectations from the start</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center relative z-10">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                  <FaRocket className="text-[#001313] text-2xl" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white">Ready to Create Something Amazing?</h4>
                  <p className="text-gray-300">Let's bring your vision to life with the perfect blend of creativity and technology.</p>
                </div>
              </div>
              <button 
                onClick={scrollTo('#contact')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#0066cc] text-[#001313] font-bold hover:shadow-lg hover:shadow-[#00E676]/25 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#00E676]/30"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-pulse"></div>
              <div className="w-32 h-px bg-gradient-to-r from-[#00E676]/30 via-[#0066cc]/30 to-[#00E676]/30"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#0066cc] to-[#00E676] animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#0066cc]/30"></div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-16 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#00E676]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-[#0066cc]/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <SectionTitle className="relative z-10">
            <span className="bg-gradient-to-r from-[#00E676] to-[#0066cc] bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </SectionTitle>
          
          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {SKILLS.map((s, i) => {
              const SingleIcon = s.icon;
              return (
                <div 
                  key={i} 
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 hover:border-[#00E676]/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00E676]/10 backdrop-blur-sm"
                  style={{ animationDelay: `${i * 100}ms` }}
                  role="article"
                  aria-label={`${s.name} skill with ${s.years} experience`}
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00E676]/30 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute top-4 right-6 w-2 h-2 bg-[#0066cc]/40 rounded-full animate-ping delay-700"></div>
                    <div className="absolute bottom-6 left-8 w-3 h-3 bg-[#00E676]/20 rounded-full animate-pulse delay-1000"></div>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#0066cc]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00E676]/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#0066cc]/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-start gap-5 relative z-10">
                    {/* Icon Container */}
                    <div className="relative group/icon">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#001a1f] to-[#041827] border border-[#063042] group-hover:border-[#00E676]/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#00E676]/25" aria-hidden="true">
                        {Array.isArray(s.icons) ? (
                          <div className="flex items-center justify-center gap-1">
                            {s.icons.map((IconComp, idx) => (
                              <IconComp key={idx} className="text-[#00E676] text-lg group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${idx * 100}ms` }} />
                            ))}
                          </div>
                        ) : SingleIcon ? (
                          <SingleIcon className="text-[#00E676] text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                        ) : (
                          <div className="text-[#00E676] font-bold text-xl">{s.name.split(' ')[0][0]}</div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="font-bold text-lg text-white group-hover:text-[#00E676] transition-colors duration-300" role="heading" aria-level="3">
                        {s.name}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                        {s.years}
                      </div>
                      
                      {/* Progress Bar with Enhanced Animation */}
                      <div className="mt-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">Proficiency</span>
                          <span className="text-xs font-semibold text-[#00E676] group-hover:text-[#0066cc] transition-colors duration-300">
                            {s.pct}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-gradient-to-r from-[#001a1f] to-[#041827] rounded-full overflow-hidden border border-[#063042]/50">
                          {/* Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Progress Fill */}
                          <div 
                            className="skill-progress h-full bg-gradient-to-r from-[#00E676] via-[#00E676] to-[#0066cc] rounded-full relative overflow-hidden transition-all duration-1000 ease-out shadow-lg shadow-[#00E676]/25" 
                            data-pct={s.pct} 
                            style={{ width: '0%' }} 
                            role="progressbar" 
                            aria-valuenow="0" 
                            aria-valuemin="0" 
                            aria-valuemax="100" 
                            aria-label={`${s.name} skill level`}
                          >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>

                      {/* Skill Level Badge */}
                      <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 border border-[#00E676]/20 group-hover:border-[#00E676]/40 transition-all duration-300">
                        <div className="w-2 h-2 rounded-full bg-[#00E676] mr-2 animate-pulse"></div>
                        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                          {s.pct >= 85 ? 'Expert' : s.pct >= 70 ? 'Advanced' : 'Intermediate'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Decoration */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00E676]/30"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-spin-slow"></div>
              <div className="w-24 h-px bg-gradient-to-r from-[#00E676]/30 via-[#0066cc]/30 to-[#00E676]/30"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0066cc] to-[#00E676] animate-spin-slow"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#0066cc]/30"></div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-16 left-8 w-48 h-48 bg-gradient-to-r from-[#00E676]/15 to-[#0066cc]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-12 w-64 h-64 bg-gradient-to-r from-[#0066cc]/10 to-[#00E676]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-[#00E676]/8 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-20 right-20 w-6 h-6 border-2 border-[#00E676]/20 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-32 left-16 w-4 h-4 bg-[#0066cc]/30 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-8 w-8 h-8 border border-[#00E676]/30 rounded-full animate-pulse"></div>
          </div>

          <SectionTitle className="relative z-10 text-center">
            <span className="bg-gradient-to-r from-[#00E676] to-[#0066cc] bg-clip-text text-transparent">
              My Services
            </span>
            <div className="mt-2 text-lg text-gray-400 font-normal">
              Bringing Your Vision to Life
            </div>
          </SectionTitle>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10 mt-12">
            {SERVICES.map((s, i) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00E676]/20 backdrop-blur-sm overflow-hidden"
                style={{ animationDelay: `${i * 200}ms` }}
                role="article"
                aria-labelledby={`service-title-${i}`}
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`servicePattern${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="#00E676"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#servicePattern${i})`}/>
                  </svg>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce"></div>
                  <div className="absolute top-6 right-8 w-2 h-2 bg-[#00E676]/40 rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 left-6 w-3 h-3 bg-[#0066cc]/30 rounded-full animate-pulse"></div>
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#0066cc]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00E676]/30 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#0066cc]/30 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Service Content */}
                <div className="relative z-10">
                  {/* Icon Section */}
                  <div className="flex justify-center mb-6">
                    <div className="relative group/icon">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#001a1f] to-[#041827] border border-[#063042] group-hover:border-[#00E676]/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#00E676]/25" aria-hidden="true">
                        {s.icon ? (
                          <s.icon className="text-[#00E676] text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                        ) : (
                          <div className="text-[#00E676] font-bold text-2xl">{s.title[0]}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center mb-4">
                    <h3 id={`service-title-${i}`} className="text-xl font-bold text-white group-hover:text-[#00E676] transition-colors duration-300" role="heading" aria-level="3">
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="text-center mb-6">
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="space-y-2">
                      {getServiceFeatures(i).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] flex-shrink-0"></div>
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <button 
                      onClick={() => openService(i)} 
                      className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 border border-[#00E676]/30 text-[#00E676] hover:from-[#00E676]/20 hover:to-[#0066cc]/20 hover:border-[#00E676] transition-all duration-300 font-semibold group-hover:shadow-lg group-hover:shadow-[#00E676]/25 overflow-hidden"
                      aria-label={`Learn more about ${s.title} service`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Learn More
                        <div className="w-4 h-4 rounded-full border border-[#00E676] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#00E676] transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </div>
                      </span>
                      
                      {/* Button Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                    </button>
                  </div>
                </div>

                {/* Service Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 border border-[#00E676]/30 flex items-center justify-center text-xs font-bold text-[#00E676] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center relative z-10">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-[#00E676] animate-pulse"></div>
              <span className="text-gray-300 font-medium">Ready to start your project?</span>
              <button 
                onClick={scrollTo('#contact')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] text-[#001313] font-semibold hover:shadow-lg hover:shadow-[#00E676]/25 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00E676]/30"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-spin-slow"></div>
              <div className="w-24 h-px bg-gradient-to-r from-[#00E676]/30 via-[#0066cc]/30 to-[#00E676]/30"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0066cc] to-[#00E676] animate-spin-slow"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#0066cc]/30"></div>
            </div>
          </div>
        </section>

        {/* PROJECTS / PORTFOLIO - PREMIUM VERSION */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#0066cc]/5 to-[#00E676]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-[#00E676]/8 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="projectGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="m 60 0 l 0 60 l -60 0 l 0 -60 z" fill="none" stroke="#00E676" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#projectGrid)" />
              </svg>
            </div>
            
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#00E676] rounded-full opacity-20 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Enhanced Section Title */}
          <div className="relative z-10 text-center mb-16">
            <div className="relative inline-block">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 blur-xl rounded-full"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                      <FaPlay className="text-[#001313] text-xl" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00E676] via-white to-[#0066cc] bg-clip-text text-transparent">
                    Featured Projects
                  </h2>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc] to-[#00E676] rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-[#0066cc] to-[#00E676] flex items-center justify-center">
                      <FaVideo className="text-white text-xl" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00E676]"></div>
                  <div className="text-gray-400 text-lg font-medium tracking-wider">CREATIVE SHOWCASE</div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0066cc]"></div>
                </div>
                
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                  Explore my premium video editing projects featuring cutting-edge effects, 
                  <span className="text-[#00E676] font-semibold"> cinematic storytelling</span>, and 
                  <span className="text-[#0066cc] font-semibold"> professional production quality</span>
                </p>
              </div>
            </div>
          </div>

          {/* Premium Projects Container */}
          <div className="relative">
            {/* Enhanced Navigation Buttons */}
            <button 
              className="swiper-button-prev group absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-gradient-to-r from-[#041827]/90 to-[#063042]/90 border border-[#00E676]/30 text-[#00E676] hover:from-[#00E676]/20 hover:to-[#0066cc]/20 hover:border-[#00E676] hover:scale-110 transition-all duration-500 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00E676] shadow-lg hover:shadow-[#00E676]/25" 
              aria-label="View previous project"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaChevronLeft className="relative text-xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
            </button>
            
            <button 
              className="swiper-button-next group absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-gradient-to-r from-[#041827]/90 to-[#063042]/90 border border-[#0066cc]/30 text-[#0066cc] hover:from-[#0066cc]/20 hover:to-[#00E676]/20 hover:border-[#0066cc] hover:scale-110 transition-all duration-500 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#0066cc] shadow-lg hover:shadow-[#0066cc]/25" 
              aria-label="View next project"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/20 to-[#00E676]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaChevronRight className="relative text-xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
            </button>

            {/* Premium Swiper Container */}
            <div className="relative rounded-3xl p-2 bg-gradient-to-r from-[#021728]/60 via-[#041827]/60 to-[#021728]/60 border border-[#063042]/50 backdrop-blur-sm shadow-2xl">
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00E676]/5 via-transparent to-[#0066cc]/5 pointer-events-none"></div>
              
              <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                loop
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{ 
                  640: { slidesPerView: 2, spaceBetween: 24 }, 
                  1024: { slidesPerView: 3, spaceBetween: 28 },
                  1280: { slidesPerView: 3, spaceBetween: 32 }
                }}
                className="!pb-4"
              >
                {YOUTUBE_EMBEDS.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="group relative">
                      {/* Hover Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00E676]/30 via-[#0066cc]/30 to-[#00E676]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      
                      {/* Main Card */}
                      <div className="relative rounded-2xl overflow-hidden border border-[#083145] shadow-2xl bg-gradient-to-br from-[#02121b] via-[#041827] to-[#02121b] transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#00E676]/50">
                        
                        {/* Premium Video Container */}
                        <div className="relative overflow-hidden">
                          {/* Play Button Overlay - Non-blocking */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                            <div className="relative group/play">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-full blur animate-pulse"></div>
                              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform duration-300">
                                <FaPlay className="text-[#001313] text-lg ml-1" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Video Frame Enhancement */}
                          <div className="relative">
                            <iframe
                              title={`Premium Project ${idx + 1}`}
                              src={src}
                              className="w-full aspect-video transition-all duration-300 hover:scale-[1.01]"
                              frameBorder="0"
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                            
                            {/* Corner Decorations - Non-blocking */}
                            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#00E676]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#0066cc]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        {/* Enhanced Card Content */}
                        <div className="p-6 relative">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id={`cardPattern${idx}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                  <circle cx="10" cy="10" r="1" fill="#00E676"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill={`url(#cardPattern${idx})`} />
                            </svg>
                          </div>
                          
                          <div className="relative">
                            {/* Project Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-lg blur opacity-60 animate-pulse"></div>
                                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                                  <span className="text-[#001313] font-bold text-sm">{idx + 1}</span>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#00E676] transition-colors duration-300">
                                  Creative Project {idx + 1}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse"></div>
                                  <span className="text-sm text-gray-400 font-medium">Video Production</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Project Description */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                              Professional video editing showcase featuring advanced effects, 
                              <span className="text-[#00E676] font-medium"> cinematic transitions</span>, and 
                              <span className="text-[#0066cc] font-medium"> premium post-production</span> techniques.
                            </p>
                            
                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {[
                                { name: 'Premiere Pro', color: 'from-purple-500 to-pink-500' },
                                { name: 'After Effects', color: 'from-blue-500 to-cyan-500' },
                                { name: '4K Quality', color: 'from-green-500 to-emerald-500' }
                              ].map((tech, techIdx) => (
                                <div key={techIdx} className="relative group/tech">
                                  <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover/tech:opacity-30 transition-opacity duration-300`}></div>
                                  <div className="relative px-3 py-1 rounded-full bg-[#041827]/60 border border-[#063042] text-xs font-medium text-gray-300 hover:text-white transition-colors duration-300">
                                    {tech.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button 
                                onClick={() => window.open(YOUTUBE_CHANNEL, '_blank')}
                                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 border border-[#00E676]/30 text-[#00E676] hover:from-[#00E676]/20 hover:to-[#0066cc]/20 hover:border-[#00E676] transition-all duration-300 text-sm font-semibold group-hover:shadow-lg group-hover:shadow-[#00E676]/25"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <FaPlay className="text-xs" />
                                  Watch Now
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Progress Indicators */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {YOUTUBE_EMBEDS.map((_, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="w-3 h-3 rounded-full bg-[#063042] border border-[#083145] hover:bg-gradient-to-r hover:from-[#00E676] hover:to-[#0066cc] transition-all duration-300 group-hover:scale-125"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graphic Design 3D Stack */}
          <SectionTitle size="text-xl" className="mt-12">Graphic Design</SectionTitle>
          <GraphicDesignStack />

        {/* CERTIFICATES SECTION */}
        <section id="certificates" className="max-w-6xl mx-auto px-6 py-16">
          <SectionTitle>Certificates & Achievements</SectionTitle>
          <CertificatesCarousel />
        </section>
        </section>

        {/* ABOUT */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="about-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#00E676" strokeWidth="1"/>
                <circle cx="20" cy="20" r="5" fill="#00E676"/>
                <circle cx="80" cy="80" r="3" fill="#00E676"/>
                <path d="M30,70 Q50,50 70,70" stroke="#00E676" strokeWidth="1" fill="none"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#about-pattern)" />
            </svg>
          </div>

          <SectionTitle className="relative z-10">
            <span className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-full blur-sm opacity-60 animate-pulse"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                  <FaUser className="text-[#001313] text-lg" />
                </div>
              </div>
              About Me
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#00E676] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-[#0066cc] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-[#00E676] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </span>
          </SectionTitle>
          <div className="relative">
            {/* Floating background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#00E676]/5 to-[#0066cc]/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-[#0066cc]/5 to-[#00E676]/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-[#00E676]/3 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - My Journey */}
                <div className="flex-1 space-y-6">
                {/* Left Card - Enhanced with animations */}
                <div className="relative group">
              {/* Floating background elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00E676]/20 via-[#0066cc]/20 to-[#00E676]/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-all duration-1000 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00E676]/10 to-transparent rounded-full blur-xl animate-pulse"></div>
              
              <div className="relative rounded-xl p-6 bg-[#021728]/50 border border-[#063042] hover:border-[#00E676]/40 transition-all duration-500 backdrop-blur-sm">
                {/* Decorative corner elements */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00E676]/40 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0066cc]/40 animate-pulse"></div>
                
                {/* Story icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-lg blur opacity-60 animate-pulse"></div>
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                      <FaCode className="text-[#001313] text-sm" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white">My Journey</h3>
                </div>

                <p className="text-gray-200 leading-relaxed">
                  I'm currently studying <span className="text-[#00E676] font-semibold inline-flex items-center gap-1">
                    <FaGraduationCap className="text-sm" />
                    Software Engineering
                  </span> (5th semester) at COMSATS. I have experience with 
                  <span className="text-[#00E676] font-medium inline-flex items-center gap-1">
                    <FaVideo className="text-xs" />
                    Premiere, After Effects, Photoshop
                  </span> and I also build tools and automations with 
                  <span className="text-[#0066cc] font-medium inline-flex items-center gap-1">
                    <FaReact className="text-xs" />
                    React.js and Python
                  </span>. I have used AI tools like 
                  <span className="text-[#00E676] font-medium inline-flex items-center gap-1">
                    <FaRobot className="text-xs" />
                    VEO 3
                  </span> and worked with 
                  <span className="text-[#0066cc] font-medium inline-flex items-center gap-1">
                    <FaBrain className="text-xs" />
                    Gemini APIs
                  </span> for chatbots and creative pipelines.
                </p>
            <div className="rounded-xl p-6 bg-[#021728]/50 border border-[#063042]">
              <p>I’m currently studying Software Engineering (5th semester) at COMSATS. I have experience with Premiere, After Effects, Photoshop and I also build tools and automations with React.js and Python. I have used AI tools like VEO 3 and worked with Gemini APIs for chatbots and creative pipelines.</p>

              <div className="mt-4 flex gap-3 flex-wrap">
                {[
                  { lang: 'Urdu', icon: '🇵🇰', color: 'from-green-500 to-emerald-600' },
                  { lang: 'Hindi', icon: '🇮🇳', color: 'from-orange-500 to-red-600' },
                  { lang: 'English', icon: '🇺🇸', color: 'from-blue-500 to-indigo-600' }
                ].map((item, i) => (
                  <div key={item.lang} className="relative group/lang">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg blur opacity-0 group-hover/lang:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative text-sm px-3 py-2 rounded bg-[#00262b] border border-[#053141] hover:border-[#00E676]/40 transition-all duration-300 flex items-center gap-2 hover:transform hover:scale-105">
                      <span className="animate-pulse">{item.icon}</span>
                      {item.lang}
                    </div>
                  </div>
                ))}
              </div>
            </div>
              </div>

                {/* Right Column - Gear & Setup */}
                <div className="flex-1 space-y-6">
                {/* Right Card - Enhanced Gear & Setup */}
                <div className="relative group">
              {/* Floating particles */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-all duration-1000"></div>
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#0066cc]/10 to-transparent rounded-full blur-xl animate-pulse"></div>
              
              <div className="relative rounded-xl p-6 bg-[#021728]/50 border border-[#063042] hover:border-[#0066cc]/40 transition-all duration-500 backdrop-blur-sm">
                {/* Tech corner decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0066cc]/40 animate-pulse"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00E676]/40 animate-pulse"></div>
                
                {/* Enhanced header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc] to-[#667eea] rounded-lg blur opacity-60 animate-pulse"></div>
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-r from-[#0066cc] to-[#667eea] flex items-center justify-center">
                      <FaDesktop className="text-white text-sm" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white">Gear & Setup</h3>
                  <div className="ml-auto">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[#00E676] rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-[#0066cc] rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced gear list */}
                <ul className="mt-3 space-y-3">
                  {[
                    { text: 'High-end laptop & PC', icon: <FaLaptop className="text-[#00E676]" />, desc: 'Peak performance' },
                    { text: 'Quality audio & monitoring', icon: <FaHeadphones className="text-[#0066cc]" />, desc: 'Crystal clear' },
                    { text: 'Color-accurate display', icon: <FaDesktop className="text-[#00E676]" />, desc: 'Perfect visuals' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#041827]/40 border border-[#063042]/50 hover:border-[#0066cc]/30 transition-all duration-300 group/item">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/20 to-[#00E676]/20 rounded blur opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-200">{item.text}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </div>
                      <div className="w-2 h-2 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    </li>
                  ))}
                </ul>

                {/* Enhanced Education Section */}
                <div className="mt-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/5 to-[#0066cc]/5 rounded-lg"></div>
                  <div className="relative p-4 border border-[#063042] rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#0066cc] rounded blur opacity-60 animate-pulse"></div>
                        <div className="relative w-6 h-6 rounded bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                          <FaGraduationCap className="text-[#001313] text-xs" />
                        </div>
                      </div>
                      <div className="font-semibold text-white">Education</div>
                      <div className="ml-auto">
                        <div className="px-2 py-1 bg-[#00E676]/10 border border-[#00E676]/30 rounded-full text-xs text-[#00E676] animate-pulse">
                          Active
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUniversity className="text-[#0066cc] text-sm" />
                      <div className="text-sm text-gray-300">COMSATS — B.S. Software Engineering</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse"></div>
                      <div className="text-xs text-gray-400">(5th Semester - ongoing)</div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="max-w-6xl mx-auto px-6 py-16">
          <SectionTitle>Client Reviews</SectionTitle>
          
          <div className="relative overflow-hidden rounded-xl p-6 bg-[#021728]/50 border border-[#063042]">
            {/* Background SVG patterns */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="stars" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M25,10 L27,18 L35,18 L29,23 L31,31 L25,26 L19,31 L21,23 L15,18 L23,18 Z" fill="#00E676" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#stars)" />
              </svg>
            </div>
            
            {/* Reviews container with auto-scroll */}
            <div id="reviews-container" className="relative py-4">
              <div id="reviews-track" className="flex gap-6 animate-scroll">
                {/* Individual review cards with duplicates for seamless scrolling */}
                {[
                  // Define reviews array once
                  ...[
                    {
                      name: "Ahmed Khan",
                      image: "https://randomuser.me/api/portraits/men/32.jpg",
                      rating: 5,
                      message: "Syed's attention to detail in video editing is exceptional. He transformed my raw footage into a professional video that exceeded my expectations."
                    },
                    {
                      name: "Sarah Johnson",
                      image: "https://randomuser.me/api/portraits/women/44.jpg",
                      rating: 5,
                      message: "Working with Syed was a pleasure. His graphic design skills are top-notch, and he delivered exactly what I needed for my brand."
                    },
                    {
                      name: "Muhammad Ali",
                      image: "https://randomuser.me/api/portraits/men/22.jpg",
                      rating: 4,
                      message: "Great communication throughout the project. Syed is responsive and implements feedback quickly. Would definitely work with him again."
                    },
                    {
                      name: "Emma Wilson",
                      image: "https://randomuser.me/api/portraits/women/29.jpg",
                      rating: 5,
                      message: "The YouTube thumbnails Syed created for my channel increased my CTR by 40%! His understanding of what works on the platform is invaluable."
                    },
                    {
                      name: "Omar Farooq",
                      image: "https://randomuser.me/api/portraits/men/36.jpg",
                      rating: 5,
                      message: "Syed delivered my project ahead of schedule and with exceptional quality. His technical skills and creativity are impressive."
                    },
                    {
                      name: "Jessica Chen",
                      image: "https://randomuser.me/api/portraits/women/49.jpg",
                      rating: 4,
                      message: "The website Syed built for my small business looks professional and works perfectly. He was patient with my requests and made the process easy."
                    },
                    {
                      name: "Zain Abbas",
                      image: "https://randomuser.me/api/portraits/men/45.jpg",
                      rating: 5,
                      message: "Syed's video editing skills transformed my wedding footage into a beautiful memory. His attention to emotional moments was perfect."
                    },
                    {
                      name: "Michael Rodriguez",
                      image: "https://randomuser.me/api/portraits/men/67.jpg",
                      rating: 5,
                      message: "As a fellow creator, I appreciate Syed's technical expertise and creative vision. He helped optimize my workflow and improved my content quality."
                    }
                  ],
                  // Duplicate the same reviews to create a seamless loop
                  ...[
                    {
                      name: "Ahmed Khan",
                      image: "https://randomuser.me/api/portraits/men/32.jpg",
                      rating: 5,
                      message: "Syed's attention to detail in video editing is exceptional. He transformed my raw footage into a professional video that exceeded my expectations."
                    },
                    {
                      name: "Sarah Johnson",
                      image: "https://randomuser.me/api/portraits/women/44.jpg",
                      rating: 5,
                      message: "Working with Syed was a pleasure. His graphic design skills are top-notch, and he delivered exactly what I needed for my brand."
                    },
                    {
                      name: "Muhammad Ali",
                      image: "https://randomuser.me/api/portraits/men/22.jpg",
                      rating: 4,
                      message: "Great communication throughout the project. Syed is responsive and implements feedback quickly. Would definitely work with him again."
                    },
                    {
                      name: "Emma Wilson",
                      image: "https://randomuser.me/api/portraits/women/29.jpg",
                      rating: 5,
                      message: "The YouTube thumbnails Syed created for my channel increased my CTR by 40%! His understanding of what works on the platform is invaluable."
                    },
                    {
                      name: "Omar Farooq",
                      image: "https://randomuser.me/api/portraits/men/36.jpg",
                      rating: 5,
                      message: "Syed delivered my project ahead of schedule and with exceptional quality. His technical skills and creativity are impressive."
                    },
                    {
                      name: "Jessica Chen",
                      image: "https://randomuser.me/api/portraits/women/49.jpg",
                      rating: 4,
                      message: "The website Syed built for my small business looks professional and works perfectly. He was patient with my requests and made the process easy."
                    },
                    {
                      name: "Zain Abbas",
                      image: "https://randomuser.me/api/portraits/men/45.jpg",
                      rating: 5,
                      message: "Syed's video editing skills transformed my wedding footage into a beautiful memory. His attention to emotional moments was perfect."
                    },
                    {
                      name: "Michael Rodriguez",
                      image: "https://randomuser.me/api/portraits/men/67.jpg",
                      rating: 5,
                      message: "As a fellow creator, I appreciate Syed's technical expertise and creative vision. He helped optimize my workflow and improved my content quality."
                    }
                  ]
                ].map((review, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-[300px] p-5 rounded-lg bg-gradient-to-b from-[#031b29] to-[#021220] border border-[#063042] shadow-lg relative overflow-hidden group"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                      <svg viewBox="0 0 24 24" fill="#00E676">
                        <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5 pointer-events-none">
                      <svg viewBox="0 0 24 24" fill="#00E676">
                        <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
                      </svg>
                    </div>
                    
                    {/* Profile and rating */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="relative">
                        <img 
                          src={review.image} 
                          alt={`${review.name}'s profile`} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#00E676] group-hover:border-white transition-colors duration-300" 
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#031b29] rounded-full p-0.5 border border-[#063042]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00E676]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#00E676] transition-colors duration-300">{review.name}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < review.rating ? "#00E676" : "#2d3748"}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Review message */}
                    <div className="relative">
                      <svg className="absolute -top-2 -left-1 w-6 h-6 text-[#00E676] opacity-30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-sm text-gray-300 italic pl-5 relative z-10">"{review.message}"</p>
                    </div>
                    
                    {/* Bottom decoration */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="text-center mt-8">
               <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00E676] to-[#00c462] text-[#001313] font-semibold hover:shadow-lg hover:shadow-[#00E676]/20 transition-all duration-300 relative overflow-hidden group">
                 <span className="relative z-10 flex items-center justify-center gap-2">
                   <span>View All Reviews</span>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                 </span>
                 <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
               </button>
             </div>
           </div>
           
           {/* Pause animation on hover */}
           <style dangerouslySetInnerHTML={{ __html: `
             /* Pause animation on hover */
             #reviews-container:hover .animate-scroll {
               animation-play-state: paused;
             }
           ` }} />
         </section>
         
         {/* CONTACT */}
         <section id="contact" className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">
           {/* Background Effects */}
           <div className="absolute inset-0 pointer-events-none">
             {/* Animated Gradient Orbs */}
             <div className="absolute top-16 left-12 w-64 h-64 bg-gradient-to-r from-[#00E676]/15 to-[#0066cc]/10 rounded-full blur-3xl animate-pulse"></div>
             <div className="absolute bottom-20 right-16 w-80 h-80 bg-gradient-to-r from-[#0066cc]/10 to-[#00E676]/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
             <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-[#00E676]/8 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>

             {/* Floating Contact Icons */}
             <div className="absolute top-24 right-24 text-[#00E676]/20 text-3xl animate-bounce" style={{animationDelay: '1s'}}>
               <FaMapMarkerAlt />
             </div>
             <div className="absolute bottom-32 left-20 text-[#0066cc]/20 text-2xl animate-bounce" style={{animationDelay: '3s'}}>
               <FaWhatsapp />
             </div>
             <div className="absolute top-1/2 left-16 text-[#00E676]/20 text-2xl animate-bounce" style={{animationDelay: '5s'}}>
               <FaYoutube />
             </div>

             {/* Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.02]">
               <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="m 40 0 l 0 40 l -40 0 l 0 -40 z" fill="none" stroke="#00E676" strokeWidth="1"/>
                   </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#contactGrid)" />
               </svg>
             </div>
           </div>

           {/* Section Header */}
           <div className="text-center mb-16 relative z-10">
             <div className="inline-flex items-center gap-3 mb-4">
               <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00E676]/50"></div>
               <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-pulse"></div>
               <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#0066cc]/50"></div>
             </div>
             
             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00E676] to-[#0066cc] bg-clip-text text-transparent mb-4">
               Let's Create Together
             </h2>
             
             <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
               Ready to bring your vision to life? Let's discuss your project and create something amazing together.
             </p>
           </div>

           {/* Main Content Grid */}
           <div className="grid lg:grid-cols-2 gap-12 relative z-10">
             
             {/* Left Side - Contact Info & Social */}
             <div className="space-y-8">
               {/* Location Card */}
               <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00E676]/20 backdrop-blur-sm overflow-hidden">
                 {/* Card Background Pattern */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                   <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                     <pattern id="locationPattern" width="15" height="15" patternUnits="userSpaceOnUse">
                       <circle cx="7.5" cy="7.5" r="0.5" fill="#00E676"/>
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#locationPattern)"/>
                   </svg>
                 </div>

                 {/* Gradient Overlay on Hover */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#0066cc]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                 
                 {/* Corner Decorations */}
                 <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00E676]/30 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#0066cc]/30 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                 <div className="flex items-center gap-6 relative z-10">
                   <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#00E676]/20 to-[#0066cc]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#001a1f] to-[#041827] border border-[#063042] group-hover:border-[#00E676]/50 transition-all duration-500">
                       <FaMapMarkerAlt className="text-[#00E676] text-2xl group-hover:scale-110 transition-transform duration-300" />
                     </div>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-white group-hover:text-[#00E676] transition-colors duration-300">
                       Abbottabad, Pakistan
                     </div>
                     <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-1">
                       Available for remote & freelance work
                     </div>
                     <div className="flex items-center gap-2 mt-2">
                       <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></div>
                       <span className="text-sm text-gray-400">Online & Ready to Work</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Social Media Links */}
               <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 backdrop-blur-sm">
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                     <FaUsers className="text-[#001313] text-lg" />
                   </div>
                   Connect With Me
                 </h3>

                 <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                   {[
                     { icon: FaYoutube, color: 'text-[#ff2b2b]', url: YOUTUBE_CHANNEL, label: 'YouTube', bg: 'from-[#ff2b2b]/10 to-[#ff2b2b]/5' },
                     { icon: FaInstagram, color: 'text-[#E1306C]', url: INSTAGRAM_URL, label: 'Instagram', bg: 'from-[#E1306C]/10 to-[#E1306C]/5' },
                     { icon: FaLinkedinIn, color: 'text-[#0A66C2]', url: LINKEDIN_URL, label: 'LinkedIn', bg: 'from-[#0A66C2]/10 to-[#0A66C2]/5' },
                     { icon: FaGithub, color: 'text-white', url: GITHUB_URL, label: 'GitHub', bg: 'from-white/10 to-white/5' },
                     { icon: FaWhatsapp, color: 'text-[#25D366]', url: WHATSAPP_URL, label: 'WhatsApp', bg: 'from-[#25D366]/10 to-[#25D366]/5' }
                   ].map((social, idx) => (
                     <a 
                       key={idx}
                       href={social.url} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#001a1f] to-[#041827] border border-[#063042] hover:border-[#00E676]/40 transition-all duration-500 hover:transform hover:scale-110 hover:shadow-lg backdrop-blur-sm text-center"
                       aria-label={`Visit my ${social.label} profile`}
                     >
                       <div className={`absolute inset-0 bg-gradient-to-br ${social.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                       <div className="relative z-10">
                         <social.icon className={`${social.color} text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} />
                         <div className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                           {social.label}
                         </div>
                       </div>
                     </a>
                   ))}
                 </div>
               </div>

               {/* Quick Contact Options */}
               <div className="grid sm:grid-cols-2 gap-4">
                 <a 
                   href={WHATSAPP_URL}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative p-6 rounded-2xl bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm text-center"
                 >
                   <FaWhatsapp className="text-[#25D366] text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                   <div className="text-white font-semibold mb-1">Quick Chat</div>
                   <div className="text-sm text-gray-400">WhatsApp Me</div>
                 </a>

                 <a 
                   href={`mailto:tahasyed225@gmail.com`}
                   className="group relative p-6 rounded-2xl bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/10 border border-[#00E676]/30 hover:border-[#00E676] transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm text-center"
                 >
                   <FaUser className="text-[#00E676] text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                   <div className="text-white font-semibold mb-1">Email Direct</div>
                   <div className="text-sm text-gray-400">tahasyed225@gmail.com</div>
                 </a>
               </div>
             </div>

             {/* Right Side - Contact Form */}
             <div className="relative">
               <form onSubmit={handleContact} className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#041827]/80 to-[#001a1f]/60 border border-[#063042]/50 hover:border-[#00E676]/40 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                 {/* Form Background Pattern */}
                 <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                   <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                     <pattern id="formPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                       <circle cx="10" cy="10" r="1" fill="#0066cc"/>
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#formPattern)"/>
                   </svg>
                 </div>

                 {/* Gradient Overlay on Hover */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/3 to-[#0066cc]/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                 
                 {/* Form Header */}
                 <div className="relative z-10 mb-8">
                   <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                       <FaUser className="text-[#001313] text-lg" />
                     </div>
                     Send a Message
                   </h3>
                   <p className="text-gray-400">Fill out the form below and I'll get back to you within 24 hours.</p>
                 </div>

                 {/* Form Fields */}
                 <div className="space-y-6 relative z-10">
                   {/* Name Field */}
                   <div className="relative group/field">
                     <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                     <div className="relative">
                       <input 
                         name="name" 
                         placeholder="Enter your full name" 
                         className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#001a1f]/60 to-[#041827]/40 border border-[#063042] focus:border-[#00E676] focus:ring-2 focus:ring-[#00E676]/20 transition-all duration-300 text-white placeholder-gray-300 backdrop-blur-sm" 
                         required 
                       />
                       <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00E676]/5 to-[#0066cc]/5 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                   </div>

                   {/* Email Field */}
                   <div className="relative group/field">
                     <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                     <div className="relative">
                       <input 
                         name="email" 
                         type="email" 
                         placeholder="your.email@example.com" 
                         className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#001a1f]/60 to-[#041827]/40 border border-[#063042] focus:border-[#00E676] focus:ring-2 focus:ring-[#00E676]/20 transition-all duration-300 text-white placeholder-gray-300 backdrop-blur-sm" 
                         required 
                       />
                       <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00E676]/5 to-[#0066cc]/5 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                   </div>

                   {/* Message Field */}
                   <div className="relative group/field">
                     <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                     <div className="relative">
                       <textarea 
                         name="message" 
                         rows={5} 
                         placeholder="Tell me about your project, timeline, and any specific requirements..." 
                         className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#001a1f]/60 to-[#041827]/40 border border-[#063042] focus:border-[#00E676] focus:ring-2 focus:ring-[#00E676]/20 transition-all duration-300 text-white placeholder-gray-300 backdrop-blur-sm resize-none" 
                         required 
                       />
                       <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00E676]/5 to-[#0066cc]/5 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                   </div>

                   {/* Submit Button */}
                   <button 
                     type="submit" 
                     disabled={sending}
                     onClick={() => playSound('click')}
                     className="relative w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#0066cc] text-[#001313] font-bold hover:shadow-lg hover:shadow-[#00E676]/25 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group/btn"
                   >
                     <span className="relative z-10 flex items-center justify-center gap-3">
                       {sending ? (
                         <>
                           <div className="w-5 h-5 border-2 border-[#001313] border-t-transparent rounded-full animate-spin"></div>
                           Sending Message...
                         </>
                       ) : (
                         <>
                           <FaUser className="text-lg" />
                           Send Message
                         </>
                       )}
                     </span>
                     
                     {/* Button Shimmer Effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                   </button>
                 </div>
               </form>
             </div>
           </div>

           {/* Bottom Decoration */}
           <div className="mt-16 flex justify-center relative z-10">
             <div className="flex items-center gap-4">
               <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#00E676]/30"></div>
               <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#00E676] to-[#0066cc] animate-pulse"></div>
               <div className="w-32 h-px bg-gradient-to-r from-[#00E676]/30 via-[#0066cc]/30 to-[#00E676]/30"></div>
               <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#0066cc] to-[#00E676] animate-pulse"></div>
               <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#0066cc]/30"></div>
             </div>
           </div>
         </section>

        {/* PREMIUM FOOTER */}
        <footer className="relative bg-gradient-to-b from-[#02121b] to-[#000811] border-t border-[#083145]/50 mt-12 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-8 left-8 w-48 h-48 bg-gradient-to-r from-[#00E676]/10 to-[#0066cc]/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-64 h-64 bg-gradient-to-r from-[#0066cc]/8 to-[#00E676]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-[#00E676]/6 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>

            {/* Floating Tech Elements */}
            <div className="absolute top-12 right-24 text-[#00E676]/10 text-2xl animate-bounce" style={{animationDelay: '1s'}}>
              <SiAdobephotoshop />
            </div>
            <div className="absolute bottom-20 left-32 text-[#0066cc]/10 text-xl animate-bounce" style={{animationDelay: '3s'}}>
              <SiReact />
            </div>
            <div className="absolute top-1/3 right-1/4 text-[#00E676]/10 text-xl animate-bounce" style={{animationDelay: '5s'}}>
              <SiAdobeaftereffects />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="footerGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="m 50 0 l 0 50 l -50 0 l 0 -50 z" fill="none" stroke="#00E676" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#footerGrid)" />
              </svg>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                      <FaUser className="text-[#001313] text-xl" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        Syed <span className="bg-gradient-to-r from-[#00E676] to-[#0066cc] bg-clip-text text-transparent">Taha</span>
                      </div>
                      <div className="text-sm text-gray-400">Creative Digital Artist</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed max-w-md">
                    Video editor, graphic designer and YouTuber passionate about creating visuals that tell stories and move audiences. 
                    Let's bring your creative vision to life together.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 backdrop-blur-sm">
                      <div className="text-lg font-bold text-[#00E676]">3+</div>
                      <div className="text-xs text-gray-400">Years Exp</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 backdrop-blur-sm">
                      <div className="text-lg font-bold text-[#0066cc]">50+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#041827]/60 to-[#001a1f]/40 border border-[#063042]/50 backdrop-blur-sm">
                      <div className="text-lg font-bold text-[#00E676]">24/7</div>
                      <div className="text-xs text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                    <FaArrowUp className="text-[#001313] text-xs" />
                  </div>
                  Quick Navigation
                </h3>
                
                <div className="space-y-3">
                  {[
                    { name: 'About Me', href: '#about', icon: FaUser },
                    { name: 'My Skills', href: '#skills', icon: FaCode },
                    { name: 'Services', href: '#services', icon: FaPaintBrush },
                    { name: 'Projects', href: '#projects', icon: FaVideo },
                    { name: 'Contact', href: '#contact', icon: FaMapMarkerAlt }
                  ].map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.href} 
                      onClick={scrollTo(link.href)}
                      className="group flex items-center gap-3 text-gray-400 hover:text-[#00E676] transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#001a1f] to-[#041827] border border-[#063042] flex items-center justify-center group-hover:border-[#00E676]/50 transition-all duration-300">
                        <link.icon className="text-xs group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="group-hover:font-semibold transition-all duration-300">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact & Social */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#00E676] to-[#0066cc] flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[#001313] text-xs" />
                  </div>
                  Get In Touch
                </h3>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#001a1f] to-[#041827] border border-[#063042] flex items-center justify-center">
                      <FaMapMarkerAlt className="text-[#00E676] text-xs" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Abbottabad, Pakistan</div>
                      <div className="text-xs text-gray-400">Remote Worldwide</div>
                    </div>
                  </div>

                  <a 
                    href="mailto:tahasyed225@gmail.com" 
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#00E676] transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#001a1f] to-[#041827] border border-[#063042] group-hover:border-[#00E676]/50 flex items-center justify-center transition-all duration-300">
                      <FaUser className="text-[#00E676] text-xs group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold group-hover:text-[#00E676] transition-colors duration-300">Email Me</div>
                      <div className="text-xs text-gray-400">tahasyed225@gmail.com</div>
                    </div>
                  </a>
                </div>

                {/* Social Media */}
                <div>
                  <div className="text-sm font-semibold text-gray-300 mb-3">Follow My Journey</div>
                  <div className="flex gap-3">
                    {[
                      { icon: FaYoutube, color: 'text-[#ff2b2b]', url: YOUTUBE_CHANNEL, bg: 'from-[#ff2b2b]/20 to-[#ff2b2b]/10' },
                      { icon: FaInstagram, color: 'text-[#E1306C]', url: INSTAGRAM_URL, bg: 'from-[#E1306C]/20 to-[#E1306C]/10' },
                      { icon: FaLinkedinIn, color: 'text-[#0A66C2]', url: LINKEDIN_URL, bg: 'from-[#0A66C2]/20 to-[#0A66C2]/10' },
                      { icon: FaGithub, color: 'text-white', url: GITHUB_URL, bg: 'from-white/20 to-white/10' },
                      { icon: FaWhatsapp, color: 'text-[#25D366]', url: WHATSAPP_URL, bg: 'from-[#25D366]/20 to-[#25D366]/10' }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative w-10 h-10 rounded-xl bg-gradient-to-r from-[#001a1f] to-[#041827] border border-[#063042] hover:border-[#00E676]/50 flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${social.bg} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <social.icon className={`relative z-10 ${social.color} text-lg group-hover:scale-110 transition-transform duration-300`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-[#063042]/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <div className="text-center md:text-left">
                  <div className="text-gray-300 text-sm">
                    © {new Date().getFullYear()} <span className="font-semibold text-[#00E676]">Syed Taha</span>. All rights reserved.
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Crafted with ❤️ and lots of creativity • Built with React & Tailwind CSS
                  </div>
                </div>

                {/* Back to Top */}
                <button 
                  onClick={scrollTop} 
                  className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E676] to-[#0066cc] text-[#001313] font-semibold hover:shadow-lg hover:shadow-[#00E676]/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FaArrowUp className="group-hover:scale-110 transition-transform duration-300" />
                    Back to Top
                  </span>
                  
                  {/* Button Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent"></div>
        </footer>

      </main>

      {/* Photoshop Lightbox */}
      {psIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={closePhotoshopLightbox}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={PHOTOSHOP_PROJECTS[psIndex].src}
              alt={PHOTOSHOP_PROJECTS[psIndex].title}
              className="w-full max-h-[80vh] object-contain select-none"
              style={{ transform: `scale(${psZoom})` }}
            />
            
            {/* Project Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
              <h3 className="text-xl font-bold text-white">{PHOTOSHOP_PROJECTS[psIndex].title}</h3>
              <p className="text-gray-200 mt-1">{PHOTOSHOP_PROJECTS[psIndex].description}</p>
            </div>

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={zoomOut} className="p-2 rounded bg-[#001a1f] border border-[#063042] text-white"><FaSearchMinus /></button>
              <button onClick={zoomIn} className="p-2 rounded bg-[#001a1f] border border-[#063042] text-white"><FaSearchPlus /></button>
              <button onClick={closePhotoshopLightbox} className="p-2 rounded bg-[#3b0b0b] border border-[#5a1a1a] text-white"><FaTimes /></button>
            </div>

            <button onClick={prevPhotoshop} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#001a1f] border border-[#063042] text-[#00E676]"><FaChevronLeft /></button>
            <button onClick={nextPhotoshop} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#001a1f] border border-[#063042] text-[#00E676]"><FaChevronRight /></button>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {serviceModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081822] rounded-xl max-w-xl w-full p-6 border border-[#083145]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{SERVICES[serviceModal].title}</h3>
                <p className="text-sm text-gray-300 mt-2">{SERVICES[serviceModal].desc}</p>
              </div>
              <button onClick={closeService} className="text-gray-400 px-3 py-1">Close</button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#021728]/40 p-4 border border-[#063042]">Want a custom video edit? I can handle cuts, grading and sound design to match your vibe.</div>
              <div className="rounded-lg bg-[#021728]/40 p-4 border border-[#063042]">Need graphics? Thumbnails, banners and motion assets ready for your channel.</div>
            </div>

            <div className="mt-6 text-right">
              <a href="#contact" onClick={() => { closeService(); scrollTo('#contact')(); }} className="px-4 py-2 rounded bg-[#00E676] text-[#001313]">Contact</a>
            </div>
          </div>
        </div>
      )}

      {/* Sound Status Indicator (Development) */}
      {soundInitialized && (
        <div className="fixed bottom-20 right-5 z-40 bg-black/50 backdrop-blur-sm p-2 rounded text-xs text-white">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSoundMuted ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span>Sound: {isSoundMuted ? 'OFF' : 'ON'}</span>
            {ambientPlaying && !isSoundMuted && (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span>Ambient</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Back to top floating */}
      {showTop && (
        <button onClick={scrollTop} aria-label="Back to top" className="fixed right-5 bottom-5 z-50 bg-[#00E676] p-3 rounded-full shadow-lg">
          <FaArrowUp />
        </button>
      )}

      {/* Custom Cursor – Premiere Pro vibe (Opt-in for Performance) */}
      {enableCursor && !showNativeCursor && customCursorEnabled && (
        <div
          className="pointer-events-none fixed z-[9999] will-change-transform"
          style={{ 
            left: `${cursor.x}px`, 
            top: `${cursor.y}px`,
            transform: 'translate3d(0, 0, 0)' // GPU acceleration
          }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              transform: `translate(-35%, -35%) scale(${cursorHoverInteractive ? (cursorDown ? 0.95 : 1.1) : (cursorDown ? 0.95 : 1)}) rotate(-8deg)`,
              transition: 'transform 100ms ease-out', // Reduced from 120ms for better performance
            }}
          >
            {cursorHoverMedia ? (
              <FaCut
                style={{ color: PREMIERE_PURPLE, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
                className="text-2xl"
              />
            ) : cursorHoverInteractive ? (
              <FaHandPointer
                style={{ color: PREMIERE_PURPLE, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
                className="text-2xl"
              />
            ) : (
              <FaMousePointer
                style={{ color: PREMIERE_PURPLE, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
                className="text-2xl"
              />
            )}
          </div>
        </div>
      )}

      {/* Gemini Chatbot */}
      <GeminiChatbot />

      {/* Easter Eggs Component */}
      <EasterEggs />

      <ToastContainer position="bottom-right" />
    </div>
  );
}
