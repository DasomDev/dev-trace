import { Layout } from '@/app/layout/Layout'
import { TaskForm } from '@/features/task/TaskForm'

export const TaskAddPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold text-white">새 작업 작성</h2>
        <TaskForm />
      </div>
    </Layout>
  )
}

