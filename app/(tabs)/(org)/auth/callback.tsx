import { useEffect } from 'react';
import { Linking } from 'react-native';
import { supabase } from '@supabase/supabase-js'; // a Supabase client initialized for RN

// Suppose you've initiated an OAuth flow and got redirected back to:
// myapp://auth/callback?code=XXXXXX

export default function OAuthCallbackScreen() {
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      const code = getQueryParam(url, 'code'); // parse code from URL
      
      if (code) {
        // Exchange code for session directly on the client side
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('Failed to exchange code for session:', error);
        } else {
          console.log('Session established:', data.session);
          // Navigate to your app’s authenticated section
        }
      }
    };

    // Listen for deep link events
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Check if the app opened with a link (in case the app wasn't open already)
    Linking.getInitialURL().then((initialUrl) => {
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null; // or a loading screen
}

function getQueryParam(url, param) {
  const params = new URLSearchParams(url.split('?')[1]);
  return params.get(param);
}
