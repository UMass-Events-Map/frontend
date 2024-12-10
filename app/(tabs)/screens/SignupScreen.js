import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import AuthContent from '../Auth/AuthContent';
import LoadingOverlay from '../ui/LoadingOverlay';
import { createUser } from '../util/auth';

function SignupScreen() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
      // If createUser succeeds, navigate to the Welcome screen
      router.replace("/(org)/(authenticated)/welcome");
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user. Please check your input and try again later.'
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  // Pass isLogin={false} to ensure the AuthContent component knows this is a signup flow
  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
