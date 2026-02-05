// ===== Shared site JS: menu + year =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const fakeSendBtn = document.getElementById("fakeSendBtn");
const formNote = document.getElementById("formNote");
if (fakeSendBtn && formNote) {
  fakeSendBtn.addEventListener("click", () => {
    formNote.textContent = "Demo only — connect a backend (or Formspree) to actually send messages.";
  });
}

// ===== Mini “AI” Profile Chatbot (offline) =====
const root = document.getElementById("chatbot-root");

if (root) {
  // Profile knowledge base (edit anytime)
  const profile = {
    name: "Samuel Amoah Sefa",
    email: "ssefa@caldwell.edu",
    phone: "862-406-6258",
    linkedin: "https://www.linkedin.com/in/samuel-kofi-sefa-amoah/",
    school: "Caldwell University (Caldwell, NJ)",
    major: "B.S. Computer Science",
    gpa: "3.4",
    grad: "December 2026",
    coursework: [
      "Calculus II",
      "Intro to Programming I (C++)",
      "Applied Computer Science (Python, SQL)",
      "Codepath: Intro to Web Development (HTML, CSS, Figma, JavaScript)"
    ],
    highlights: [
      "TMCF The Pitch finalist (May 2024): SerenitySphere — AI virtual companion with gamification for veterans with PTSD/combat stress",
      "National AI Campus Project researcher (Feb–May 2023): data wrangling, classification/regression, visualizations (Legend of Zelda dataset)",
      "HBCU First intern (May–Jul 2023): Fortune 500 career workshops; networking & professional branding",
      "TMCF Metascholars participant (Feb–May 2023): Metaverse platforms + cryptonomics/tokenomics",
      "YouTube Clone (September 2024): responsive UI with HTML/CSS (flexbox + media queries)"
    ],
    projects: [
      {
        name: "YouTube Clone",
        date: "September 2024",
        details: "Responsive YouTube-style UI using HTML/CSS; flexbox + media queries; debugged with Chrome DevTools; team of 4."
      },
      {
        name: "Web Development Challenge",
        date: "Team Project",
        details: "Built a web solution using HTML/CSS/JavaScript; collaborated with teammates; positive judge feedback."
      },
      {
        name: "Code Clash Seminar",
        date: "2023",
        details: "Organized a campus seminar featuring an American Express Software Engineer at Caldwell University."
      }
    ],
    organizations: [
      "NSBE (National Society of Black Engineers)",
      "Google Student Developer Club (GDSC)",
      "International Student Organization",
      "Computer Science Organization",
      "Rewriting the Code"
    ],
    awards: [
      "President’s List",
      "Honors Student",
      "Caldwell University Tuition Scholarship"
    ]
  };

  const normalize = (s) => (s || "").toLowerCase().trim();

  function answer(qRaw) {
    const q = normalize(qRaw);

    if (!q) return "Ask something like: “What’s your GPA?” or “List your projects.”";
    if (/(hi|hello|hey)\b/.test(q)) return "Hey! I’m Samuel’s profile bot. Ask me about education, projects, experience, or contact info.";

    if (q.includes("name")) return `Name: ${profile.name}`;
    if (q.includes("email")) return `Email: ${profile.email}`;
    if (q.includes("phone") || q.includes("number")) return `Phone: ${profile.phone}`;
    if (q.includes("linkedin")) return `LinkedIn: ${profile.linkedin}`;

    if (q.includes("school") || q.includes("university") || q.includes("college")) {
      return `School: ${profile.school}\nMajor: ${profile.major}\nGPA: ${profile.gpa}\nExpected graduation: ${profile.grad}`;
    }
    if (q.includes("major")) return `Major: ${profile.major}`;
    if (q.includes("gpa")) return `GPA: ${profile.gpa}`;
    if (q.includes("graduate") || q.includes("graduation")) return `Expected graduation: ${profile.grad}`;
    if (q.includes("course") || q.includes("class") || q.includes("coursework")) {
      return `Relevant coursework:\n- ${profile.coursework.join("\n- ")}`;
    }

    if (q.includes("project") || q.includes("portfolio") || q.includes("build")) {
      return `Projects:\n- ${profile.projects.map(p => `${p.name} (${p.date})`).join("\n- ")}\n\nAsk “Tell me about YouTube Clone” for details.`;
    }
    if (q.includes("youtube")) {
      const p = profile.projects.find(p => normalize(p.name).includes("youtube"));
      return p ? `${p.name} — ${p.date}\n${p.details}` : "I don’t see YouTube Clone in the project list.";
    }
    if (q.includes("code clash")) {
      const p = profile.projects.find(p => normalize(p.name).includes("code clash"));
      return p ? `${p.name} — ${p.date}\n${p.details}` : "I don’t see Code Clash in the project list.";
    }

    if (q.includes("experience") || q.includes("timeline") || q.includes("work") || q.includes("intern")) {
      return `Experience highlights:\n- ${profile.highlights.join("\n- ")}`;
    }
    if (q.includes("tmcf") || q.includes("pitch")) {
      return "TMCF The Pitch (May 2024): Finalist presenting SerenitySphere — an AI-based virtual companion with gamification for veterans dealing with PTSD and combat stress.";
    }
    if (q.includes("metascholars") || q.includes("metaverse")) {
      return "TMCF Metascholars (Feb–May 2023): trained on metaverse platforms/technologies and explored cryptonomics & tokenomics (blockchain/decentralized economies).";
    }
    if (q.includes("ai campus") || q.includes("legend of zelda") || q.includes("research")) {
      return "National AI Campus Project (Feb–May 2023): data wrangling, binary classification & regression, plus visualizations and analytical results on a Legend of Zelda dataset.";
    }
    if (q.includes("hbcu first")) {
      return "HBCU First (May–Jul 2023): selected from 300+ applicants for Fortune 500 career workshops; focused on networking, technical career navigation, and professional branding.";
    }

    if (q.includes("organization") || q.includes("club")) return `Organizations:\n- ${profile.organizations.join("\n- ")}`;
    if (q.includes("award") || q.includes("honor") || q.includes("scholarship")) return `Honors/Awards:\n- ${profile.awards.join("\n- ")}`;

    return "I can answer questions about Samuel’s education, skills, projects, experience, organizations, awards, and contact info.\nTry: “List your projects”, “What’s your GPA?”, or “Tell me about TMCF The Pitch.”";
  }

  // UI injection
  root.innerHTML = `
    <button class="chatbot-launcher" id="chatbotOpen">Ask about Samuel</button>

    <div class="chatbot-panel" id="chatbotPanel" aria-label="Profile chatbot">
      <div class="chatbot-header">
        <div class="chatbot-title">
          <strong>Samuel’s Profile Bot</strong>
          <span>Ask about projects, timeline, skills</span>
        </div>
        <button class="chatbot-close" id="chatbotClose">✕</button>
      </div>

      <div class="chatbot-messages" id="chatbotMsgs"></div>

      <div class="chatbot-suggestions" id="chatbotSug">
        <button type="button" data-q="List your projects">Projects</button>
        <button type="button" data-q="What’s your GPA?">GPA</button>
        <button type="button" data-q="Tell me about TMCF The Pitch">TMCF</button>
        <button type="button" data-q="How can I contact you?">Contact</button>
      </div>

      <div class="chatbot-input">
        <input id="chatbotInput" type="text" placeholder="Ask a question..." autocomplete="off" />
        <button id="chatbotSend" type="button">Send</button>
      </div>
    </div>
  `;

  const panel = document.getElementById("chatbotPanel");
  const openBtn = document.getElementById("chatbotOpen");
  const closeBtn = document.getElementById("chatbotClose");
  const msgs = document.getElementById("chatbotMsgs");
  const input = document.getElementById("chatbotInput");
  const send = document.getElementById("chatbotSend");
  const sug = document.getElementById("chatbotSug");

  function addMsg(text, who) {
    const div = document.createElement("div");
    div.className = `msg ${who}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function botReply(q) {
    addMsg(q, "user");
    addMsg(answer(q), "bot");
  }

  function openChat() {
    panel.classList.add("open");
    if (msgs.childElementCount === 0) {
      addMsg("Hi! Ask me anything about Samuel’s profile (projects, education, experience, contact info).", "bot");
    }
    setTimeout(() => input.focus(), 50);
  }

  function closeChat() {
    panel.classList.remove("open");
  }

  openBtn.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);

  send.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    botReply(q);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send.click();
    }
  });

  sug.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (!btn) return;
    openChat();
    botReply(btn.getAttribute("data-q"));
  });
}
