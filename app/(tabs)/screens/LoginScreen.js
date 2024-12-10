import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';  // <-- Import useRouter

import AuthContent from '../Auth/AuthContent';
import LoadingOverlay from '../ui/LoadingOverlay';
import { login } from '../util/auth';

function LoginScreen() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await login(email, password);
      // If login succeeds, navigate to the Welcome screen
      router.replace("/(org)/(authenticated)/welcome");
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  // isLogin={true} ensures the AuthContent component shows login form fields.
  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
