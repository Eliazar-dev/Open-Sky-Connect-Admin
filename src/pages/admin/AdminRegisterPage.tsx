import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Input, OtpInput } from '@/components/ui';
import { adminAuthService } from '@/services/adminAuthService';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function AdminRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState<string | null>(null);

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    try {
      const response = await adminAuthService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setEmail(values.email);
      setStep('verify');
      toast.success(response.message);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const onVerifySubmit = async () => {
    setServerError(null);
    setTokenError(null);

    if (token.length !== 6) {
      setTokenError('Enter the 6-digit code');
      return;
    }

    try {
      const response = await adminAuthService.verifyEmail({ email, token });
      toast.success(response.message);
      navigate('/login');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Invalid or expired code');
    }
  };

  const handleResendToken = async () => {
    try {
      await adminAuthService.resendVerification(email);
      toast.success('New verification code sent');
    } catch (error) {
      toast.error('Failed to resend code');
    }
  };

  const handleBackToRegister = () => {
    setStep('register');
    setServerError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Registration</h1>
            <p className="text-slate-500 mt-2">
              {step === 'register' ? 'Create your admin account' : 'Verify your email address'}
            </p>
          </div>

          {step === 'register' ? (
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
              <div>
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@example.com"
                  leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter your password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>

              {serverError && (
                <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <p className="text-sm text-danger-600">{serverError}</p>
                </div>
              )}

              <Button fullWidth size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Create Account
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-brand-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-success-800">Registration successful!</p>
                    <p className="text-sm text-success-600 mt-1">
                      We've sent a 6-digit verification code to <strong>{email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  Code expires in 10 minutes
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter 6-digit verification code
                </label>
                <OtpInput
                  length={6}
                  value={token}
                  onChange={setToken}
                  error={tokenError || undefined}
                />
              </div>

              {serverError && (
                <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <p className="text-sm text-danger-600">{serverError}</p>
                </div>
              )}

              <Button onClick={onVerifySubmit} fullWidth size="lg" rightIcon={<CheckCircle className="h-4 w-4" />}>
                Verify Email
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBackToRegister}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ← Back to registration
                </button>
                <button
                  type="button"
                  onClick={handleResendToken}
                  className="text-brand-600 font-medium hover:underline"
                >
                  Resend code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Open Sky Connect Admin Portal</p>
        </div>
      </div>
    </div>
  );
}
