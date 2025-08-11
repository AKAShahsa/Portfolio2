// Sound Manager for Portfolio
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.ambientVolume = 0.3;
    this.effectsVolume = 0.5;
    this.isInitialized = false;
    this.currentAmbientSource = null; // Track current ambient sound source
    this.ambientAudio = null; // Direct HTML audio element for ambient music
    
    // Sound URLs - using your downloaded ambient music
    this.soundUrls = {
      hover: '/sounds/hover.mp3',
      click: '/sounds/click.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      ambient: '/src/utils/inspiring-cinematic-ambient-255033.mp3', // Your downloaded ambient music
      notification: '/sounds/notification.mp3',
      whoosh: '/sounds/whoosh.mp3'
    };
  }

  // Initialize sound system
  async init() {
    if (this.isInitialized) return;
    
    try {
      // Create audio context for better control
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Setup dedicated ambient audio
      this.setupAmbientAudio();
      
      // Load sounds
      await this.loadSounds();
      
      // Create ambient sound loop
      this.setupAmbientSound();
      
      this.isInitialized = true;
      console.log('Sound Manager initialized');
    } catch (error) {
      console.warn('Sound initialization failed:', error);
    }
  }

  // Setup dedicated ambient audio element
  setupAmbientAudio() {
    this.ambientAudio = new Audio();
    this.ambientAudio.loop = true;
    this.ambientAudio.volume = this.ambientVolume;
    this.ambientAudio.preload = 'auto';
    
    // Try multiple potential paths for the ambient music
    const ambientPaths = [
      '/src/utils/inspiring-cinematic-ambient-255033.mp3',
      'src/utils/inspiring-cinematic-ambient-255033.mp3',
      './src/utils/inspiring-cinematic-ambient-255033.mp3',
      '/utils/inspiring-cinematic-ambient-255033.mp3'
    ];
    
    let pathIndex = 0;
    const tryNextPath = () => {
      if (pathIndex < ambientPaths.length) {
        console.log(`Trying ambient music path: ${ambientPaths[pathIndex]}`);
        this.ambientAudio.src = ambientPaths[pathIndex];
        pathIndex++;
      } else {
        console.warn('All ambient music paths failed, will use fallback');
        this.ambientAudio = null;
      }
    };
    
    this.ambientAudio.addEventListener('canplaythrough', () => {
      console.log('Ambient music loaded successfully!');
    }, { once: true });
    
    this.ambientAudio.addEventListener('error', (e) => {
      console.warn(`Failed to load ambient music from ${ambientPaths[pathIndex-1]}:`, e);
      tryNextPath();
    }, { once: true });
    
    // Start trying to load
    tryNextPath();
  }

  // Load all sound files
  async loadSounds() {
    const loadPromises = Object.entries(this.soundUrls).map(async ([key, url]) => {
      try {
        console.log(`Loading sound: ${key} from ${url}`);
        const audio = new Audio();
        audio.preload = 'auto';
        audio.volume = key === 'ambient' ? this.ambientVolume : this.effectsVolume;
        
        // For ambient sound, set it to loop
        if (key === 'ambient') {
          audio.loop = true;
        }
        
        // Create fallback sounds using Web Audio API if files don't exist
        this.sounds[key] = audio;
        
        // Try to load the actual file, fallback to generated sound
        return new Promise((resolve) => {
          audio.addEventListener('canplaythrough', () => {
            console.log(`Successfully loaded ${key} sound`);
            resolve();
          }, { once: true });
          audio.addEventListener('error', (e) => {
            console.warn(`Failed to load ${key} sound from ${url}, using fallback:`, e);
            // Generate fallback sound
            this.sounds[key] = this.generateFallbackSound(key);
            resolve();
          }, { once: true });
          
          audio.src = url;
        });
      } catch (error) {
        console.warn(`Error loading ${key} sound:`, error);
        // Generate fallback sound
        this.sounds[key] = this.generateFallbackSound(key);
      }
    });

    await Promise.all(loadPromises);
  }

  // Generate fallback sounds using Web Audio API
  generateFallbackSound(type) {
    if (!this.audioContext) return null;

    const duration = type === 'ambient' ? 10 : 0.2;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Generate different sounds based on type
    for (let i = 0; i < channelData.length; i++) {
      const t = i / sampleRate;
      
      switch (type) {
        case 'hover':
          channelData[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 10) * 0.1;
          break;
        case 'click':
          channelData[i] = Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-t * 15) * 0.2;
          break;
        case 'success':
          channelData[i] = (Math.sin(2 * Math.PI * 600 * t) + Math.sin(2 * Math.PI * 800 * t)) * Math.exp(-t * 5) * 0.15;
          break;
        case 'error':
          channelData[i] = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 8) * 0.2;
          break;
        case 'ambient':
          // Simple ambient drone
          channelData[i] = (Math.sin(2 * Math.PI * 220 * t) * 0.05 + 
                           Math.sin(2 * Math.PI * 330 * t) * 0.03) * 
                           (1 + Math.sin(2 * Math.PI * 0.1 * t) * 0.2);
          break;
        case 'notification':
          channelData[i] = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 12) * 0.08;
          break;
        case 'whoosh':
          channelData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 8) * 0.1;
          break;
        default:
          channelData[i] = Math.sin(2 * Math.PI * 440 * t) * Math.exp(-t * 10) * 0.1;
      }
    }

    return buffer;
  }

  // Play a sound effect
  play(soundType, volume = 1) {
    if (this.isMuted || !this.isInitialized) return;

    try {
      const sound = this.sounds[soundType];
      if (!sound) return;

      if (sound instanceof AudioBuffer) {
        // Play generated sound
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = sound;
        gainNode.gain.value = volume * this.effectsVolume;
        
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start();
      } else {
        // Play audio file
        sound.currentTime = 0;
        sound.volume = volume * this.effectsVolume;
        sound.play().catch(e => console.warn('Audio play failed:', e));
      }
    } catch (error) {
      console.warn('Sound play failed:', error);
    }
  }

  // Setup ambient sound
  setupAmbientSound() {
    const ambientSound = this.sounds.ambient;
    if (ambientSound && ambientSound instanceof Audio) {
      ambientSound.volume = this.ambientVolume;
      ambientSound.loop = true;
    }
  }

  // Start ambient sound
  async startAmbient() {
    console.log('startAmbient called, muted:', this.isMuted, 'initialized:', this.isInitialized);
    
    // Initialize if not already done
    if (!this.isInitialized) {
      console.log('Initializing sound manager from startAmbient...');
      await this.init();
    }
    
    if (this.isMuted || !this.isInitialized) {
      console.log('Cannot start ambient - muted or failed to initialize');
      return;
    }
    
    // Try to play the dedicated ambient audio first
    if (this.ambientAudio && this.ambientAudio.src) {
      console.log('Playing dedicated ambient audio file...');
      this.ambientAudio.currentTime = 0;
      this.ambientAudio.play().catch(e => {
        console.warn('Dedicated ambient audio failed:', e);
        this.playFallbackAmbient();
      });
      return;
    }
    
    // Fallback to generated or loaded sound
    this.playFallbackAmbient();
  }

  // Play fallback ambient sound
  playFallbackAmbient() {
    const ambientSound = this.sounds.ambient;
    console.log('Playing fallback ambient sound:', ambientSound);
    
    if (ambientSound instanceof Audio) {
      console.log('Playing ambient audio file...');
      ambientSound.play().catch(e => console.warn('Ambient sound failed:', e));
    } else if (ambientSound instanceof AudioBuffer) {
      console.log('Playing ambient buffer...');
      // Play generated ambient sound in a loop
      this.playAmbientBuffer();
    } else {
      console.warn('No valid ambient sound found');
    }
  }

  // Play ambient buffer in a loop
  playAmbientBuffer() {
    if (this.isMuted || !this.isInitialized || !this.audioContext) return;
    
    const buffer = this.sounds.ambient;
    if (buffer instanceof AudioBuffer) {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.loop = true;
      gainNode.gain.value = this.ambientVolume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Store reference to stop it later
      this.currentAmbientSource = source;
      source.start();
    }
  }

  // Stop ambient sound
  stopAmbient() {
    // Stop dedicated ambient audio
    if (this.ambientAudio && !this.ambientAudio.paused) {
      this.ambientAudio.pause();
      this.ambientAudio.currentTime = 0;
      console.log('Stopped dedicated ambient audio');
    }
    
    // Stop fallback ambient sound
    const ambientSound = this.sounds.ambient;
    if (ambientSound instanceof Audio) {
      ambientSound.pause();
      ambientSound.currentTime = 0;
    } else if (this.currentAmbientSource) {
      // Stop generated ambient sound
      this.currentAmbientSource.stop();
      this.currentAmbientSource = null;
    }
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.stopAmbient();
    }
    
    return this.isMuted;
  }

  // Set volumes
  setEffectsVolume(volume) {
    this.effectsVolume = Math.max(0, Math.min(1, volume));
  }

  setAmbientVolume(volume) {
    this.ambientVolume = Math.max(0, Math.min(1, volume));
    const ambientSound = this.sounds.ambient;
    if (ambientSound && ambientSound instanceof Audio) {
      ambientSound.volume = this.ambientVolume;
    }
  }

  // Check if muted
  getMuted() {
    return this.isMuted;
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;
