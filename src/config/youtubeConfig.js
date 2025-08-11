// YouTube API Configuration
// Instructions for setting up YouTube Data API v3:

/*
SETUP INSTRUCTIONS:

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3:
   - Go to APIs & Services > Library
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. Replace 'YOUR_YOUTUBE_API_KEY' in LiveSubscriberCounter.jsx with your actual API key
6. Replace 'UCYour_Channel_ID' with your actual channel ID

HOW TO FIND YOUR CHANNEL ID:
1. Go to your YouTube channel
2. Click on "View page source" (Ctrl+U)
3. Search for "externalId" - the value next to it is your channel ID
4. Or use this URL: https://www.youtube.com/account_advanced

IMPORTANT SECURITY NOTE:
- For production, store the API key in environment variables
- Add your domain to the API key restrictions in Google Cloud Console
- Set up usage quotas to prevent unexpected charges
*/

export const youtubeConfig = {
  // Real YouTube API key (already exposed in client-side code)
  API_KEY: 'AIzaSyDVsNWHoXP0vt6q8Me7PURlZKyQk-D1rCk',
  
  // Real YouTube channel ID
  CHANNEL_ID: 'UCdFVYz_Kflq2TXcjqt8jTEQ',
  
  // API endpoints
  CHANNEL_STATS_URL: 'https://www.googleapis.com/youtube/v3/channels',
  
  // Update interval (milliseconds)
  UPDATE_INTERVAL: 30000, // 30 seconds
  
  // Animation settings
  COUNTER_ANIMATION_DURATION: 2000, // 2 seconds
  
  // Demo mode (set to false when using real API)
  DEMO_MODE: false,
  
  // Demo subscriber count range
  DEMO_BASE_COUNT: 1247,
  DEMO_VARIANCE: 10,
};

export default youtubeConfig;
