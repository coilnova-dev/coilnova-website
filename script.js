const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const portfolioProjects = [
  {
    tag: { pt: 'LEADS & CRM', en: 'LEADS & CRM' },
    title: { pt: 'LeadFlow CRM', en: 'LeadFlow CRM' },
    description: {
      pt: 'Captura automaticamente novos pedidos através de formulários, organiza os dados no Google Sheets e envia respostas e notificações por email.',
      en: 'Automatically captures new enquiries through forms, organizes the data in Google Sheets, and sends email replies and notifications.',
    },
    tech: ['n8n', 'Tally', 'Google Sheets', 'Gmail'],
  },
  {
    tag: { pt: 'AGENDA & CALENDAR', en: 'BOOKING CALENDAR' },
    title: { pt: 'Booking Calendar Sync', en: 'Booking Calendar Sync' },
    description: {
      pt: 'Verifica pedidos de marcação, cria eventos no Google Calendar e envia confirmações automáticas ao cliente.',
      en: 'Processes booking requests, creates Google Calendar events, and automatically sends confirmations to the client.',
    },
    tech: ['n8n', 'Tally', 'Google Calendar', 'Gmail'],
  },
  {
    tag: { pt: 'IA & RELATÓRIOS', en: 'AI AUTOMATION' },
    title: { pt: 'AI Automation Report', en: 'AI Automation Report' },
    description: {
      pt: 'Analisa as necessidades de uma empresa com inteligência artificial e gera automaticamente um relatório personalizado em PDF.',
      en: 'Uses artificial intelligence to analyze a company’s needs and automatically generates a personalized PDF report.',
    },
    tech: ['n8n', 'OpenAI', 'Tally', 'PDF.co', 'Gmail'],
  },
  {
    tag: { pt: 'IA & SENTIMENTO', en: 'AI SENTIMENT' },
    title: { pt: 'AI Sentiment Monitor', en: 'AI Sentiment Monitor' },
    description: {
      pt: 'Recolhe informação de várias fontes, analisa o sentimento com IA e regista os resultados diariamente no Google Sheets.',
      en: 'Collects information from multiple sources, analyzes sentiment with AI, and records the results daily in Google Sheets.',
    },
    tech: ['n8n', 'OpenAI', 'Google Sheets', 'Web Scraping'],
  },
  {
    tag: { pt: 'IA & LEADS', en: 'AI LEAD HUNTER' },
    title: { pt: 'AI Lead Hunter', en: 'AI Lead Hunter' },
    description: {
      pt: 'Pesquisa potenciais clientes, organiza os contactos encontrados e prepara os dados para campanhas de prospeção.',
      en: 'Finds potential clients, organizes their contact information, and prepares the data for outreach campaigns.',
    },
    tech: ['n8n', 'Web Scraping', 'Google Sheets', 'OpenAI'],
  },
  {
    tag: { pt: 'IA & EMAIL', en: 'AI EMAIL ASSISTANT' },
    title: { pt: 'AI Email Assistant', en: 'AI Email Assistant' },
    description: {
      pt: 'Analisa mensagens recebidas e ajuda a gerar respostas profissionais utilizando inteligência artificial.',
      en: 'Analyzes incoming messages and helps generate professional replies using artificial intelligence.',
    },
    tech: ['n8n', 'OpenAI', 'Gmail'],
  },
  {
    tag: { pt: 'EMAILS AUTOMATIZADOS', en: 'AUTOMATED EMAILS' },
    title: { pt: 'Automated Email Sender', en: 'Automated Email Sender' },
    description: {
      pt: 'Automatiza o envio organizado de emails de prospeção e mantém o registo dos contactos e resultados.',
      en: 'Automates organized outreach email delivery and keeps a record of contacts and results.',
    },
    tech: ['n8n', 'Gmail', 'Google Sheets'],
  },
];

function formatProjectNumber(index) {
  return String(index + 1).padStart(2, '0');
}

function renderPortfolioProjects(lang) {
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!portfolioGrid) {
    return;
  }

  portfolioGrid.innerHTML = portfolioProjects.map((project, index) => {
    const tags = project.tech.map((tech) => `<span class="tag">${tech}</span>`).join('');
    return `
      <article class="project reveal">
        <div class="project-top">
          <span class="project-tag">${project.tag[lang]}</span>
          <span>${formatProjectNumber(index)}</span>
        </div>
        <h3>${project.title[lang]}</h3>
        <p>${project.description[lang]}</p>
        <div class="tags">${tags}</div>
      </article>
    `;
  }).join('');

  observeRevealElements(portfolioGrid);
}

function observeRevealElements(root = document) {
  root.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

window.addEventListener('DOMContentLoaded', () => {
  observeRevealElements();
});