// Static fallback, used when Supabase is unreachable (see src/api/content.js).
// Shape matches the `experiences` table row exactly. Regenerate with
// `npm run sync-fallback` after editing content in /admin.
const experiences = [
  {
    id: '1',
    company_logo_url: null,
    job_title: 'Back-end Developer Apprentice (PHP / Symfony)',
    company: 'Dans nos Cœurs - Groupe Additi',
    location: 'Clermont-Ferrand, France',
    dates: 'Sep 2025 - Oct 2026',
    description:
      'Complete rebuild of the e-commerce platform (V5 → V6) with Symfony 7 / Sylius 2 in hexagonal architecture (DDD, CQRS), deployed with Docker (CI/CD) using Agile / Scrum. Led the MySQL → PostgreSQL data migration across 200+ tables: Doctrine modeling, import commands and asynchronous processing with Symfony Messenger. Specified and built REST API endpoints with API Platform, including an external service integration over OAuth2, covered by unit and functional tests (PHPUnit) and code reviews.',
    skills: [
      'Symfony 7',
      'Sylius 2',
      'API Platform',
      'Doctrine ORM',
      'Symfony Messenger',
      'PostgreSQL',
      'MySQL',
      'OAuth2',
      'PHPUnit',
      'Docker',
      'CI/CD',
      'DDD',
      'CQRS',
      'Hexagonal Architecture',
      'Agile / Scrum',
    ],
    sort_order: 0,
  },
  {
    id: '2',
    company_logo_url: null,
    job_title: 'Web Developer Intern (Symfony)',
    company: 'Dans nos Cœurs - Groupe Additi',
    location: 'Clermont-Ferrand, France',
    dates: 'Apr 2025 - Aug 2025 · 5 months',
    description:
      'Delivered an online directory of 2,000+ funeral homes: PHP/Symfony back-end and MySQL database design, from technical specification to final acceptance testing. Increased organic traffic by 18% through technical SEO (internal linking, 301 redirects, performance) and automated data feeding with ETL processes.',
    skills: ['PHP', 'Symfony', 'MySQL', 'Technical SEO', 'ETL'],
    sort_order: 1,
  },
  {
    id: '3',
    company_logo_url:
      'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046129/channels4_profile_eo3kwx.jpg',
    job_title: 'Back-end Developer Intern (.NET)',
    company: 'Dasseti',
    location: 'Dubai, UAE',
    dates: 'Feb 2024 - May 2024 · 4 months',
    description:
      "Designed an ETL process with .NET and SQL Server integrating the SEC's Form ADV data into Dasseti, using Clean Architecture. Sped up processing by 300% and reduced database size by 35% through 3NF normalization and batch processing, on 10M+ records.",
    skills: ['ASP.NET', 'SQL Server', 'ETL', 'Clean Architecture', 'REST APIs'],
    sort_order: 2,
  },
  {
    id: '4',
    company_logo_url:
      'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046241/logo_face_book_qf2oh8.jpg',
    job_title: 'Mobile/web Developer',
    company: 'ISET SOUSSE',
    location: 'Sousse, Tunisia',
    dates: 'Jan 2024 - Feb 2024',
    description:
      'Development of a mobile application in Java and a web application with .NET for administrative management (make-up requests, schedule management, assignment creation, etc.).',
    skills: ['ASP.NET', 'Android', 'REST APIs', 'Java', 'XML', 'Engineering'],
    sort_order: 3,
  },
  {
    id: '5',
    company_logo_url:
      'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046288/images_2_hcthkn.png',
    job_title: 'Mobile Developer',
    company: 'Enova Robotics',
    location: 'Sousse, Tunisia',
    dates: 'Jun 2023 - Jul 2023',
    description:
      'Development of a mobile application using React and Ionic to control a solar panel cleaning robot.',
    skills: ['React', 'Ionic'],
    sort_order: 4,
  },
  {
    id: '6',
    company_logo_url:
      'https://res.cloudinary.com/deiimmbyt/image/upload/v1735046643/Screenshot_2024-12-24_142328-removebg-preview_bay3h3.png',
    job_title: 'Computer Repair Technician',
    company: 'MIPS Tunisie',
    location: 'Sousse, Tunisia',
    dates: 'Jan 2022 - Feb 2022',
    description:
      'Diagnosing and resolving technical issues for clients. Performing preventive maintenance on computer hardware.',
    skills: [
      'Computer Repair',
      'Computer Hardware Troubleshooting',
      'Technical Services',
      'Computer Systems Maintenance',
    ],
    sort_order: 5,
  },
];

export default experiences;
