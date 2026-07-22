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

function getBrowserLanguage() {
  const languages = [
    ...(navigator.languages || []),
    navigator.language,
    navigator.userLanguage,
    navigator.browserLanguage,
  ].filter(Boolean);

  return languages.some((lang) => lang.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
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

function updateContactSection(lang) {
  const tallyContainer = document.getElementById('tally-embed-container');
  const englishForm = document.getElementById('contact-form-en');
  const heroCta = document.getElementById('hero-cta');

  if (!tallyContainer || !englishForm || !heroCta) {
    return;
  }

  if (lang === 'pt') {
    if (!tallyContainer.querySelector('iframe')) {
      tallyContainer.innerHTML = `
        <iframe
          src="https://tally.so/embed/r/vGvyxl?alignLeft=1&hideTitle=1&transparentBackground=1"
          title="Formulário COILNOVA"
          width="100%"
          height="640"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
        ></iframe>
      `;
    }
    tallyContainer.hidden = false;
    englishForm.hidden = true;
    heroCta.href = '#tally-embed-container';
    heroCta.removeAttribute('target');
  } else {
    tallyContainer.hidden = true;
    englishForm.hidden = false;
    heroCta.href = '#contact-form-en';
    heroCta.removeAttribute('target');
  }
}

async function setLanguage(lang) {
  const translations = await loadLocale(lang);
  applyTranslations(translations);
  setDocumentLanguage(lang);
  saveLanguage(lang);
  updateLanguageButtons(lang);
  updateContactSection(lang);
}

function initLanguageSwitcher() {
  const savedLang = getSavedLanguage();
  const initialLang = savedLang || getBrowserLanguage();

  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  setLanguage(initialLang).catch((error) => {
    console.error('Failed to load translations:', error);
  });
}

window.addEventListener('DOMContentLoaded', initLanguageSwitcher);
