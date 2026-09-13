/* =========================================================================
   PORTFOLIO DATA
   -------------------------------------------------------------------------
   This is the ONLY file you should need to edit to update your content.
   Everything on the site is rendered from the `portfolioData` object below.

   HOW TO:
   - Add a project      -> push a new object into `projects`
   - Remove a project    -> delete its object from `projects`
   - Add a certificate  -> push a new object into `certificates`
   - Edit a link         -> change the matching field in `socialLinks` or the
                            `links` object inside a project/certificate
   - Add a skill         -> push a new object into the right category array
                            inside `skills`
   - Update resume       -> set `personalInfo.resumeUrl` to your hosted PDF
                            link (e.g. a GitHub raw link or Google Drive link)

   Any field set to `null` is treated as "not provided yet" by the UI and
   will render as an editable placeholder instead of a dead/fake link.
   ========================================================================= */

const portfolioData = {

  personalInfo: {
    name: "Nikhil Kushwah",
    roles: [
      "Software Developer",
      "Data Science Enthusiast",
      "DSA Problem Solver",
      "Machine Learning Enthusiast"
    ],
    tagline: "Computer Science Student | Software Developer | Data & AI Enthusiast",
    description: "Computer Science and Engineering student passionate about Data Structures, Software Development, Data Science, Machine Learning, and building interactive real-world applications.",
    aboutSummary: "I am a Computer Science and Engineering student at Lovely Professional University, focused on strengthening my programming, problem-solving, data analysis, and software development skills.",
    interests: [
      "Data Structures & Algorithms",
      "Software Development",
      "Data Science",
      "Machine Learning",
      "Data Visualization",
      "Database Technologies"
    ],
    phone: "+91-9258035934",
    email: "kushwahnikhil146@gmail.com",
    // Set this to a hosted PDF URL (Google Drive share link / GitHub raw link) when ready.
    resumeUrl: "https://drive.google.com/file/d/14pMkpbUBdd8oFZtaJZWewEqJ0PIeUd2X/view?usp=sharing"
  },

  socialLinks: {
    github: "https://github.com/nikhil146-byte",
    linkedin: "https://linkedin.com/in/nikhil-kushwah01/",
    email: "kushwahnikhil146@gmail.com"
  },

  aboutStats: [
    { label: "Education", value: "B.Tech CSE", isNumber: false },
    { label: "University", value: "Lovely Professional University", isNumber: false },
    { label: "CGPA", value: 7.20, isNumber: true, suffix: "" },
    { label: "Featured Projects", value: 2, isNumber: true, suffix: "" },
    { label: "Certificates", value: 5, isNumber: true, suffix: "" }
  ],

  /* ---------------------------------------------------------------------
     SKILLS — grouped by category. `filterKey` must match a value used in
     the filter button list below.
  --------------------------------------------------------------------- */
  skillCategories: [
    { key: "programming", label: "Programming" },
    { key: "data-science", label: "Data Science" },
    { key: "machine-learning", label: "Machine Learning" },
    { key: "databases", label: "Databases" },
    { key: "tools", label: "Tools" },
    { key: "cs-fundamentals", label: "CS Fundamentals" },
    { key: "soft-skills", label: "Soft Skills" }
  ],

  skills: [
    // Data Science
    { name: "Pandas", category: "data-science", desc: "Data manipulation and analysis with DataFrames." },
    { name: "NumPy", category: "data-science", desc: "Numerical computing with arrays and vectorized ops." },
    { name: "Matplotlib", category: "data-science", desc: "Static, publication-quality plotting in Python." },
    { name: "Seaborn", category: "data-science", desc: "Statistical data visualization built on Matplotlib." },
    { name: "Data Cleaning", category: "data-science", desc: "Handling missing values, duplicates and inconsistencies." },
    { name: "EDA", category: "data-science", desc: "Exploratory data analysis to uncover patterns and trends." },
    { name: "Feature Engineering", category: "data-science", desc: "Transforming raw data into useful model inputs." },

    // Machine Learning
    { name: "scikit-learn", category: "machine-learning", desc: "Building and evaluating ML models in Python." },
    { name: "Classification", category: "machine-learning", desc: "Predicting categorical outcomes from data." },
    { name: "Regression", category: "machine-learning", desc: "Modeling relationships to predict continuous values." },
    { name: "Data Preprocessing", category: "machine-learning", desc: "Scaling, encoding and preparing data for models." },

    // Data Visualization & Analysis (mapped under data-science filter + tools where relevant)
    { name: "Power BI", category: "data-science", desc: "Interactive dashboards and business intelligence reports." },
    { name: "Tableau", category: "data-science", desc: "Visual analytics for exploring and presenting data." },
    { name: "Excel", category: "data-science", desc: "Spreadsheet-based analysis, formulas and pivot tables." },

    // Programming Languages
    { name: "Python", category: "programming", desc: "General-purpose language for scripting, data and ML." },
    { name: "SQL", category: "programming", desc: "Querying and managing relational databases." },
    { name: "C++", category: "programming", desc: "Systems-level programming and DSA implementation." },
    { name: "Java", category: "programming", desc: "Object-oriented programming and application development." },

    // Databases
    { name: "MySQL", category: "databases", desc: "Relational database design and querying." },
    { name: "MongoDB", category: "databases", desc: "Document-oriented NoSQL database." },

    // Tools & Platforms
    { name: "Jupyter Notebook", category: "tools", desc: "Interactive Python development and analysis." },
    { name: "Google Colab", category: "tools", desc: "Cloud-based notebooks for Python and ML experiments." },
    { name: "Git", category: "tools", desc: "Version control for tracking code changes." },
    { name: "GitHub", category: "tools", desc: "Hosting, collaborating on and showcasing code." },
    { name: "VS Code", category: "tools", desc: "Primary code editor for day-to-day development." },

    // CS Fundamentals
    { name: "DSA", category: "cs-fundamentals", desc: "Data structures and algorithms for efficient problem solving." },
    { name: "OS", category: "cs-fundamentals", desc: "Operating system concepts: processes, memory, scheduling." },
    { name: "DBMS", category: "cs-fundamentals", desc: "Database management system design and theory." },
    { name: "CN", category: "cs-fundamentals", desc: "Computer networks: protocols, architecture and communication." },

    // Soft Skills
    { name: "Analytical Thinking", category: "soft-skills", desc: "Breaking down problems methodically to find solutions." },
    { name: "Communication", category: "soft-skills", desc: "Explaining technical ideas clearly to any audience." },
    { name: "Leadership", category: "soft-skills", desc: "Guiding and coordinating collaborative work." },
    { name: "Problem Solving", category: "soft-skills", desc: "Approaching challenges with structured, creative thinking." }
  ],

  /* ---------------------------------------------------------------------
     PROJECTS — add new projects by pushing another object here. The card
     renderer and filter system read this array automatically, so no UI
     code changes are required to add, edit, or remove a project.
  --------------------------------------------------------------------- */
  projectFilterOptions: ["Web Development", "DSA", "Data Science", "Power BI"],

  projects: [
    {
      id: "dsa-quiz-app",
      title: "DSA Quiz Application",
      subtitle: "Interactive Learning Platform",
      date: "Feb 2026 – Mar 2026",
      description: "Developed a 30+ MCQ DSA quiz platform with timed quizzes, automatic evaluation, scoring, and accuracy tracking.",
      details: [
        "Implemented performance reports, question-wise review, and leaderboard ranking using JavaScript arrays, objects, and sorting.",
        "Designed a responsive frontend with client-side data persistence using Local Storage.",
        "Implemented secure admin-side question management with functionality to add, edit, delete, and reset quiz questions dynamically."
      ],
      features: [
        "30+ MCQ questions",
        "Timed quizzes",
        "Automatic evaluation",
        "Scoring & accuracy tracking",
        "Performance reports",
        "Question-wise review",
        "Leaderboard ranking",
        "Client-side data persistence",
        "Admin: add / edit / delete questions",
        "Reset quiz questions dynamically"
      ],
      tech: ["JavaScript", "HTML", "CSS", "Local Storage", "DSA"],
      categories: ["DSA", "Web Development"],
      links: {
        github: "https://github.com/nikhil146-byte/DSA-Quiz-Application",   // CV listed only "Link" — add the real repo URL here
        demo: "https://nikhil146-byte.github.io/DSA-Quiz-Application/",     // add a hosted demo URL here when available
      }
    },
    {
      id: "crime-insights-dashboard",
      title: "Crime Insights & Intelligence Dashboard",
      subtitle: "Power BI | Data Modeling",
      date: "Jan 2026 – Feb 2026",
      description: "Built an interactive Power BI dashboard for town-level crime surveillance with KPI cards, dynamic filters/slicers, and trend analysis for a quick performance overview.",
      details: [
        "Performed data cleaning and data modeling to structure raw crime datasets for accurate and reliable reporting.",
        "Designed comparative visuals and interactive charts to support faster, data-driven decision making.",
        "Delivered a clean, user-friendly dashboard layout, strengthening skills in Power BI, data visualization, and dashboard design."
      ],
      features: [
        "Town-level crime surveillance",
        "KPI cards",
        "Dynamic filters & slicers",
        "Trend analysis",
        "Comparative visualizations",
        "Interactive charts",
        "Data cleaning & modeling",
        "Data-driven decision support"
      ],
      tech: ["Power BI", "Data Modeling", "Data Cleaning", "Data Visualization", "Dashboard Design"],
      categories: ["Data Science", "Power BI"],
      links: {
        github: "https://github.com/nikhil146-byte/python-crime-analysis",   // CV listed only "Link" — add the real repo/report URL here
        demo: "https://github.com/nikhil146-byte/python-crime-analysis",
      }
    }
  ],

  /* ---------------------------------------------------------------------
     TRAINING
  --------------------------------------------------------------------- */
  training: [
    {
      title: "Fundamentals of Data Structures",
      organization: "Centre for Professional Enhancement, LPU",
      duration: "Jun 2026 – Jul 2026",
      details: [
        "Gained strong knowledge of core DSA including arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching.",
        "Developed problem-solving skills by implementing efficient data structures and analyzing time complexity."
      ],
      chips: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Sorting", "Searching", "Time Complexity"]
    }
  ],

  /* ---------------------------------------------------------------------
     CERTIFICATES — `link: null` renders an editable "Add link" placeholder
     instead of a fabricated URL.
  --------------------------------------------------------------------- */
  certFilterOptions: ["Data Structures", "AI", "Cloud", "Data Platform", "Cyber Security", "Communication"],

  certificates: [
    {
      title: "Fundamentals of Data Structures",
      organization: "Centre for Professional Enhancement, LPU",
      date: "Aug 2026",
      categories: ["Data Structures"],
      link: "https://drive.google.com/file/d/1SqGmAEEWctkS0ZsBqy7GHr7NSUT2OCtC/view?usp=sharing"
    },
    {
      title: "Oracle Cloud Infrastructure 2025 — AI Foundations Associate",
      organization: "Oracle",
      date: "Mar 2026",
      categories: ["AI", "Cloud"],
      link: "https://drive.google.com/file/d/13rpq3x2DD6egUzxzb6pJzXYi2CQN41oC/view?usp=sharing"
    },
    {
      title: "Oracle Data Platform 2025 — Foundations",
      organization: "Oracle",
      date: "Mar 2026",
      categories: ["Data Platform", "Cloud"],
      link: "https://drive.google.com/file/d/1-imurpehZiY7YWmz0dlZplF96yPa5ujC/view?usp=sharing"
    },
    {
      title: "Cyber Smart Awareness",
      organization: "WNS Care",
      date: "Oct 2025",
      categories: ["Cyber Security"],
      link: "https://drive.google.com/file/d/1qDoO6y2gvymyh8ILo-zyRk2OhhfiYtwO/view?usp=sharing"
    },
    {
      title: "Effective Communication Skills",
      organization: "Skillera",
      date: "Oct 2024",
      categories: ["Communication"],
      link: "https://drive.google.com/file/d/1wuwXo4k9XyhFNhpTILLRPQAZjU9LOWu0/view?usp=sharing"
    }
  ],

  /* ---------------------------------------------------------------------
     ACHIEVEMENTS
  --------------------------------------------------------------------- */
  achievements: [
    {
      title: "Certifications across AI, Data Platforms & DSA",
      description: "Earned certifications in AI, Data Platforms and DSA from Oracle and Infosys.",
      date: "Sep 2025 – Jun 2026"
    }
  ],

  /* ---------------------------------------------------------------------
     EDUCATION
  --------------------------------------------------------------------- */
  education: [
    {
      institution: "Lovely Professional University",
      qualification: "Bachelor of Technology – Computer Science and Engineering",
      duration: "Aug 2024 – Present",
      score: "CGPA: 7.20",
      location: "Phagwara, Punjab"
    },
    {
      institution: "Kids Corner Happy Senior Secondary School",
      qualification: "Intermediate",
      duration: "Apr 2022 – Mar 2023",
      score: "65%",
      location: "Firozabad, Uttar Pradesh"
    },
    {
      institution: "Kids Corner Happy Senior Secondary School",
      qualification: "Matriculation",
      duration: "Apr 2020 – Mar 2021",
      score: "72%",
      location: "Firozabad, Uttar Pradesh"
    }
  ],

  /* ---------------------------------------------------------------------
     DEVELOPER DASHBOARD — only verified info, no fabricated stats.
     Set `github.liveStatsEnabled = true` to attempt a live public GitHub
     API call for repo count (see main.js `loadGithubStats`).
  --------------------------------------------------------------------- */
  dashboard: {
    githubUsername: "nikhil146-byte",
    liveStatsEnabled: true,
    cards: [
      { key: "github", title: "GitHub", desc: "Code, repositories and commit history.", cta: "Visit Profile" },
      { key: "dsa", title: "DSA", desc: "Arrays, linked lists, trees, graphs, sorting & searching.", cta: null },
      { key: "programming", title: "Programming", desc: "Python, C++, Java, SQL.", cta: null },
      { key: "projects", title: "Projects", desc: "2 featured builds, more in progress.", cta: null },
      { key: "data-science", title: "Data Science", desc: "Pandas, NumPy, EDA, Power BI, Tableau.", cta: null },
      { key: "machine-learning", title: "Machine Learning", desc: "scikit-learn, classification, regression.", cta: null }
    ]
  }
};
