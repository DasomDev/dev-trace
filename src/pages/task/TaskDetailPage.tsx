import { Layout } from '@/app/layout/Layout'
import { useParams, Link } from 'react-router-dom'
import { useTask } from '@/features/task/useTask'
import { Card } from '@/shared/ui'
import { Button } from '@/shared/ui'

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { task, deleteTask } = useTask()
  
  const currentTask = id ? task.getById(id) : null

  if (!currentTask) {
    return (
      <Layout>
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">작업을 찾을 수 없습니다.</p>
          <Link to="/">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto space-y-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{currentTask.featureName}</h2>
          <div className="flex gap-2">
            <Link to={`/edit/${id}`}>
              <Button variant="secondary">수정</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('정말 삭제하시겠습니까?')) {
                  deleteTask(id!)
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
              <h3 className="mb-1 text-sm font-medium text-gray-500">관련 파일</h3>
              <div className="text-gray-900">
                {currentTask.relatedFiles.map((file, idx) => (
                  <code key={idx} className="block px-2 py-1 text-sm bg-gray-100 rounded">
                    {file}
                  </code>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">의도 (Why)</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentTask.intent}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">에러/예외 케이스</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentTask.errorCases}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">의존 관계</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentTask.dependencies}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">테스트 기준</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{currentTask.testCriteria}</p>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>작성자: {currentTask.author}</span>
              <span>작성일: {new Date(currentTask.createdAt).toLocaleDateString()}</span>
              <span>버전: v{currentTask.version}</span>
            </div>

            {currentTask.tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTask.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm text-blue-700 bg-blue-100 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {currentTask.history && currentTask.history.length > 0 && (
          <Card title="변경 이력">
            <div className="space-y-4">
              {currentTask.history.map((hist, idx) => (
                <div key={idx} className="pl-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">버전 {hist.version}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(hist.changedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mb-1 text-sm text-gray-600">변경자: {hist.changedBy}</p>
                  <p className="text-sm text-gray-700">{hist.changes}</p>
                  {hist.reason && (
                    <p className="mt-1 text-sm text-gray-600">이유: {hist.reason}</p>
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

