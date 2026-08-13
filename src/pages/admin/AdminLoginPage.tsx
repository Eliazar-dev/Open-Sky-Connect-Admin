import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, KeyRound, ArrowRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Input, OtpInput } from '@/components/ui';
import { adminAuthService } from '@/services/adminAuthService';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';

const emailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const tokenSchema = z.object({
  token: z.string().length(6, 'Enter the 6-digit code'),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type TokenFormValues = z.infer<typeof tokenSchema>;

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { setAdminSession } = useAdminAuthContext();
  const [step, setStep] = useState<'email' | 'token'>('email');
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const [token, setToken] = useState('');
  const [tokenError, setTokenError] = useState<string | null>(null);

  const requestLoginMutation = adminAuthService.requestLoginToken;
  const verifyTokenMutation = adminAuthService.verifyLoginToken;

  const onEmailSubmit = async (values: EmailFormValues) => {
    setServerError(null);
    try {
      await requestLoginMutation({ email: values.email });
      setEmail(values.email);
      setStep('token');
      toast.success('Login code sent to your email');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Failed to send login code');
    }
  };

  const onTokenSubmit = async () => {
    setServerError(null);
    setTokenError(null);
    
    if (token.length !== 6) {
      setTokenError('Enter the 6-digit code');
      return;
    }
    
    try {
      const response = await verifyTokenMutation({ email, token });
      
      // Store admin tokens
      localStorage.setItem('osc_admin_access_token', response.access_token);
      localStorage.setItem('osc_admin_refresh_token', response.refresh_token);
      
      // Set admin session
      setAdminSession(
        {
          name: response.name,
          email: response.email,
          loginTime: response.login_time,
        },
        response.access_token
      );
      
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Invalid or expired code');
    }
  };

  const handleResendToken = async () => {
    try {
      await adminAuthService.resendLoginToken(email);
      toast.success('New login code sent');
    } catch (error) {
      toast.error('Failed to resend code');
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setServerError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
            <p className="text-slate-500 mt-2">
              {step === 'email' ? 'Enter your email to receive a login code' : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSubmitEmail(onEmailSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@example.com"
                  leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                  error={emailErrors.email?.message}
                  {...registerEmail('email')}
                />
              </div>

              {serverError && (
                <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <p className="text-sm text-danger-600">{serverError}</p>
                </div>
              )}

              <Button type="submit" fullWidth size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Send Login Code
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-brand-600 font-medium hover:underline"
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  Code expires in 10 minutes
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter 6-digit code
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

              <Button onClick={onTokenSubmit} fullWidth size="lg" rightIcon={<KeyRound className="h-4 w-4" />}>
                Verify & Login
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ← Back to email
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
