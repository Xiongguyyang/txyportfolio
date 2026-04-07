export const NAV_LINKS = [
  { label: "Home", targetId: "homesection" },
  { label: "Projects", targetId: "projectsection" },
  { label: "Education", targetId: "education" },
  { label: "Skills", targetId: "skills" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/share/1Fmimk9RSG/",
    label: "Facebook",
    icon: "facebook" as const,
  },
  {
    href: "https://github.com/tou8xiong",
    label: "GitHub",
    icon: "github" as const,
  },
];

export const SKILLS_DATA = [
  {
    title: "Languages",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "React Native", "Tailwind CSS"],
  },
  {
    title: "Technical Skills",
    items: ["Graphic Design", "App & Website Dev", "UX-UI Design"],
  },
  {
    title: "Tools",
    items: ["VS Code", "GitHub", "Firebase", "Expo"],
  },
  {
    title: "Databases",
    items: ["Firebase Database", "MySQL"],
  },
  {
    title: "Soft Skills",
    items: ["Time Management", "Communication", "Team Work"],
  },
];

export const EDUCATION_DATA = [
  {
    degree: "Diploma Degree — IT & Economics",
    school: "Comcenter College, Vientiane Capital",
    period: "Currently Studying · Expected 2027",
    current: true,
  },
  {
    degree: "High School Certificate",
    school: "Lad Huang High School, Xiengkhuang Province",
    period: "2013 – 2024",
    current: false,
  },
];

export const PROJECT_IMAGES = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image5.png",
  "/image6.png",
  "/image8.png",
  "/image9.png",
];

export const PROJECT_FEATURES = [
  "Add & Edit Tasks",
  "Task List & Done Board",
  "Delete Tasks",
  "Notes Section",
  "LocalStorage Sync",
  "Firebase Auth (Login / Logout)",
];

export const DESIGN_IMAGES = ["/dsimg1.png", "/designimg2.png"];
