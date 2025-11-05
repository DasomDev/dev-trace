import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home/index'
import { RecordAddPage } from '@/pages/RecordAddPage'
// import { RecordListPage } from '@/pages/RecordListPage'
// import { RecordDetailPage } from '@/pages/RecordDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/add',
    element: <RecordAddPage />,
  },
  // {
  //   path: '/record/:id',
  //   element: <RecordDetailPage />,
  // },
])
