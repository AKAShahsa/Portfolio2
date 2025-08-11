import React, { useState, useEffect, useRef } from 'react';
import { FaYoutube, FaUsers, FaBell, FaArrowUp, FaPlay, FaEye } from 'react-icons/fa';
import { youtubeConfig } from '../config/youtubeConfig';

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};

const LiveSubscriberCounter = ({ channelId, className = '' }) => {
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [sparkles, setSparkles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const counterRef = useRef(null);
  const intervalRef = useRef(null);

  // YouTube API Configuration - Using direct config import instead of env variables
  const API_KEY = youtubeConfig.API_KEY;
  const CHANNEL_ID = channelId || youtubeConfig.CHANNEL_ID;
  const DEMO_MODE = youtubeConfig.DEMO_MODE;

  // Debug: Log API configuration (remove in production)
  console.log('YouTube API Config:', {
    hasApiKey: !!API_KEY,
    apiKey: API_KEY ? `${API_KEY.substring(0, 5)}...` : undefined,
    apiKeyFull: API_KEY,
    channelId: CHANNEL_ID,
    demoMode: DEMO_MODE,
    allEnvVars: import.meta.env,
    envPrefix: 'Using Vite env variables'
  });

  // Fetch real YouTube subscriber count
  const fetchSubscriberCount = async () => {
    try {
      setIsLoading(true);
      
      console.log('YouTube API Configuration:', {
        apiKey: API_KEY ? `${API_KEY.substring(0, 5)}...` : 'missing',
        channelId: CHANNEL_ID,
        demoMode: DEMO_MODE,
        source: 'Direct from youtubeConfig.js'
      });
      
      if (DEMO_MODE) {
        console.log('Demo mode is enabled in youtubeConfig.js');
        const demoCount = 1247 + Math.floor(Math.random() * 10);
        setSubscriberCount(demoCount);
        setViewCount(2100000); // 2.1M demo count
        setVideoCount(127); // 127 demo count
        setError(null);
        setIsLoading(false);
        return;
      }

      // We're using the API key directly from youtubeConfig.js
      console.log('Making YouTube API request to:', 
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}`);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      );

      console.log('YouTube API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('YouTube API Error Response:', errorText);
        
        // Handle the specific case of API not enabled
        const errorData = JSON.parse(errorText);
        if (errorData?.error?.code === 403 && 
            errorData?.error?.errors?.[0]?.reason === 'accessNotConfigured') {
          
          console.warn('YouTube API is not enabled for this project. Using fallback mode.');
          // Use fallback without throwing error
          const fallbackCount = 1247 + Math.floor(Math.random() * 10);
          setSubscriberCount(fallbackCount);
          setViewCount(2100000); // 2.1M fallback
          setVideoCount(127); // 127 fallback
          setError("API not enabled - See console for instructions");
          setIsLoading(false);
          
          // Provide clear instructions in console
          console.info('%c YouTube API Activation Instructions ', 'background: #c4302b; color: white; font-size: 16px; padding: 10px;');
          console.info('1. Visit: https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=922571468296');
          console.info('2. Click the "Enable" button');
          console.info('3. Wait a few minutes for the changes to propagate');
          console.info('4. Refresh this page');
          
          return;
        }
        
        throw new Error(`YouTube API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('YouTube API Response Data:', data);
      
      if (data.items && data.items.length > 0) {
        const stats = data.items[0].statistics;
        const realCount = parseInt(stats.subscriberCount);
        const realViewCount = parseInt(stats.viewCount);
        const realVideoCount = parseInt(stats.videoCount);
        const previousCount = subscriberCount;
        
        console.log('YouTube stats updated:', { 
          subscribers: { previous: previousCount, new: realCount },
          views: realViewCount,
          videos: realVideoCount
        });
        
        setSubscriberCount(realCount);
        setViewCount(realViewCount);
        setVideoCount(realVideoCount);
        setError(null);
        setIsLoading(false);
        
        // Trigger animation if count increased
        if (realCount > previousCount && previousCount > 0) {
          console.log('Subscriber count increased! Triggering animation');
          setIsAnimating(true);
          setIsCountingUp(true);
          createSparkles();
          
          setTimeout(() => {
            setIsAnimating(false);
            setIsCountingUp(false);
          }, 2000);
        }
        
        setLastUpdate(Date.now());
      } else {
        console.error('No channel data found in response:', data);
        throw new Error('No channel data found');
      }
    } catch (err) {
      console.error('YouTube API Error:', err);
      setError(err.message);
      // Fallback to demo mode on error
      const fallbackCount = 1247 + Math.floor(Math.random() * 10);
      setSubscriberCount(fallbackCount);
      setViewCount(2100000); // 2.1M fallback
      setVideoCount(127); // 127 fallback
      setIsLoading(false);
    }
  };

  // Initial fetch and setup interval
  useEffect(() => {
    fetchSubscriberCount(); // Initial fetch
    
    // Set up interval for updates every 30 seconds
    const interval = setInterval(fetchSubscriberCount, 30000);
    
    return () => clearInterval(interval);
  }, [API_KEY, CHANNEL_ID]);

  // Animated counter effect
  useEffect(() => {
    if (displayCount < subscriberCount) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + Math.ceil((subscriberCount - prev) / 20), subscriberCount));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayCount, subscriberCount]);

  // Initialize display count
  useEffect(() => {
    setDisplayCount(subscriberCount);
  }, [subscriberCount]);

  // Create sparkle animation
  const createSparkles = () => {
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 100
    }));
    
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2000);
  };

  const handleClick = () => {
    // Add click animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    // Open YouTube channel
    window.open('https://www.youtube.com/@iamsyedtaha', '_blank');
  };

  return (
    <div className={`${className} relative group cursor-pointer`} onClick={handleClick}>
      {/* Outer Glow Ring */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-xl border border-red-500/30 rounded-2xl overflow-hidden hover:border-red-400/60 transition-all duration-500 transform group-hover:scale-105">
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Flowing Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-500/10 to-red-700/10 animate-pulse" />
          
          {/* Moving Particles */}
          <div className="absolute top-2 left-4 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-60" />
          <div className="absolute top-6 right-6 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-40" />
          <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse opacity-50" />
          
          {/* Sparkles */}
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          
          {/* Header with YouTube Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              {/* Main YouTube Icon */}
              <div className="relative bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-3 group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all duration-300">
                <FaYoutube className="text-3xl text-white group-hover:scale-110 transition-transform duration-300" />
                
                {/* Pulse Rings */}
                <div className="absolute inset-0 rounded-xl border-2 border-red-400/30 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 rounded-xl border border-red-300/20 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-60 transition-all duration-700 delay-100" />
              </div>
              
              {/* Live Indicator */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
                LIVE
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-red-200 transition-colors duration-300">
              YouTube Subscribers
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Real-time Growth
            </p>
          </div>

          {/* Subscriber Count - The Star */}
          <div className="text-center mb-4">
            <div 
              ref={counterRef}
              className={`text-4xl md:text-5xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent transition-all duration-500 ${
                isAnimating ? 'scale-110 drop-shadow-lg' : 'scale-100'
              } ${isCountingUp ? 'animate-pulse' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 border-4 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                displayCount.toLocaleString()
              )}
            </div>
            
            {/* API Status Indicator */}
            <div className="mt-2 text-xs">
              {error ? (
                <div className="text-yellow-400 cursor-help" title="Please check browser console for activation instructions">
                  ⚠️ Fallback Mode ({error.toString().substring(0, 30)})
                </div>
              ) : DEMO_MODE === true ? (
                <span className="text-blue-400">🎭 Demo Mode</span>
              ) : (
                <span className="text-green-400">🔴 Live API</span>
              )}
            </div>
            
            {/* Growth Indicator */}
            {isCountingUp && (
              <div className="flex items-center justify-center gap-1 mt-2 text-green-400 text-sm font-semibold animate-bounce">
                <FaArrowUp />
                <span>+{Math.floor(Math.random() * 3) + 1} New!</span>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/30">
              <FaEye className="text-blue-400 mx-auto mb-1" />
              <div className="text-xs text-gray-400">Views</div>
              <div className="text-sm font-bold text-white">
                {isLoading ? "Loading..." : formatNumber(viewCount)}
              </div>
            </div>
            <div className="text-center p-2 rounded-lg bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/30">
              <FaPlay className="text-green-400 mx-auto mb-1" />
              <div className="text-xs text-gray-400">Videos</div>
              <div className="text-sm font-bold text-white">
                {isLoading ? "Loading..." : videoCount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-green-400 font-medium">Live Count</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce shadow-lg shadow-orange-400/50" />
              <span className="text-orange-400 font-medium">Growing</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-3 mx-4">
                <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
                  <FaBell className="animate-bounce" />
                  Click to Subscribe & Join {displayCount.toLocaleString()}+ Creators!
                </p>
              </div>
            </div>
            
            {/* Last Updated */}
            <div className="mt-3 text-xs text-gray-500">
              Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
        
        {/* Border Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="bg-red-500 text-white rounded-full p-2 animate-bounce shadow-lg">
          <FaUsers className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default LiveSubscriberCounter;
