import { Layout } from '@/app/layout/Layout'
// import { RecordList } from '@/features/record/RecordList'
// import { RecordTree } from '@/features/record/RecordTree'
// import { SearchBar } from '@/features/search/SearchBar'
// import { FilterPanel } from '@/features/search/FilterPanel'
// import { useState } from 'react'
// import type { DevRecord } from '@/entities/record/types'

export const RecordListPage = () => {
  // const [selectedRecord, setSelectedRecord] = useState<DevRecord | null>(null)
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">개발 기록</h2>
        </div>
        
        <div className="flex gap-4">
          {/* <SearchBar value={searchQuery} onChange={setSearchQuery} /> */}
          {/* <FilterPanel filters={filters} onFiltersChange={setFilters} /> */}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {/* <RecordTree
              onRecordSelect={setSelectedRecord}
              searchQuery={searchQuery}
              filters={filters}
            /> */}
          </div>
          <div className="lg:col-span-2">
            {/* <RecordList
              selectedRecord={selectedRecord}
              searchQuery={searchQuery}
              filters={filters}
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

