import { Job } from '../types/job';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Software Development Engineer - Fresher',
    company: 'FinEdge Technologies',
    companyInitials: 'FE',
    logoBgColor: 'bg-blue-600',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Fresher / Entry',
    minExperienceYears: 0,
    salary: '₹6,00,000 - ₹9,00,000 / year',
    minSalaryUSD: 8000,
    department: 'Engineering',
    skills: ['Java', 'Data Structures', 'Algorithms', 'SQL', 'Git'],
    description: 'FinEdge is hiring enthusiastic fresh graduates for our Core Banking platform engineering group. You will collaborate with senior architects to develop scalable microservices, write clean maintainable code, and build low-latency transactional systems.',
    responsibilities: [
      'Write modular, readable, and well-tested code following OOP design principles.',
      'Participate in code reviews, daily standups, and architectural design sessions.',
      'Assist in database schema design, querying, and performance tuning.',
      'Build unit tests and integration tests to maintain high quality standards.',
      'Troubleshoot and debug production defects in lower staging environments.'
    ],
    qualifications: [
      'B.Tech / B.E / MCA in Computer Science, IT, or related technical disciplines (Graduation 2024 - 2026).',
      'Strong foundations in Data Structures, Algorithms, and Object-Oriented Programming (Java / C++).',
      'Hands-on experience with relational databases (MySQL, PostgreSQL) and SQL syntax.',
      'Familiarity with version control using Git and GitHub.',
      'Eager to learn modern cloud frameworks like Spring Boot and Docker.'
    ],
    benefits: [
      'Mentorship program with Principal Engineers',
      'Comprehensive medical insurance for employee & parents',
      'Hybrid work flexibility with home office reimbursement',
      'Learning stipend of ₹30,000 per year for technical certifications'
    ],
    deadline: '2026-10-30',
    postedDate: '2 days ago',
    openings: 8,
    isFeatured: true
  },
  {
    id: 'job-2',
    title: 'Frontend Web Developer (React.js)',
    company: 'Nova Cloud Systems',
    companyInitials: 'NC',
    logoBgColor: 'bg-indigo-600',
    location: 'Hyderabad, India',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹8,50,000 - ₹14,00,000 / year',
    minSalaryUSD: 12000,
    department: 'Product Engineering',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'REST APIs'],
    description: 'Join our fast-growing SaaS team crafting enterprise cloud management interfaces. We value engineers who care about pixel perfection, accessible components, and lightning-fast web performance.',
    responsibilities: [
      'Build reusable, accessible React components with TypeScript and Tailwind CSS.',
      'Collaborate with UI/UX designers to translate Figma design systems into responsive pages.',
      'Integrate frontend state with RESTful and GraphQL backend endpoints.',
      'Optimize client bundle sizes, rendering cycles, and core web vitals.',
      'Participate in bi-weekly sprint planning and user feedback retrospectives.'
    ],
    qualifications: [
      '1 to 3 years of hands-on experience building production web apps with React.js.',
      'Strong proficiency in modern JavaScript (ES6+), TypeScript, HTML5, and CSS3.',
      'Experience with state management libraries (Redux Toolkit, Zustand, or TanStack Query).',
      'Understanding of browser networking, DOM APIs, and asynchronous data fetching.',
      'Strong debugging and profiling skills using browser devtools.'
    ],
    benefits: [
      '100% remote-first company culture with flexible working hours',
      'High-spec MacBook Pro hardware allowance',
      'Annual team offsite retreats and conferences',
      'Performance-based annual bonuses'
    ],
    deadline: '2026-11-15',
    postedDate: '1 day ago',
    openings: 4,
    isFeatured: true
  },
  {
    id: 'job-3',
    title: 'Data Analyst & BI Intern',
    company: 'QuantMetrics Labs',
    companyInitials: 'QM',
    logoBgColor: 'bg-emerald-600',
    location: 'Pune, India',
    workMode: 'Hybrid',
    jobType: 'Internship',
    experienceLevel: 'Fresher / Entry',
    minExperienceYears: 0,
    salary: '₹25,000 - ₹35,000 / month stipend',
    minSalaryUSD: 4000,
    department: 'Business Intelligence',
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Pandas'],
    description: 'QuantMetrics is looking for an analytical mind eager to convert raw enterprise data into actionable business dashboards. Perfect for final-year college students or recent graduates with strong problem-solving capabilities.',
    responsibilities: [
      'Write SQL queries to extract, clean, and aggregate dataset metrics from operational databases.',
      'Construct automated dashboards and visual reports in Power BI / Tableau.',
      'Perform exploratory data analysis using Python (Pandas, NumPy, Matplotlib).',
      'Assist senior business analysts in presenting weekly KPI findings to stakeholders.',
      'Document data dictionaries and maintain automated data refresh schedules.'
    ],
    qualifications: [
      'B.Tech / B.Sc / B.Com / BCA with coursework in statistics, math, or computer science.',
      'Proficient in SQL (Joins, Window Functions, Group By) and Advanced Microsoft Excel.',
      'Familiarity with Python for data manipulation and visualization.',
      'Strong communication skills to explain numbers clearly to non-technical partners.',
      'Portfolio projects or Kaggle notebooks are a strong plus.'
    ],
    benefits: [
      'Pre-Placement Offer (PPO) opportunities based on internship performance',
      'Daily cafeteria meals and transport shuttle provided',
      'Direct mentorship from Chief Data Officer'
    ],
    deadline: '2026-10-25',
    postedDate: '3 days ago',
    openings: 3
  },
  {
    id: 'job-4',
    title: 'Backend Python Engineer',
    company: 'Stratos Data Corp',
    companyInitials: 'SD',
    logoBgColor: 'bg-amber-600',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹10,00,000 - ₹16,00,000 / year',
    minSalaryUSD: 14000,
    department: 'Platform Engineering',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    description: 'We are seeking a Python backend developer to build resilient APIs and data streaming pipelines for our logistics automation platform. You will build high-throughput microservices capable of processing millions of daily events.',
    responsibilities: [
      'Design, build, and deploy RESTful microservices using FastAPI and SQLAlchemy.',
      'Design relational schemas and optimize database indexing in PostgreSQL.',
      'Implement asynchronous job queues with Celery and Redis.',
      'Write thorough unit and integration test suites with Pytest.',
      'Collaborate with frontend engineers and DevOps to maintain seamless CI/CD releases.'
    ],
    qualifications: [
      '1-3 years of server-side engineering experience with Python (Django or FastAPI).',
      'Solid grasp of relational databases, transactions, and ACID principles.',
      'Experience containerizing applications with Docker.',
      'Working knowledge of caching systems and distributed pub/sub queues.',
      'Comfortable working in a Linux terminal environment.'
    ],
    benefits: [
      'Flexible working hours across all time zones',
      'Generous paid time off policy (25 days annual leave)',
      'Home office ergonomic equipment stipend',
      'Company health insurance plan with dental and optical support'
    ],
    deadline: '2026-11-20',
    postedDate: 'Just now',
    openings: 2,
    isFeatured: true
  },
  {
    id: 'job-5',
    title: 'UI/UX Design Intern',
    company: 'DesignCraft Studio',
    companyInitials: 'DC',
    logoBgColor: 'bg-purple-600',
    location: 'Mumbai, India',
    workMode: 'Hybrid',
    jobType: 'Internship',
    experienceLevel: 'Fresher / Entry',
    minExperienceYears: 0,
    salary: '₹20,000 - ₹30,000 / month stipend',
    minSalaryUSD: 3500,
    department: 'Product Design',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    description: 'An internship opportunity for students and design graduates passionate about crafting intuitive, beautiful mobile and web applications. You will work closely with product managers and engineers to conduct user research and deliver interactive prototypes.',
    responsibilities: [
      'Create high-fidelity wireframes, user journeys, and mockups in Figma.',
      'Conduct user interviews, usability testing, and synthesize qualitative feedback.',
      'Maintain and extend our cross-platform design token component library.',
      'Produce micro-interaction animations and interactive click-through prototypes.',
      'Hand off organized design specs and asset bundles to engineering teams.'
    ],
    qualifications: [
      'Degree or diploma in Interaction Design, Graphic Design, HCI, or related field.',
      'A design portfolio showcasing 2 or more web/mobile case studies (Behance, Dribbble, or web link).',
      'Proficiency in Figma (Components, Auto-layout, Variants).',
      'Understanding of visual hierarchy, typography, contrast standards, and responsive grids.',
      'Empathetic approach towards solving real user frustration points.'
    ],
    benefits: [
      'Full-time placement offer for exceptional interns',
      'Paid access to design resources, typography licenses, and plugins',
      'Weekly 1-on-1 design critique sessions with Senior Art Director'
    ],
    deadline: '2026-10-18',
    postedDate: '4 days ago',
    openings: 2
  },
  {
    id: 'job-6',
    title: 'Cloud & DevOps Associate',
    company: 'SkyScale Infra',
    companyInitials: 'SS',
    logoBgColor: 'bg-cyan-600',
    location: 'Bangalore, India',
    workMode: 'On-site',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹9,00,000 - ₹15,00,000 / year',
    minSalaryUSD: 13000,
    department: 'Infrastructure',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD'],
    description: 'Help manage and scale our multi-region Kubernetes clusters on AWS. You will automate deployment pipelines, enhance monitoring observability, and guarantee 99.99% system reliability.',
    responsibilities: [
      'Maintain GitHub Actions and GitLab CI/CD automation pipelines.',
      'Provision and manage cloud infrastructure using Terraform Infrastructure-as-Code.',
      'Monitor cluster health, log aggregation, and alerting via Prometheus and Grafana.',
      'Assist developers in diagnosing networking, DNS, and ingress container issues.',
      'Execute automated security audits and OS patch upgrades.'
    ],
    qualifications: [
      '1 to 3 years experience working with AWS services (EC2, S3, RDS, EKS, VPC).',
      'Hands-on containerization experience with Docker and basic Kubernetes concepts.',
      'Comfortable writing Bash shell scripts or Python automation scripts.',
      'Understanding of SSL/TLS certificates, reverse proxies (Nginx), and DNS routing.',
      'AWS Certified Solutions Architect Associate is an advantage.'
    ],
    benefits: [
      'Company covers 100% exam fees for cloud certifications',
      'Catered gourmet meals and snacks on campus',
      'Annual health wellness allowance and gym membership'
    ],
    deadline: '2026-11-10',
    postedDate: '5 days ago',
    openings: 3
  },
  {
    id: 'job-7',
    title: 'Senior Full Stack Engineer',
    company: 'Aura Health Tech',
    companyInitials: 'AH',
    logoBgColor: 'bg-teal-600',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: '3-5 years',
    minExperienceYears: 3,
    salary: '₹18,00,000 - ₹28,00,000 / year',
    minSalaryUSD: 24000,
    department: 'Core Platform',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'AWS'],
    description: 'Aura is modernizing digital patient health monitoring. We need a seasoned Full Stack Engineer with strong architectural acumen who can lead feature squads and build HIPAA-compliant healthcare portals.',
    responsibilities: [
      'Architect resilient end-to-end full stack web applications with React and Node.js.',
      'Mentor junior and mid-level developers through thorough code reviews and paired programming.',
      'Design secure GraphQL and REST APIs with granular role-based access control.',
      'Champion automated testing, linting, and continuous delivery best practices.',
      'Collaborate with product leaders to turn clinical business requirements into technical specs.'
    ],
    qualifications: [
      '3-5 years of professional full-stack development experience.',
      'Mastery of TypeScript across both browser and server runtimes.',
      'Deep knowledge of relational database tuning and transaction isolation.',
      'Demonstrated experience building scalable systems serving high concurrency.',
      'Strong problem-solving mindset and ownership mentality.'
    ],
    benefits: [
      'Competitive equity options with 4-year vesting schedule',
      'Unlimited Paid Time Off (PTO) policy',
      'Comprehensive family medical cover including mental health counseling',
      'Annual home workstation upgrade budget'
    ],
    deadline: '2026-11-30',
    postedDate: '1 week ago',
    openings: 2,
    isFeatured: true
  },
  {
    id: 'job-8',
    title: 'QA Automation Engineer - Fresher / Trainee',
    company: 'TestVanguard Solutions',
    companyInitials: 'TV',
    logoBgColor: 'bg-sky-600',
    location: 'Chennai, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Fresher / Entry',
    minExperienceYears: 0,
    salary: '₹4,50,000 - ₹7,00,000 / year',
    minSalaryUSD: 6000,
    department: 'Quality Assurance',
    skills: ['Selenium', 'Java', 'Manual Testing', 'Jira', 'API Testing', 'Postman'],
    description: 'Start your software testing career at TestVanguard! We will train you on building automated test harnesses, executing regression cycles, and verifying REST API endpoints across financial applications.',
    responsibilities: [
      'Write detailed test cases, acceptance criteria, and traceability matrices.',
      'Develop automated UI test scripts using Selenium WebDriver and TestNG.',
      'Perform functional, regression, sanity, and boundary exploratory testing.',
      'Validate backend API responses using Postman and Newman collections.',
      'Log clear defect reports with replication steps and screen recordings in Jira.'
    ],
    qualifications: [
      'BCA, B.Sc Computer Science, or B.Tech graduates (Fresher batch).',
      'Knowledge of Core Java basics (loops, methods, collections, exceptions).',
      'Clear understanding of Software Testing Life Cycle (STLC) and bug life cycle.',
      'Keen attention to detail and ability to think from the end-user perspective.',
      'Basic knowledge of HTML, CSS selectors, and XPath.'
    ],
    benefits: [
      'Structured 3-month paid technical onboarding program',
      'Certification sponsorship for ISTQB Foundation level',
      'Friendly work-life balance culture'
    ],
    deadline: '2026-10-28',
    postedDate: '3 days ago',
    openings: 5
  },
  {
    id: 'job-9',
    title: 'Machine Learning Engineer',
    company: 'CognitiveCore AI',
    companyInitials: 'CC',
    logoBgColor: 'bg-violet-600',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: '3-5 years',
    minExperienceYears: 3,
    salary: '₹20,00,000 - ₹32,00,000 / year',
    minSalaryUSD: 28000,
    department: 'Applied AI',
    skills: ['Python', 'PyTorch', 'NLP', 'TensorFlow', 'MLOps', 'FastAPI'],
    description: 'CognitiveCore creates intelligent document extraction and natural language reasoning engines for global enterprise clients. We are looking for an ML engineer who can take experimental notebooks and convert them into low-latency production inference services.',
    responsibilities: [
      'Fine-tune state-of-the-art LLMs and transformer architectures for domain classification.',
      'Build scalable data ingestion and preprocessing pipelines for semi-structured text.',
      'Package and deploy ML models using ONNX, Triton, or FastAPI in Docker containers.',
      'Implement drift detection, accuracy monitoring, and automated retraining pipelines.',
      'Collaborate with product teams to benchmark inference latency and cost tradeoffs.'
    ],
    qualifications: [
      '3+ years experience with machine learning systems and deep learning frameworks.',
      'Strong command of Python, NumPy, Pandas, Scikit-learn, and PyTorch.',
      'Experience with transformer architectures (Hugging Face ecosystem).',
      'Familiarity with vector databases (Pinecone, Milvus, Chroma) and embedding search.',
      'B.Tech / M.Tech in CS, AI, or Mathematics.'
    ],
    benefits: [
      'Access to dedicated GPU clusters (A100/H100) for research experiments',
      'Relocation assistance package to Bangalore',
      'Patent filing bonuses and conference presentation sponsorship'
    ],
    deadline: '2026-11-25',
    postedDate: '4 days ago',
    openings: 2
  },
  {
    id: 'job-10',
    title: 'Associate Product Manager',
    company: 'Zest Commerce',
    companyInitials: 'ZC',
    logoBgColor: 'bg-rose-600',
    location: 'Gurgaon, India',
    workMode: 'On-site',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹12,00,000 - ₹18,00,000 / year',
    minSalaryUSD: 16000,
    department: 'Product',
    skills: ['Product Management', 'User Stories', 'Analytics', 'Agile', 'Figma'],
    description: 'We are looking for an energetic Associate Product Manager to drive key checkout and cart checkout conversion workflows on our high-volume consumer e-commerce platform.',
    responsibilities: [
      'Conduct customer interviews and extract quantitative funnel drop-off analytics.',
      'Draft detailed Product Requirement Documents (PRDs) and user stories.',
      'Work alongside design and engineering squads during bi-weekly sprint cadences.',
      'Define North Star metrics and design A/B test experiments for checkout flows.',
      'Coordinate feature rollouts and track post-launch customer adoption.'
    ],
    qualifications: [
      '1 to 3 years experience as an APM, business analyst, or technical program coordinator.',
      'Demonstrated data-driven thinking with Google Analytics, Mixpanel, or SQL.',
      'Comfortable communicating clearly with both software developers and executive sponsors.',
      'Passionate about customer empathy and seamless digital user journeys.'
    ],
    benefits: [
      'Executive mentorship from seasoned CPO',
      'Subsidized company cab transport and cafeteria',
      'Annual performance incentive plan'
    ],
    deadline: '2026-11-05',
    postedDate: '6 days ago',
    openings: 2
  },
  {
    id: 'job-11',
    title: 'Mobile App Developer (React Native / Flutter)',
    company: 'Pulse Mobility',
    companyInitials: 'PM',
    logoBgColor: 'bg-blue-700',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹9,00,000 - ₹15,00,000 / year',
    minSalaryUSD: 13000,
    department: 'Mobile Engineering',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Redux'],
    description: 'Pulse Mobility builds connected EV telemetry and urban commute mobile applications. We need a skilled mobile developer to build snappy, cross-platform Android and iOS user experiences.',
    responsibilities: [
      'Develop cross-platform features using React Native and TypeScript.',
      'Integrate Bluetooth LE and REST APIs for real-time electric scooter diagnostics.',
      'Ensure 60fps smooth animations and fast touch responses.',
      'Manage app store submission workflows (Google Play Console and Apple App Store).',
      'Diagnose and address platform-specific native crashes with Sentry.'
    ],
    qualifications: [
      '1 to 3 years of React Native application development.',
      'Published at least one production app on Google Play or Apple App Store.',
      'Solid understanding of mobile life cycles, offline caching, and push notifications.',
      'Experience with mobile navigation libraries and state management.'
    ],
    benefits: [
      'Remote-first flexibility with co-working space pass allowance',
      'Free company electric scooter trial program',
      'Generous parental leave'
    ],
    deadline: '2026-11-12',
    postedDate: '1 week ago',
    openings: 3
  },
  {
    id: 'job-12',
    title: 'Cybersecurity Operations Analyst',
    company: 'IronClad Defense',
    companyInitials: 'ID',
    logoBgColor: 'bg-slate-700',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: '1-3 years',
    minExperienceYears: 1,
    salary: '₹8,00,000 - ₹13,00,000 / year',
    minSalaryUSD: 11000,
    department: 'Security Operations',
    skills: ['SIEM', 'Network Security', 'Wireshark', 'Python', 'Incident Response'],
    description: 'Protect enterprise infrastructure by monitoring SOC alerts, conducting vulnerability assessments, and investigating anomalous network intrusions.',
    responsibilities: [
      'Monitor and triage real-time security alerts from SIEM platforms (Splunk, Sentinel).',
      'Conduct initial triage of phishing, malware, and credential stuffing incidents.',
      'Perform regular automated vulnerability scans and verify patching status.',
      'Document security incident response reports and post-mortem remediation action items.',
      'Collaborate with system admins to reinforce firewall and identity policies.'
    ],
    qualifications: [
      '1 to 3 years experience in IT security, network engineering, or SOC environment.',
      'Working knowledge of TCP/IP networking, firewalls, DNS, and endpoint security.',
      'Security+ or CEH certification is an added advantage.',
      'Strong analytical curiosity to investigate anomalous log entries.'
    ],
    benefits: [
      'Certification fee reimbursement for CISSP / CEH',
      'Shift allowance and comprehensive health cover',
      'Clear promotion track to Senior Security Specialist'
    ],
    deadline: '2026-10-31',
    postedDate: '2 days ago',
    openings: 2
  },
  {
    id: 'job-13',
    title: 'Graduate Trainee - Technical Support & Operations',
    company: 'GlobalConnect Services',
    companyInitials: 'GC',
    logoBgColor: 'bg-emerald-700',
    location: 'Noida, India',
    workMode: 'On-site',
    jobType: 'Full-time',
    experienceLevel: 'Fresher / Entry',
    minExperienceYears: 0,
    salary: '₹3,80,000 - ₹5,50,000 / year',
    minSalaryUSD: 5000,
    department: 'IT Operations',
    skills: ['Troubleshooting', 'Linux Basics', 'Networking', 'SQL Basics', 'Communication'],
    description: 'An open door for energetic college freshers from all technical streams. We will provide 2 months of classroom training in cloud services, enterprise customer ticketing, and SQL debugging.',
    responsibilities: [
      'Respond to tier-1 enterprise technical inquiries via ticketing systems and live chat.',
      'Reproduce user issues, analyze application logs, and resolve configuration errors.',
      'Escalate complex software bugs to core engineering squads with diagnostic logs.',
      'Author helpful knowledge-base guides and frequently asked questions for clients.'
    ],
    qualifications: [
      'Any technical graduation degree (BCA, B.Sc, B.Tech, B.Com Computer).',
      'Good verbal and written English communication skills.',
      'Basic familiarity with computer hardware, operating systems, and internet protocols.',
      'Positive customer-centric attitude and eagerness to learn.'
    ],
    benefits: [
      'Free door-to-door cab pickup & drop facility',
      'Subsidized campus cafeteria and game lounge',
      'Rapid internal job change (IJP) eligibility after 12 months'
    ],
    deadline: '2026-11-08',
    postedDate: '3 days ago',
    openings: 10
  },
  {
    id: 'job-14',
    title: 'Staff Distributed Systems Architect',
    company: 'Apex Core Platform',
    companyInitials: 'AC',
    logoBgColor: 'bg-blue-900',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: '5+ years',
    minExperienceYears: 6,
    salary: '₹35,00,000 - ₹55,00,000 / year',
    minSalaryUSD: 45000,
    department: 'Core Infrastructure',
    skills: ['Go', 'Distributed Systems', 'Kafka', 'Kubernetes', 'Architecture', 'PostgreSQL'],
    description: 'Lead the overarching architectural roadmap for our real-time streaming backbone supporting 50 million concurrent connected clients. Direct high-level technical decisions across multi-datacenter clusters.',
    responsibilities: [
      'Define long-term architecture for high-throughput distributed message queues.',
      'Establish technical RFC design standards, system benchmarks, and reliability guidelines.',
      'Author foundational Go libraries, consensus services, and storage engines.',
      'Serve as senior technical counsel to executive leadership.'
    ],
    qualifications: [
      '6+ years experience architecting large scale distributed production systems.',
      'Deep fluency with concurrency models in Go, Rust, or C++.',
      'Demonstrated expertise in Raft/Paxos consensus, Kafka, and sharded storage engines.',
      'Proven track record scaling systems to tens of thousands of requests per second.'
    ],
    benefits: [
      'Top-tier compensation with significant liquid equity allocation',
      'Home office budget and annual executive coaching',
      'Flexible work anywhere in the world'
    ],
    deadline: '2026-12-15',
    postedDate: '1 week ago',
    openings: 1,
    isFeatured: true
  }
];

