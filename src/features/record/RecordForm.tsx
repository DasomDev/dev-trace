import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecord } from "./useRecord";
import { Button, TextInput, Textarea } from "@/shared/ui";
import type { DevRecordFormData } from "@/entities/record/types";

export const RecordForm = () => {
  const navigate = useNavigate();
  const { save } = useRecord();

  const [formData, setFormData] = useState<DevRecordFormData>({
    featureName: "",
    relatedFiles: [],
    intent: "",
    errorCases: "",
    dependencies: "",
    testCriteria: "",
    author: "",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof DevRecordFormData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors: Partial<Record<keyof DevRecordFormData, string>> = {};
    if (!formData.featureName.trim())
      newErrors.featureName = "기능명을 입력해주세요";
    if (!formData.intent.trim()) newErrors.intent = "의도를 입력해주세요";
    if (!formData.author.trim()) newErrors.author = "작성자를 입력해주세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const record = save(formData);
      navigate(`/record/${record.id}`);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#1B1912] px-6 py-6 rounded-lg"
    >
      <TextInput
        label="기능명 *"
        value={formData.featureName}
        onChange={(e) => {
          setFormData({ ...formData, featureName: e.target.value });
          setErrors({ ...errors, featureName: "" });
        }}
        className="text-orange-300"
        error={errors.featureName}
        placeholder="예: 결제 취소 로직"
      />

      <Textarea
        label="의도 (Why) *"
        value={formData.intent}
        onChange={(e) => {
          setFormData({ ...formData, intent: e.target.value });
          setErrors({ ...errors, intent: "" });
        }}
        error={errors.intent}
        placeholder="이 기능을 구현한 이유와 목적을 설명해주세요"
        rows={4}
      />

      <Textarea
        label="에러/예외 케이스"
        value={formData.errorCases}
        onChange={(e) =>
          setFormData({ ...formData, errorCases: e.target.value })
        }
        placeholder="예: 결제 실패 시 재시도 3회 제한, 네트워크 에러 시 alert 표시 후 abort"
        rows={3}
      />

      <Textarea
        label="의존 관계"
        value={formData.dependencies}
        onChange={(e) =>
          setFormData({ ...formData, dependencies: e.target.value })
        }
        placeholder="예: axios 인스턴스, AuthContext 의존"
        rows={2}
      />

      <Textarea
        label="테스트 기준"
        value={formData.testCriteria}
        onChange={(e) =>
          setFormData({ ...formData, testCriteria: e.target.value })
        }
        placeholder="예: mock API 기준으로 success/fail 상태 확인"
        rows={2}
      />

      <TextInput
        label="작성자 *"
        value={formData.author}
        onChange={(e) => {
          setFormData({ ...formData, author: e.target.value });
          setErrors({ ...errors, author: "" });
        }}
        error={errors.author}
        placeholder="작성자 이름"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          태그
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="예: payment, error"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="button" onClick={addTag} variant="secondary">
            추가
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-500 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="ghost" onClick={() => navigate("/")}>
          취소
        </Button>
        <Button type="submit" variant="primary">
          저장
        </Button>
      </div>
    </form>
  );
};
