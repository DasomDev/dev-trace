import { Layout } from '@/app/layout/Layout'
import { RecordForm } from '@/features/record/RecordForm'

export const RecordAddPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">새 기록 작성</h2>
        <RecordForm />
      </div>
    </Layout>
  )
}

