// Internationalization (i18n) system for multilingual support
export type Language = 'english' | 'hindi' | 'kannada';

export interface Translations {
  login: string;
  create_account: string;
  forget_password: string;
  home: string;
  explore: string;
  messages: string;
  profile: string;
  e_sip: string;
  create: string;
  buyer: string;
  seller: string;
  user_id: string;
  password: string;
  human_verification: string;
  login_as_buyer: string;
  login_as_seller: string;
  signing_in: string;
  ai_sha: string;
  listings: string;
  your_intelligent_real_estate_companion: string;
  calculate_emi: string;
  check_property_authenticity: string;
  find_properties: string;
  explain_carpet_area: string;
  ready_to_find_dream_property: string;
  click_ai_sha_button: string;
  ai_sha_available_all_pages: string;
}

export const translations: Record<Language, Translations> = {
  english: {
    login: "Login",
    create_account: "Create Account",
    forget_password: "Forgot Password?",
    home: "Home",
    explore: "Explore",
    messages: "Messages",
    profile: "Profile",
    e_sip: "E-SIP",
    create: "Create",
    buyer: "Buyer",
    seller: "Seller",
    user_id: "User ID",
    password: "Password",
    human_verification: "I'm not a robot",
    login_as_buyer: "Login as buyer",
    login_as_seller: "Login as seller",
    signing_in: "Signing in...",
    ai_sha: "Ai.Sha",
    listings: "Listings",
    your_intelligent_real_estate_companion: "Your Intelligent Real Estate Companion",
    calculate_emi: "Calculate EMI for ₹50L loan at 8.5% for 20 years",
    check_property_authenticity: "Is this property listing genuine?",
    find_properties: "I need a 2 BHK apartment under ₹60L near metro",
    explain_carpet_area: "What is carpet area vs built-up area?",
    ready_to_find_dream_property: "Ready to Find Your Dream Property?",
    click_ai_sha_button: "Click the Ai.Sha assistant button in the bottom right corner to get started!",
    ai_sha_available_all_pages: "Ai.Sha is available on all property pages"
  },
  hindi: {
    login: "लॉगिन",
    create_account: "खाता बनाएं",
    forget_password: "पासवर्ड भूल गए?",
    home: "होम",
    explore: "एक्सप्लोर",
    messages: "संदेश",
    profile: "प्रोफ़ाइल",
    e_sip: "ई-एसआईपी",
    create: "बनाएं",
    buyer: "खरीदार",
    seller: "विक्रेता",
    user_id: "उपयोगकर्ता आईडी",
    password: "पासवर्ड",
    human_verification: "मैं रोबोट नहीं हूं",
    login_as_buyer: "खरीदार के रूप में लॉगिन करें",
    login_as_seller: "विक्रेता के रूप में लॉगिन करें",
    signing_in: "साइन इन हो रहे हैं...",
    ai_sha: "Ai.Sha",
    listings: "सूची",
    your_intelligent_real_estate_companion: "आपका बुद्धिमान रियल एस्टेट साथी",
    calculate_emi: "₹50L लोन के लिए 8.5% पर 20 साल के लिए EMI की गणना करें",
    check_property_authenticity: "क्या यह प्रॉपर्टी लिस्टिंग असली है?",
    find_properties: "मुझे मेट्रो के पास ₹60L के तहत 2 BHK अपार्टमेंट चाहिए",
    explain_carpet_area: "कार्पेट एरिया और बिल्ट-अप एरिया में क्या अंतर है?",
    ready_to_find_dream_property: "अपना सपनों का घर खोजने के लिए तैयार हैं?",
    click_ai_sha_button: "शुरू करने के लिए नीचे दाएं कोने में Ai.Sha असिस्टेंट बटन पर क्लिक करें!",
    ai_sha_available_all_pages: "Ai.Sha सभी प्रॉपर्टी पेजों पर उपलब्ध है"
  },
  kannada: {
    login: "ಲಾಗಿನ್",
    create_account: "ಖಾತೆ ರಚಿಸಿ",
    forget_password: "ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?",
    home: "ಮನೆ",
    explore: "ಅನ್ವೇಷಿಸಿ",
    messages: "ಸಂದೇಶಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
    e_sip: "ಇ-ಸಿಪ್",
    create: "ರಚಿಸಿ",
    buyer: "ಖರೀದಿದಾರ",
    seller: "ಮಾರಾಟಗಾರ",
    user_id: "ಬಳಕೆದಾರ ಐಡಿ",
    password: "ಪಾಸ್ವರ್ಡ್",
    human_verification: "ನಾನು ರೋಬೋಟ್ ಅಲ್ಲ",
    login_as_buyer: "ಖರೀದಿದಾರರಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ",
    login_as_seller: "ಮಾರಾಟಗಾರರಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ",
    signing_in: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...",
    ai_sha: "Ai.Sha",
    listings: "ಪಟ್ಟಿ",
    your_intelligent_real_estate_companion: "ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಸಹಚರ",
    calculate_emi: "₹50L ಸಾಲಕ್ಕೆ 8.5% ನಲ್ಲಿ 20 ವರ್ಷಗಳಿಗೆ EMI ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ",
    check_property_authenticity: "ಈ ಆಸ್ತಿ ಪಟ್ಟಿ ನಿಜವೇ?",
    find_properties: "ನನಗೆ ಮೆಟ್ರೋ ಬಳಿ ₹60L ಕೆಳಗೆ 2 BHK ಅಪಾರ್ಟ್ಮೆಂಟ್ ಬೇಕು",
    explain_carpet_area: "ಕಾರ್ಪೆಟ್ ಪ್ರದೇಶ ಮತ್ತು ನಿರ್ಮಿತ ಪ್ರದೇಶದ ನಡುವೆ ಯಾವ ವ್ಯತ್ಯಾಸ?",
    ready_to_find_dream_property: "ನಿಮ್ಮ ಕನಸಿನ ಮನೆಯನ್ನು ಹುಡುಕಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    click_ai_sha_button: "ಪ್ರಾರಂಭಿಸಲು ಕೆಳಗೆ ಬಲ ಮೂಲೆಯಲ್ಲಿ Ai.Sha ಸಹಾಯಕ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ!",
    ai_sha_available_all_pages: "Ai.Sha ಎಲ್ಲಾ ಆಸ್ತಿ ಪುಟಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ"
  }
};

export class I18nManager {
  private currentLanguage: Language = 'english';

  constructor(initialLanguage?: Language) {
    if (initialLanguage) {
      this.currentLanguage = initialLanguage;
    }
  }

  public setLanguage(language: Language): void {
    this.currentLanguage = language;
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public t(key: keyof Translations): string {
    return translations[this.currentLanguage][key];
  }

  public getAvailableLanguages(): Language[] {
    return ['english', 'hindi', 'kannada'];
  }

  public getLanguageDisplayName(language: Language): string {
    const names = {
      english: 'English',
      hindi: 'हिन्दी',
      kannada: 'ಕನ್ನಡ'
    };
    return names[language];
  }

  public initializeFromStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language') as Language;
      if (stored && this.getAvailableLanguages().includes(stored)) {
        this.currentLanguage = stored;
      }
    }
  }
}

// Export singleton instance
export const i18n = new I18nManager();
