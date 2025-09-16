"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { i18n, type Language } from "@/lib/i18n";

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    i18n.initializeFromStorage();
    setCurrentLanguage(i18n.getLanguage());
  }, []);

  const handleLanguageChange = (language: Language) => {
    i18n.setLanguage(language);
    setCurrentLanguage(language);
    setIsOpen(false);
    // Trigger a re-render by updating a global state or using a context
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  };

  const getLanguageFlag = (language: Language): string => {
    const flags = {
      english: '🇺🇸',
      hindi: '🇮🇳',
      kannada: '🇮🇳'
    };
    return flags[language];
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {getLanguageFlag(currentLanguage)} {i18n.getLanguageDisplayName(currentLanguage)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {i18n.getAvailableLanguages().map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{getLanguageFlag(language)}</span>
              <span>{i18n.getLanguageDisplayName(language)}</span>
            </div>
            {currentLanguage === language && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
