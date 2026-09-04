import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'usr_lk_9921',
  name: 'Kavindi Perera',
  email: 'kavindi.p@univ.ac.lk',
  role: 'NGO_RECIPIENT',
  roleLabel: 'Western Province NGO',
  organization: 'Colombo Food Care Initiative',
  district: 'Colombo, Western Province',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isVerified: true,
  co2eSavedKg: 142.5,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('foodshare_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodshare_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodshare_auth_user');
    }
  }, [user]);

  const login = async (email, password, rememberMe = true) => {
    setIsLoading(true);
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For hackathon/demo, accept demo email or any valid email
    const loggedInUser = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
      name: email?.split('@')[0]?.replace('.', ' ') || DEMO_USER.name,
    };

    setUser(loggedInUser);
    setIsLoading(false);
    return loggedInUser;
  };

  const loginWithGoogle = async (googleAccount) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const googleUser = {
      id: `usr_g_${Date.now()}`,
      name: googleAccount?.name || 'Google User',
      email: googleAccount?.email || 'user@gmail.com',
      avatar: googleAccount?.picture || 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      role: 'COMMUNITY_MEMBER',
      roleLabel: 'Verified Community Member',
      organization: 'Google Verified Account',
      district: 'Western Province, Sri Lanka',
      isVerified: true,
      provider: 'google',
      co2eSavedKg: 28.0,
    };

    setUser(googleUser);
    setIsLoading(false);
    return googleUser;
  };

  const register = async (formData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newUser = {
      id: `usr_lk_${Date.now()}`,
      name: formData.name || formData.organizationName,
      email: formData.email,
      role: formData.role || 'COMMUNITY_MEMBER',
      roleLabel: formData.roleLabel || 'Registered Member',
      organization: formData.organizationName || formData.name,
      district: formData.district || 'Colombo',
      phone: formData.phone,
      isVerified: true,
      co2eSavedKg: 0,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name || 'Food Hero')}`,
    };

    setUser(newUser);
    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodshare_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        demoUser: DEMO_USER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
