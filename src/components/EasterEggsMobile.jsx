import React, { useState, useEffect, useRef } from 'react';
import { FaRocket, FaGift, FaCoffee, FaCode, FaHeart, FaMagic, FaGamepad, FaStar, FaMobile } from 'react-icons/fa';

const EasterEggsMobile = () => {
  const [konami, setKonami] = useState([]);
  const [tripleClick, setTripleClick] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [unicornMode, setUnicornMode] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [secretCursor, setSecretCursor] = useState(false);
  const [particles, setParticles] = useState([]);
  const [secretMessage, setSecretMessage] = useState('');
  const [showSecretPanel, setShowSecretPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [swipeStart, setSwipeStart] = useState(null);
  const [shakingEnabled, setShakingEnabled] = useState(false);
  const [lastShake, setLastShake] = useState(0);
  
  const clickTimeoutRef = useRef(null);
  const matrixIntervalRef = useRef(null);
  const partyIntervalRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Easter Egg 1: Five finger tap
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e) => {
      if (e.touches.length === 5) {
        activateMobileSecretMode();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [isMobile]);

  // Mobile Easter Egg 2: Rapid tap (7 times quickly)
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchEnd = () => {
      const now = Date.now();
      
      if (now - lastTap < 300) {
        setTouchCount(prev => prev + 1);
        
        if (touchCount >= 6) {
          activateRapidTapMode();
          setTouchCount(0);
        }
      } else {
        setTouchCount(1);
      }
      
      setLastTap(now);
    };

    document.addEventListener('touchend', handleTouchEnd);
    return () => document.removeEventListener('touchend', handleTouchEnd);
  }, [isMobile, touchCount, lastTap]);

  // Mobile Easter Egg 3: Swipe pattern (up, down, left, right, up)
  useEffect(() => {
    if (!isMobile) return;

    let swipePattern = [];
    
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        setSwipeStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now()
        });
      }
    };

    const handleTouchEnd = (e) => {
      if (!swipeStart || e.changedTouches.length !== 1) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - swipeStart.x;
      const deltaY = endY - swipeStart.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 50) {
        let direction;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }

        swipePattern.push(direction);
        
        // Secret pattern: up, down, left, right, up
        const secretPattern = ['up', 'down', 'left', 'right', 'up'];
        
        if (swipePattern.length > secretPattern.length) {
          swipePattern.shift();
        }
        
        if (JSON.stringify(swipePattern) === JSON.stringify(secretPattern)) {
          activateSwipeMode();
          swipePattern = [];
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, swipeStart]);

  // Mobile Easter Egg 4: Device shake detection
  useEffect(() => {
    if (!isMobile) return;

    const handleMotion = (e) => {
      const acceleration = e.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      if (magnitude > 25) {
        const now = Date.now();
        if (now - lastShake > 1000) {
          activateShakeMode();
          setLastShake(now);
        }
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
      setShakingEnabled(true);
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, [isMobile, lastShake]);

  // Mobile Easter Egg 5: Long press (3 seconds)
  useEffect(() => {
    if (!isMobile) return;

    let longPressTimer;

    const handleTouchStart = () => {
      longPressTimer = setTimeout(() => {
        activateLongPressMode();
      }, 3000);
    };

    const handleTouchEnd = () => {
      clearTimeout(longPressTimer);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchEnd);
      clearTimeout(longPressTimer);
    };
  }, [isMobile]);

  // Mobile Easter Egg 6: Pinch gesture
  useEffect(() => {
    if (!isMobile) return;

    let lastDistance = 0;
    let pinchCount = 0;

    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const distance = getDistance(e.touches);
        
        if (lastDistance > 0) {
          const delta = distance - lastDistance;
          if (Math.abs(delta) > 50) {
            pinchCount++;
            if (pinchCount >= 3) {
              activatePinchMode();
              pinchCount = 0;
            }
          }
        }
        
        lastDistance = distance;
      } else {
        lastDistance = 0;
        pinchCount = 0;
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, [isMobile]);

  // Desktop Easter Eggs (same as before)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.code];
      
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      
      setKonami(newKonami);
      
      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        activateSecretMode();
        setKonami([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami, isMobile]);

  // Mobile-specific activation functions
  const activateMobileSecretMode = () => {
    setSecretMode(true);
    setSecretMessage('📱 FIVE FINGER TAP! Mobile ninja detected!');
    setShowSecretPanel(true);
    createMobileFireworks();
    
    setTimeout(() => {
      setSecretMode(false);
      setShowSecretPanel(false);
    }, 5000);
  };

  const activateRapidTapMode = () => {
    setPartyMode(true);
    setSecretMessage('⚡ RAPID TAP MASTER! 7 taps detected!');
    setShowSecretPanel(true);
    createMobileConfetti();
    
    setTimeout(() => {
      setPartyMode(false);
      setShowSecretPanel(false);
    }, 3000);
  };

  const activateSwipeMode = () => {
    setMatrixMode(true);
    setSecretMessage('👆 SWIPE MASTER! Secret pattern unlocked!');
    setShowSecretPanel(true);
    createMobileMatrix();
    
    setTimeout(() => {
      setMatrixMode(false);
      setShowSecretPanel(false);
    }, 5000);
  };

  const activateShakeMode = () => {
    setUnicornMode(true);
    setSecretMessage('🤳 SHAKE IT! Device motion detected!');
    setShowSecretPanel(true);
    createShakeEffect();
    
    setTimeout(() => {
      setUnicornMode(false);
      setShowSecretPanel(false);
    }, 4000);
  };

  const activateLongPressMode = () => {
    setDevMode(true);
    setSecretMessage('⏰ PATIENCE MASTER! 3-second long press!');
    setShowSecretPanel(true);
    createLongPressEffect();
    
    setTimeout(() => {
      setDevMode(false);
      setShowSecretPanel(false);
    }, 4000);
  };

  const activatePinchMode = () => {
    setSecretCursor(true);
    setSecretMessage('🤏 PINCH MASTER! Zoom gestures detected!');
    setShowSecretPanel(true);
    createPinchEffect();
    
    setTimeout(() => {
      setSecretCursor(false);
      setShowSecretPanel(false);
    }, 4000);
  };

  // Desktop activation functions (simplified versions)
  const activateSecretMode = () => {
    setSecretMode(true);
    setSecretMessage('🎮 KONAMI CODE ACTIVATED! Classic gamer detected!');
    setShowSecretPanel(true);
    createFireworks();
    
    setTimeout(() => {
      setSecretMode(false);
      setShowSecretPanel(false);
    }, 5000);
  };

  // Mobile-optimized particle effects
  const createMobileFireworks = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 12 + 6,
      life: 1,
      type: 'mobile-firework'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const createMobileConfetti = () => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 8 + 4,
      life: 1,
      type: 'mobile-confetti'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 4000);
  };

  const createMobileMatrix = () => {
    const chars = '01📱💻🚀⚡🎮';
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -20,
      char: chars[Math.floor(Math.random() * chars.length)],
      color: '#00ff00',
      size: Math.random() * 20 + 16,
      life: 1,
      type: 'mobile-matrix'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 5000);
  };

  const createShakeEffect = () => {
    const emojis = ['🌈', '⭐', '✨', '💫', '🎊', '🎉'];
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: emojis[Math.floor(Math.random() * emojis.length)],
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 16 + 12,
      life: 1,
      type: 'shake-effect'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 4000);
  };

  const createLongPressEffect = () => {
    const codeEmojis = ['💻', '⌨️', '🖱️', '📱', '⚡', '🚀'];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      char: codeEmojis[Math.floor(Math.random() * codeEmojis.length)],
      color: '#00ff88',
      size: Math.random() * 18 + 14,
      life: 1,
      type: 'longpress-effect'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 5000);
  };

  const createPinchEffect = () => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: '#ff6b6b',
      size: Math.random() * 20 + 10,
      life: 1,
      type: 'pinch-effect'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const createFireworks = () => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 10 + 4,
      life: 1,
      type: 'firework'
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  return (
    <>
      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute transition-all duration-200"
            style={{
              left: particle.x,
              top: particle.y,
              color: particle.color,
              fontSize: particle.size,
              opacity: particle.life,
              fontFamily: particle.type?.includes('matrix') ? 'monospace' : 'inherit',
              textShadow: particle.type?.includes('matrix') ? '0 0 10px #00ff00' : 'none'
            }}
          >
            {particle.type === 'firework' && '✨'}
            {particle.type === 'mobile-firework' && '🎆'}
            {particle.type === 'mobile-confetti' && '🎊'}
            {particle.type === 'mobile-matrix' && particle.char}
            {particle.type === 'shake-effect' && particle.char}
            {particle.type === 'longpress-effect' && particle.char}
            {particle.type === 'pinch-effect' && '🤏'}
          </div>
        ))}
      </div>

      {/* Secret Panel */}
      {showSecretPanel && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 backdrop-blur-xl border-2 border-purple-500 rounded-2xl p-6 text-center animate-bounce max-w-sm mx-4">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
            🎉 EASTER EGG FOUND! 🎉
          </div>
          <div className="text-sm md:text-base text-white mb-3">
            {secretMessage}
          </div>
          <div className="flex justify-center gap-3 text-xl">
            <FaGift className="text-yellow-400 animate-spin" />
            <FaMagic className="text-purple-400 animate-pulse" />
            <FaStar className="text-blue-400 animate-bounce" />
            {isMobile && <FaMobile className="text-green-400 animate-ping" />}
          </div>
        </div>
      )}

      {/* Mobile/Desktop Instruction Panel */}
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-xl border border-gray-600 rounded-lg p-3 text-xs text-gray-300 max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300 z-40">
        <div className="font-bold text-purple-400 mb-2">🥚 Easter Egg Hints:</div>
        {isMobile ? (
          <>
            <div>📱 MOBILE GESTURES:</div>
            <div>• Five finger tap</div>
            <div>• Rapid tap (7x quickly)</div>
            <div>• Swipe: ↑↓←→↑</div>
            <div>• Shake device</div>
            <div>• Long press (3 sec)</div>
            <div>• Pinch zoom 3x</div>
          </>
        ) : (
          <>
            <div>💻 DESKTOP CONTROLS:</div>
            <div>• Konami Code: ↑↑↓↓←→←→BA</div>
            <div>• Triple click anywhere</div>
            <div>• Arrow keys: →←→↑↓</div>
            <div>• Type: "unicorn", "developer"</div>
            <div>• Move mouse super fast</div>
          </>
        )}
        <div className="text-yellow-400 mt-2">Happy hunting! 🕵️‍♂️</div>
      </div>

      {/* Special Effects Overlays */}
      {secretMode && (
        <div className="fixed inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 animate-pulse pointer-events-none z-30" />
      )}

      {matrixMode && (
        <div className="fixed inset-0 bg-black/30 pointer-events-none z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-black/50" />
        </div>
      )}

      {unicornMode && (
        <div className="fixed inset-0 bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-blue-900/20 animate-pulse pointer-events-none z-30" />
      )}
    </>
  );
};

export default EasterEggsMobile;
