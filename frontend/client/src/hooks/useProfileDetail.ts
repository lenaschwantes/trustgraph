/*
 * Custom hook for fetching profile details from API
 */

import { useState, useCallback } from 'react';
import { api, ProfileDetail } from '@/lib/api';

interface UseProfileDetailResult {
  profile: ProfileDetail | null;
  loading: boolean;
  error: string | null;
  fetchProfile: (profileId: string) => Promise<void>;
  clearProfile: () => void;
}

export function useProfileDetail(): UseProfileDetailResult {
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (profileId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const profileData = await api.getProfile(profileId);
      setProfile(profileData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      setError(errorMessage);
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    clearProfile,
  };
}
