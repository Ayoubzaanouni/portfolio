-- Seed data: the portfolio content as it was before moving to Supabase.
-- Run after schema.sql. Safe to re-run: it replaces existing content.
begin;
delete from public.projects;
delete from public.experiences;
delete from public.skills;

insert into public.profile (id, intro_paragraphs, about_paragraphs, hobbies, linkedin_url, github_url, avatar_url, resume_url, resume_filename)
values (1,
  array['I''m a *back-end developer* specializing in **PHP / Symfony**,
with 3 years of Symfony experience on high-traffic e-commerce projects.', 'My journey began with **CS50x**, a course offered by Harvard University,
which inspired me to pursue a degree in IT at ISET Sousse, where I graduated top of my class.
I''m now completing a master''s degree in Software Engineering at ISIMA in Clermont-Ferrand.', 'I love building robust, well-designed applications with **DDD**, **hexagonal architecture** and clean REST APIs.
Open to permanent positions from **November 2026**, anywhere in France.']::text[],
  array['Hi Everyone, I am **Ayoub Zaanouni,**
back-end developer based in **Clermont-Ferrand, France.**', 'I''m completing a Master''s in Software Engineering and Application Integration (GLIA) at ISIMA,
after a Bachelor''s degree in Information Technology (Information Systems Development) at ISET Sousse, where I graduated top of my class.
I also hold Harvard''s CS50x and CS50P certificates.', 'I speak French fluently and English (TOEIC 800, B2).
At Google Developer Student Clubs, I led competitive programming (2022-2023): organizing events and mentoring 20 members.', 'In my free time I enjoy:']::text[],
  array['Playing video games', 'Camping', 'Socializing']::text[],
  'https://www.linkedin.com/in/zaanouni-ayoub/', 'https://github.com/Ayoubzaanouni', null,
  'https://raw.githubusercontent.com/Ayoubzaanouni/Me/main/CV_ZAANOUNI_Ayoub_en.pdf', 'CV_ZAANOUNI_Ayoub_en.pdf')
on conflict (id) do update set
  intro_paragraphs = excluded.intro_paragraphs,
  about_paragraphs = excluded.about_paragraphs,
  hobbies = excluded.hobbies,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url,
  avatar_url = excluded.avatar_url,
  resume_url = excluded.resume_url,
  resume_filename = excluded.resume_filename,
  updated_at = now();

insert into public.projects (title, description, image_url, site_url, repo_url, technologies, sort_order) values
  ('Eduman', 'A mobile app and admin web app designed to address administrative and pedagogical needs at ISET Sousse, simplifying makeup sessions, assignment management, and more for teachers and students.', 'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735037821/1726520913256_xodugr.jpg', null, 'https://github.com/Ayoubzaanouni/EduMan', array['#java', '#restapis', '#asp.net', '#mobile-application-development']::text[], 0),
  ('Tic-Tac-Toe AI Bot', 'A Tic-Tac-Toe AI built in Python using the Minimax algorithm for optimal gameplay.', 'https://res.cloudinary.com/deiimmbyt/image/upload/v1735040417/1703425830859_x5e1eg.jpg', null, 'https://github.com/Ayoubzaanouni/CS50/tree/main/CS50ai/week0/tictactoe', array['#python']::text[], 1),
  ('P-Solar', 'A React and Ionic mobile app for the P-Solar project, enabling communication with a solar panel cleaning robot via MQTT. The app allowed precise path planning and customized cleaning routes, enhancing cleaning efficiency.', 'https://res.cloudinary.com/deiimmbyt/image/upload/v1735040960/1703274027766_kjklau.jpg', null, null, array['#react', '#ionic', '#mqtt']::text[], 2),
  ('NutriScan', 'A Java-based Android app integrating the Open Food Facts API for barcode scanning and product details. The app includes an admin panel built with .NET Framework and SQL Server for product management and role-based authentication.', 'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735039848/407086235_1535792037199359_4276852672453533684_n_qmvwca.jpg', null, 'https://github.com/Ayoubzaanouni/NutriScan', array['#java', '#restapis', '#asp.net', '#android-studio', '#sqlserver', '#microsoft-identity']::text[], 3),
  ('Facturation System for a Music Band', 'A Python-based facturation system designed to manage invoicing for a music band. The system handles client details, performance dates, and generates invoices based on services provided, ensuring efficient billing and record-keeping.', 'https://res.cloudinary.com/deiimmbyt/image/upload/v1735042084/Screenshot_2024-12-24_130748_ryxlcy.jpg', null, null, array['#python']::text[], 4),
  ('Hardest Game', 'A multiplatform game built using Godot Engine and GDScript, where the player must avoid monsters and reach the goal. The game challenges players with difficult obstacles and requires strategic movement to succeed.', 'https://res.cloudinary.com/deiimmbyt/image/upload/v1735041537/Screenshot-2024-12-24-125504_p2bg89.jpg', null, null, array['#godot', '#gdscript', '#multiplatform']::text[], 5);

insert into public.experiences (job_title, company, company_logo_url, location, dates, description, skills, sort_order) values
  ('Back-end Developer Apprentice (PHP / Symfony)', 'Dans nos Cœurs - Groupe Additi', null, 'Clermont-Ferrand, France', 'Sep 2025 - Oct 2026', 'Complete rebuild of the e-commerce platform (V5 → V6) with Symfony 7 / Sylius 2 in hexagonal architecture (DDD, CQRS), deployed with Docker (CI/CD) using Agile / Scrum. Led the MySQL → PostgreSQL data migration across 200+ tables: Doctrine modeling, import commands and asynchronous processing with Symfony Messenger. Specified and built REST API endpoints with API Platform, including an external service integration over OAuth2, covered by unit and functional tests (PHPUnit) and code reviews.', array['Symfony 7', 'Sylius 2', 'API Platform', 'Doctrine ORM', 'Symfony Messenger', 'PostgreSQL', 'MySQL', 'OAuth2', 'PHPUnit', 'Docker', 'CI/CD', 'DDD', 'CQRS', 'Hexagonal Architecture', 'Agile / Scrum']::text[], 0),
  ('Web Developer Intern (Symfony)', 'Dans nos Cœurs - Groupe Additi', null, 'Clermont-Ferrand, France', 'Apr 2025 - Aug 2025 · 5 months', 'Delivered an online directory of 2,000+ funeral homes: PHP/Symfony back-end and MySQL database design, from technical specification to final acceptance testing. Increased organic traffic by 18% through technical SEO (internal linking, 301 redirects, performance) and automated data feeding with ETL processes.', array['PHP', 'Symfony', 'MySQL', 'Technical SEO', 'ETL']::text[], 1),
  ('Back-end Developer Intern (.NET)', 'Dasseti', 'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046129/channels4_profile_eo3kwx.jpg', 'Dubai, UAE', 'Feb 2024 - May 2024 · 4 months', 'Designed an ETL process with .NET and SQL Server integrating the SEC''s Form ADV data into Dasseti, using Clean Architecture. Sped up processing by 300% and reduced database size by 35% through 3NF normalization and batch processing, on 10M+ records.', array['ASP.NET', 'SQL Server', 'ETL', 'Clean Architecture', 'REST APIs']::text[], 2),
  ('Mobile/web Developer', 'ISET SOUSSE', 'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046241/logo_face_book_qf2oh8.jpg', 'Sousse, Tunisia', 'Jan 2024 - Feb 2024', 'Development of a mobile application in Java and a web application with .NET for administrative management (make-up requests, schedule management, assignment creation, etc.).', array['ASP.NET', 'Android', 'REST APIs', 'Java', 'XML', 'Engineering']::text[], 3),
  ('Mobile Developer', 'Enova Robotics', 'https://res.cloudinary.com/deiimmbyt/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735046288/images_2_hcthkn.png', 'Sousse, Tunisia', 'Jun 2023 - Jul 2023', 'Development of a mobile application using React and Ionic to control a solar panel cleaning robot.', array['React', 'Ionic']::text[], 4),
  ('Computer Repair Technician', 'MIPS Tunisie', 'https://res.cloudinary.com/deiimmbyt/image/upload/v1735046643/Screenshot_2024-12-24_142328-removebg-preview_bay3h3.png', 'Sousse, Tunisia', 'Jan 2022 - Feb 2022', 'Diagnosing and resolving technical issues for clients. Performing preventive maintenance on computer hardware.', array['Computer Repair', 'Computer Hardware Troubleshooting', 'Technical Services', 'Computer Systems Maintenance']::text[], 5);

insert into public.skills (name, icon_key, category, sort_order) values
  ('PHP', 'FaPhp', 'skill', 0),
  ('Symfony', 'FaSymfony', 'skill', 1),
  ('API Platform', 'TbApi', 'skill', 2),
  ('Doctrine ORM', 'SiDoctrine', 'skill', 3),
  ('PostgreSQL', 'SiPostgresql', 'skill', 4),
  ('MySQL', 'SiMysql', 'skill', 5),
  ('SQL Server', 'DiMsqlServer', 'skill', 6),
  ('SQL', 'TbSql', 'skill', 7),
  ('DDD / Hexagonal Architecture', 'TbHexagons', 'skill', 8),
  ('.NET', 'SiDotnet', 'skill', 9),
  ('C#', 'TbBrandCSharp', 'skill', 10),
  ('Python', 'FaPython', 'skill', 11),
  ('JavaScript', 'DiJavascript1', 'skill', 12),
  ('Java', 'FaJava', 'skill', 13),
  ('UML', 'SiUml', 'skill', 14),
  ('Dart', 'SiDart', 'skill', 15),
  ('Flutter', 'FaFlutter', 'skill', 16),
  ('Godot', 'SiGodotengine', 'skill', 17),
  ('Docker', 'FaDocker', 'tool', 0),
  ('Git', 'DiGit', 'tool', 1),
  ('Jenkins', 'SiJenkins', 'tool', 2),
  ('Composer', 'SiComposer', 'tool', 3),
  ('PHPUnit', null, 'tool', 4),
  ('Linux', 'FaLinux', 'tool', 5),
  ('Jira', 'SiJira', 'tool', 6),
  ('Confluence', 'SiConfluence', 'tool', 7),
  ('Postman', 'SiPostman', 'tool', 8),
  ('VS Code', 'VscVscodeInsiders', 'tool', 9),
  ('Windows', 'FaWindows', 'tool', 10),
  ('Android Studio', 'SiAndroidstudio', 'tool', 11),
  ('Terminal', 'BsTerminalFill', 'tool', 12);
commit;