export const DEMO_USERS: Record<string, { user: any; password: string }> = {
  fresher: {
    password: 'password123',
    user: {
      id: 'usr-fresher-01',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, India',
      headline: 'Aspiring Software Engineer | B.Tech CS 2026 Graduate',
      experienceLevel: 'Fresher / Entry',
      education: {
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'National Institute of Technology (NIT)',
        graduationYear: '2026',
        cgpaOrGrade: '8.8 / 10 CGPA',
        fieldOfStudy: 'Computer Science'
      },
      experienceSummary: 'Enthusiastic computer science graduate with solid foundational knowledge in Java, Data Structures, Algorithms, React, and SQL. Built 3 full-stack academic web applications.',
      skills: ['Java', 'React', 'JavaScript', 'SQL', 'Data Structures', 'Git', 'Python'],
      resumeFileName: 'Priya_Sharma_Resume_2026.pdf',
      resumeFileContent: 'Priya Sharma - Resume\nEducation: B.Tech Computer Science (NIT, 2026 - 8.8 CGPA)\nSkills: Java, React.js, JavaScript, SQL, Algorithms, Git\nProjects:\n1. Campus Job Portal - React, Node, SQL\n2. Algorithm Visualizer - React & HTML5 Canvas\nCertifications: Oracle Certified Java Associate',
      resumeUpdatedDate: '2026-09-20',
      avatarColor: 'bg-blue-600'
    }
  },
  experienced: {
    password: 'password123',
    user: {
      id: 'usr-exp-02',
      name: 'Rahul Varma',
      email: 'rahul.varma@example.com',
      phone: '+91 91234 56789',
      location: 'Hyderabad, India',
      headline: 'Full Stack Engineer (3 yrs exp) | React, TypeScript & Node.js',
      experienceLevel: '3-5 years',
      education: {
        degree: 'B.E. in Information Technology',
        institution: 'Osmania University College of Engineering',
        graduationYear: '2023',
        cgpaOrGrade: '8.4 / 10 CGPA',
        fieldOfStudy: 'Information Technology'
      },
      experienceSummary: 'Full-stack software engineer with 3 years of building cloud-native SaaS web applications using React, TypeScript, Node.js, and PostgreSQL. Experienced in Docker containerization and CI/CD pipelines.',
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS', 'Git'],
      resumeFileName: 'Rahul_Varma_Senior_Resume.pdf',
      resumeFileContent: 'Rahul Varma - Full Stack Software Engineer\nExperience: 3 years at TechVentures\nSkills: TypeScript, React, Node.js, PostgreSQL, Docker, AWS\nKey Achievements: Scaled customer dashboard to 200k monthly active users, reduced bundle load time by 42%.',
      resumeUpdatedDate: '2026-09-15',
      avatarColor: 'bg-emerald-600'
    }
  }
};
