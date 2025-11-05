import { useState, useEffect } from "react";
import { Layout } from "@/app/layout/Layout";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Project } from "@/entities/project/types";

export const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Firestore에서 projects 컬렉션 데이터 가져오기
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData: Project[] = [];

        querySnapshot.forEach((doc) => {
          projectsData.push({
            id: doc.id,
            ...doc.data(),
          } as Project);
        });

        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error("Firebase 데이터 가져오기 실패:", err);
        setError("데이터를 가져오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">프로젝트 목록</h1>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div>
            {projects.length === 0 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                Firestore의 'projects' 컬렉션에 데이터가 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className=" p-6 rounded-lg shadow border hover:shadow-lg transition-shadow"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {project.name}
                    </h2>

                    <div className="mt-4">
                      <p className="text-xs text-gray-400">ID: {project.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
