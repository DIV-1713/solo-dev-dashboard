
import { Project, ProjectStatus, ProjectStatusInfo, Technology } from './types';

// Status definitions with colors
export const PROJECT_STATUSES: Record<ProjectStatus, ProjectStatusInfo> = {
  'planning': {
    value: 'planning',
    label: 'Planning',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  'in-progress': {
    value: 'in-progress',
    label: 'In Progress',
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  'on-hold': {
    value: 'on-hold',
    label: 'On Hold',
    color: 'bg-amber-600 hover:bg-amber-700'
  },
  'completed': {
    value: 'completed',
    label: 'Completed',
    color: 'bg-green-600 hover:bg-green-700'
  },
  'archived': {
    value: 'archived',
    label: 'Archived',
    color: 'bg-gray-600 hover:bg-gray-700'
  }
};

// Technology options
export const TECHNOLOGIES: Technology[] = [
  { id: "tech-react", name: "React", color: "#61DAFB" },
  { id: "tech-nextjs", name: "Next.js", color: "#000000" },
  { id: "tech-vue", name: "Vue.js", color: "#4FC08D" },
  { id: "tech-angular", name: "Angular", color: "#DD0031" },
  { id: "tech-svelte", name: "Svelte", color: "#FF3E00" },
  { id: "tech-typescript", name: "TypeScript", color: "#3178C6" },
  { id: "tech-javascript", name: "JavaScript", color: "#F7DF1E" },
  { id: "tech-tailwind", name: "Tailwind CSS", color: "#38B2AC" },
  { id: "tech-node", name: "Node.js", color: "#339933" },
  { id: "tech-express", name: "Express", color: "#000000" },
  { id: "tech-mongodb", name: "MongoDB", color: "#47A248" },
  { id: "tech-postgresql", name: "PostgreSQL", color: "#336791" },
  { id: "tech-graphql", name: "GraphQL", color: "#E10098" },
  { id: "tech-aws", name: "AWS", color: "#FF9900" },
  { id: "tech-firebase", name: "Firebase", color: "#FFCA28" },
  { id: "tech-docker", name: "Docker", color: "#2496ED" },
  { id: "tech-kubernetes", name: "Kubernetes", color: "#326CE5" },
  { id: "tech-supabase", name: "Supabase", color: "#3ECF8E" },
  { id: "tech-vercel", name: "Vercel", color: "#000000" },
  { id: "tech-netlify", name: "Netlify", color: "#00C7B7" },
];

// Mock projects data
export const MOCK_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "ProjectPilot",
    description: "A minimal project management app for solo developers and indie hackers.",
    status: "in-progress",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    githubUrl: "https://github.com/user/projectpilot",
    deploymentUrl: "https://projectpilot.vercel.app",
    technologies: [
      TECHNOLOGIES.find(t => t.name === "React")!,
      TECHNOLOGIES.find(t => t.name === "TypeScript")!,
      TECHNOLOGIES.find(t => t.name === "Tailwind CSS")!,
      TECHNOLOGIES.find(t => t.name === "Supabase")!,
    ],
    tasks: [
      {
        id: "task-1-1",
        title: "Design landing page",
        completed: true,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-1-2",
        title: "Implement auth flow",
        completed: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-1-3",
        title: "Set up Supabase schemas",
        completed: true,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-1-4",
        title: "Create project dashboard UI",
        completed: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-1-5",
        title: "Add calendar integration",
        completed: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "project-2",
    name: "DesignSystem UI",
    description: "A modern UI library for React applications with a focus on accessibility.",
    status: "planning",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    githubUrl: "https://github.com/user/designsystem",
    technologies: [
      TECHNOLOGIES.find(t => t.name === "React")!,
      TECHNOLOGIES.find(t => t.name === "TypeScript")!,
      TECHNOLOGIES.find(t => t.name === "Tailwind CSS")!,
    ],
    tasks: [
      {
        id: "task-2-1",
        title: "Research component libraries",
        completed: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-2-2",
        title: "Define design tokens",
        completed: false,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-2-3",
        title: "Create button component",
        completed: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "project-3",
    name: "CodeSnapshot",
    description: "Tool for creating beautiful code screenshots with customizable themes.",
    status: "completed",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    githubUrl: "https://github.com/user/codesnapshot",
    deploymentUrl: "https://codesnapshot.vercel.app",
    technologies: [
      TECHNOLOGIES.find(t => t.name === "Next.js")!,
      TECHNOLOGIES.find(t => t.name === "TypeScript")!,
      TECHNOLOGIES.find(t => t.name === "Tailwind CSS")!,
    ],
    tasks: [
      {
        id: "task-3-1",
        title: "Design UI mockups",
        completed: true,
        createdAt: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-3-2",
        title: "Implement code editor",
        completed: true,
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-3-3",
        title: "Add theme customization",
        completed: true,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-3-4",
        title: "Implement export functionality",
        completed: true,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "project-4",
    name: "MarkdownBlog",
    description: "A simple markdown-based blog platform with categories and tags.",
    status: "on-hold",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    githubUrl: "https://github.com/user/markdownblog",
    technologies: [
      TECHNOLOGIES.find(t => t.name === "Next.js")!,
      TECHNOLOGIES.find(t => t.name === "TypeScript")!,
      TECHNOLOGIES.find(t => t.name === "Tailwind CSS")!,
      TECHNOLOGIES.find(t => t.name === "Supabase")!,
    ],
    tasks: [
      {
        id: "task-4-1",
        title: "Set up Next.js project",
        completed: true,
        createdAt: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-4-2",
        title: "Create markdown parser",
        completed: true,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-4-3",
        title: "Implement blog post listing",
        completed: false,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: null
      }
    ]
  },
  {
    id: "project-5",
    name: "TaskFlow",
    description: "Minimalist task management app with kanban-style interface.",
    status: "archived",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    githubUrl: "https://github.com/user/taskflow",
    technologies: [
      TECHNOLOGIES.find(t => t.name === "Vue.js")!,
      TECHNOLOGIES.find(t => t.name === "TypeScript")!,
      TECHNOLOGIES.find(t => t.name === "Tailwind CSS")!,
    ],
    tasks: [
      {
        id: "task-5-1",
        title: "Set up Vue project",
        completed: true,
        createdAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "task-5-2",
        title: "Design UI components",
        completed: true,
        createdAt: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];
