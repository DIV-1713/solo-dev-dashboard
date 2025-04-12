
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isBefore, isAfter } from "date-fns"
import { Project, ProjectStatus } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined, formatStr: string = "MMM d, yyyy"): string {
  if (!date) return "No date"
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export function isOverdue(dueDate: string | null | undefined): boolean {
  if (!dueDate) return false
  return isBefore(parseISO(dueDate), new Date())
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export function filterProjectsByStatus(projects: Project[], status: ProjectStatus | "all"): Project[] {
  if (status === "all") return projects
  return projects.filter(project => project.status === status)
}

export function getTaskCompletionPercentage(project: Project): number {
  const totalTasks = project.tasks.length
  if (totalTasks === 0) return 0
  
  const completedTasks = project.tasks.filter(task => task.completed).length
  return Math.round((completedTasks / totalTasks) * 100)
}
