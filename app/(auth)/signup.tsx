import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { GlassCard } from '../../components/ui/GlassCard';
import { GradientButton } from '../../components/ui/GradientButton';
import Colors, { gradients } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const steps = [
    { field: 'name', title: 'Create Account', subtitle: 'Start your health journey today with personalized care' },
    { field: 'email', title: 'Create Account', subtitle: 'Start your health journey today with personalized care' },
    { field: 'password', title: 'Create Account', subtitle: 'Start your health journey today with personalized care' },
    { field: 'confirmPassword', title: 'Create Account', subtitle: 'Start your health journey today with personalized care' },
    { field: 'final', title: 'Create Account', subtitle: 'Start your health journey today with personalized care' }
  ];

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        console.log('Validating name:', name, 'Length:', name.length);
        if (!name || name.trim().length === 0) {
          Alert.alert('Error', 'Please enter your full name');
          return false;
        }
        if (name.trim().length < 2) {
          Alert.alert('Error', 'Name must be at least 2 characters');
          return false;
        }
        return true;
      case 1:
        if (!email || email.trim().length === 0) {
          Alert.alert('Error', 'Please enter your email address');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          Alert.alert('Error', 'Please enter a valid email address');
          return false;
        }
        return true;
      case 2:
        if (!password || password.length === 0) {
          Alert.alert('Error', 'Please create a password');
          return false;
        }
        if (password.length < 6) {
          Alert.alert('Error', 'Password must be at least 6 characters long');
          return false;
        }
        return true;
      case 3:
        if (!confirmPassword || confirmPassword.length === 0) {
          Alert.alert('Error', 'Please confirm your password');
          return false;
        }
        if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return false;
        }
        return true;
      case 4:
        if (!acceptedTerms) {
          Alert.alert('Error', 'Please accept the terms and conditions');
          return false;
        }
        return true;
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSignUp();
      }
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/home');
    }, 2000);
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
            <View style={[styles.inputWrapper, { borderColor: colors.outline }]}>
              <Ionicons name="person" size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.onSurfaceVariant}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                autoFocus
                onSubmitEditing={handleNext}
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
            <View style={[styles.inputWrapper, { borderColor: colors.outline }]}>
              <Ionicons name="mail" size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.onSurfaceVariant}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                onSubmitEditing={handleNext}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View style={[styles.inputWrapper, { borderColor: colors.outline }]}>
              <Ionicons name="lock-closed" size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.onSurfaceVariant}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoFocus
                onSubmitEditing={handleNext}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
            <View style={[styles.inputWrapper, { borderColor: colors.outline }]}>
              <Ionicons name="lock-closed" size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm your password"
                placeholderTextColor={colors.onSurfaceVariant}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoFocus
                onSubmitEditing={handleNext}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[styles.checkbox, { borderColor: colors.outline }]}>
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={14} color={colors.primary} />
                )}
              </View>
              <Text style={[styles.termsText, { color: colors.onSurfaceVariant }]}>
                I agree to the{' '}
                <Text style={[styles.termsLink, { color: colors.primary }]}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text style={[styles.termsLink, { color: colors.primary }]}>
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={gradients.secondary as [string, string]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="medical" size={48} color="white" />
          </View>
          <Text style={styles.appName}>
            Aarogya AI
          </Text>
          <Text style={styles.welcomeText}>
            Welcome back to your health journey
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <GlassCard style={styles.formCard}>
          <Text style={[styles.title, { color: colors.text }]}>
            {steps[currentStep].title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            {steps[currentStep].subtitle}
          </Text>

          {renderStepContent()}

          <GradientButton
            title={currentStep === steps.length - 1 ? 'Create Account' : 'Next'}
            onPress={handleNext}
            loading={loading}
            style={styles.nextButton}
          />

          {currentStep === steps.length - 1 && (
            <>
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.outline }]} />
                <Text style={[styles.dividerText, { color: colors.onSurfaceVariant }]}>
                  or
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.outline }]} />
              </View>

              <TouchableOpacity
                style={[styles.googleButton, { borderColor: colors.outline }]}
                onPress={() => Alert.alert('Google Sign Up', 'Google sign up will be implemented')}
              >
                <Ionicons name="logo-google" size={20} color={colors.text} />
                <Text style={[styles.googleButtonText, { color: colors.text }]}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: colors.onSurfaceVariant }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={[styles.signInLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -40,
    justifyContent: 'center',
  },
  formCard: {
    padding: 24,
    borderRadius: 24,
    height: 320, // Fixed height to prevent scrolling
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  termsLink: {
    fontWeight: '600',
  },
  nextButton: {
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  googleButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 12,
  },
  signInLink: {
    fontSize: 12,
    fontWeight: '600',
  },
});