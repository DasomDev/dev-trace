import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home/index'
import { TaskAddPage } from '@/pages/TaskAddPage'
// import { TaskListPage } from '@/pages/TaskListPage'
// import { TaskDetailPage } from '@/pages/TaskDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/add',
    element: <TaskAddPage />,
  },
  // {
  //   path: '/task/:id',
  //   element: <TaskDetailPage />,
  // },
])
