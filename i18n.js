const DEFAULT_LANG = 'pt';
const SUPPORTED_LANGS = ['pt', 'en'];
const STORAGE_KEY = 'coilnovaLang';

async function loadLocale(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = DEFAULT_LANG;
  }

  const response = await fetch(`locales/${lang}.json`, { cache: 'no-store' });
  if (!response.ok) {
    if (lang !== DEFAULT_LANG) {
      return loadLocale(DEFAULT_LANG);
    }
    throw new Error(`Locale file not found: ${lang}`);
  }

  return response.json();
}

function applyTranslations(translations) {
  const nodes = document.querySelectorAll('[data-i18n]');

  nodes.forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key || !(key in translations)) {
      return;
    }

    const text = translations[key];
    const attr = node.getAttribute('data-i18n-attr');

    if (attr) {
      node.setAttribute(attr, text);
    } else {
      node.textContent = text;
    }
  });
}

function setDocumentLanguage(lang) {
  document.documentElement.lang = lang;
}

function saveLanguage(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
}

function getSavedLanguage() {
  return localStorage.getItem(STORAGE_KEY);
}

function updateLanguageButtons(lang) {
  const activeClass = 'btn-active';
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const buttonLang = button.getAttribute('data-lang');
    if (buttonLang === lang) {
      button.classList.add(activeClass);
      button.classList.remove('btn-ghost');
    } else {
      button.classList.remove(activeClass);
      button.classList.add('btn-ghost');
    }
  });
}

async function setLanguage(lang) {
  const translations = await loadLocale(lang);
  applyTranslations(translations);
  setDocumentLanguage(lang);
  saveLanguage(lang);
  updateLanguageButtons(lang);
}

function initLanguageSwitcher() {
  const savedLang = getSavedLanguage();
  const preferredLang = savedLang || DEFAULT_LANG;

  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  setLanguage(preferredLang).catch((error) => {
    console.error('Failed to load translations:', error);
  });
}

window.addEventListener('DOMContentLoaded', initLanguageSwitcher);
