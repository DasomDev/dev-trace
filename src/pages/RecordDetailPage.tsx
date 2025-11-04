import { Layout } from '@/app/layout/Layout'
import { useParams, Link } from 'react-router-dom'
import { useRecord } from '@/features/record/useRecord'
import { Card } from '@/shared/ui'
import { Button } from '@/shared/ui'

export const RecordDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { record, deleteRecord } = useRecord()
  
  const currentRecord = id ? record.getById(id) : null

  if (!currentRecord) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">기록을 찾을 수 없습니다.</p>
          <Link to="/">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{currentRecord.featureName}</h2>
          <div className="flex gap-2">
            <Link to={`/edit/${id}`}>
              <Button variant="secondary">수정</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('정말 삭제하시겠습니까?')) {
                  deleteRecord(id!)
                  window.location.href = '/'
                }
              }}
            >
              삭제
            </Button>
          </div>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">관련 파일</h3>
              <div className="text-gray-900">
                {currentRecord.relatedFiles.map((file, idx) => (
                  <code key={idx} className="block text-sm bg-gray-100 px-2 py-1 rounded">
                    {file}
                  </code>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">의도 (Why)</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentRecord.intent}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">에러/예외 케이스</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentRecord.errorCases}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">의존 관계</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentRecord.dependencies}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">테스트 기준</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentRecord.testCriteria}</p>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>작성자: {currentRecord.author}</span>
              <span>작성일: {new Date(currentRecord.createdAt).toLocaleDateString()}</span>
              <span>버전: v{currentRecord.version}</span>
            </div>

            {currentRecord.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {currentRecord.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {currentRecord.history && currentRecord.history.length > 0 && (
          <Card title="변경 이력">
            <div className="space-y-4">
              {currentRecord.history.map((hist, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">버전 {hist.version}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(hist.changedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">변경자: {hist.changedBy}</p>
                  <p className="text-sm text-gray-700">{hist.changes}</p>
                  {hist.reason && (
                    <p className="text-sm text-gray-600 mt-1">이유: {hist.reason}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  )
}

