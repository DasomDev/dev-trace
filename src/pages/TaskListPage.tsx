import { Layout } from '@/app/layout/Layout'
// import { TaskList } from '@/features/task/TaskList'
// import { TaskTree } from '@/features/task/TaskTree'
// import { SearchBar } from '@/features/search/SearchBar'
// import { FilterPanel } from '@/features/search/FilterPanel'
// import { useState } from 'react'
// import type { DevTask } from '@/entities/task/types'

export const TaskListPage = () => {
  // const [selectedTask, setSelectedTask] = useState<DevTask | null>(null)
  // const [searchQuery, setSearchQuery] = useState('')
  // const [filters, setFilters] = useState({
  //   author: '',
  //   tags: [] as string[],
  //   dateFrom: '',
  //   dateTo: '',
  // })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">개발 작업</h2>
        </div>
        
        <div className="flex gap-4">
          {/* <SearchBar value={searchQuery} onChange={setSearchQuery} /> */}
          {/* <FilterPanel filters={filters} onFiltersChange={setFilters} /> */}
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {/* <TaskTree
              onTaskSelect={setSelectedTask}
              searchQuery={searchQuery}
              filters={filters}
            /> */}
          </div>
          <div className="lg:col-span-2">
            {/* <TaskList
              selectedTask={selectedTask}
              searchQuery={searchQuery}
              filters={filters}
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

