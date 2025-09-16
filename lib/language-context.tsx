"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { i18n, type Language, type Translations } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
  availableLanguages: Language[];
  getLanguageDisplayName: (language: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('english');

  useEffect(() => {
    i18n.initializeFromStorage();
    setLanguageState(i18n.getLanguage());

    // Listen for language changes from other components
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const setLanguage = (newLanguage: Language) => {
    i18n.setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const t = (key: keyof Translations): string => {
    return i18n.t(key);
  };

  const availableLanguages = i18n.getAvailableLanguages();
  const getLanguageDisplayName = (lang: Language): string => {
    return i18n.getLanguageDisplayName(lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        availableLanguages, 
        getLanguageDisplayName 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
