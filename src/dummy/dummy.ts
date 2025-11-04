import { faker } from '@faker-js/faker'
import type { Project, Log } from '../entities/project/types'

export const createDummyProject = (id?: number): Project => {
  const projectId = id ?? faker.number.int({ min: 1, max: 1000 })
  
  return {
    id: projectId,
    name: faker.company.name(),
    logs: [],
  }
}

export const createDummyLog = (projectId: number): Log => {
  return {
    id: faker.string.uuid(),
    projectId,
    authorId: faker.string.uuid(),
    timestamp: faker.date.recent({ days: 30 }).toISOString(),
    content: faker.lorem.paragraphs({ min: 1, max: 3 }),
  }
}

export const createDummyProjectWithLogs = (logCount: number = 5, id?: number): Project => {
  const project = createDummyProject(id)
  const logs: Log[] = []
  
  for (let i = 0; i < logCount; i++) {
    logs.push(createDummyLog(project.id))
  }
  
  project.logs = logs
  return project
}

export const createDummyProjects = (count: number = 10): Project[] => {
  const projects: Project[] = []
  
  for (let i = 0; i < count; i++) {
    projects.push(createDummyProjectWithLogs(faker.number.int({ min: 0, max: 10 })))
  }
  
  return projects
}

