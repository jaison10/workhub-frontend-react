import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Profile Setup page - Shown after signup
 *
 * This is a placeholder page that would normally contain
 * a detailed profile form. For now, it just confirms
 * account creation and redirects to profile page.
 */
export const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleContinue = () => {
    navigate('/profile');
  };

  const handleSkip = () => {
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Account Created Successfully!
        </h2>

        <p className="text-gray-600 mb-2">Welcome, {user?.name}!</p>
        <p className="text-sm text-gray-500 mb-8">
          Your {user?.accountType === 'Organization' ? 'organization' : 'personal'} account is ready.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            Complete your profile to get better job matches and stand out to employers!
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleContinue} className="w-full">
            Complete Profile Now
          </Button>
          <Button onClick={handleSkip} variant="outline" className="w-full">
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
};
