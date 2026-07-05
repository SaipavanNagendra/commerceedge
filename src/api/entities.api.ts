import { api } from '../lib/axios';
import type {
  Subject,
  Chapter,
  Lesson,
  Note,
  Question,
  Test,
  School,
  Olympiad,
  CreateSubjectPayload,
  UpdateSubjectPayload,
  CreateChapterPayload,
  UpdateChapterPayload,
  CreateLessonPayload,
  UpdateLessonPayload,
  CreateNotePayload,
  UpdateNotePayload,
  CreateQuestionPayload,
  UpdateQuestionPayload,
  CreateTestPayload,
  UpdateTestPayload,
  CreateSchoolPayload,
  UpdateSchoolPayload,
  CreateOlympiadPayload,
  UpdateOlympiadPayload,
} from '../types/entities.types';

// ========== SUBJECTS ==========
export const subjectsApi = {
  list: () => api.get<Subject[]>('/subjects').then((res) => res.data),

  get: (id: string) => api.get<Subject>(`/subjects/${id}`).then((res) => res.data),

  create: (payload: CreateSubjectPayload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    if (payload.description) formData.append('description', payload.description);
    if (payload.icon) formData.append('icon', payload.icon);
    return api.post<Subject>('/subjects', formData).then((res) => res.data);
  },

  update: (id: string, payload: UpdateSubjectPayload) => {
    const formData = new FormData();
    if (payload.name) formData.append('name', payload.name);
    if (payload.description) formData.append('description', payload.description);
    if (payload.icon) formData.append('icon', payload.icon);
    if (payload.isActive !== undefined) formData.append('isActive', String(payload.isActive));
    return api.patch<Subject>(`/subjects/${id}`, formData).then((res) => res.data);
  },

  delete: (id: string) => api.delete(`/subjects/${id}`).then((res) => res.data),
};

// ========== CHAPTERS ==========
export const chaptersApi = {
  list: (filters?: { subjectId?: string; classLevel?: string }) =>
    api.get<Chapter[]>('/chapters', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Chapter>(`/chapters/${id}`).then((res) => res.data),

  create: (payload: CreateChapterPayload) =>
    api.post<Chapter>('/chapters', payload).then((res) => res.data),

  update: (id: string, payload: UpdateChapterPayload) =>
    api.patch<Chapter>(`/chapters/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/chapters/${id}`).then((res) => res.data),
};

// ========== LESSONS ==========
export const lessonsApi = {
  list: (filters?: { chapterId?: string }) =>
    api.get<Lesson[]>('/lessons', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Lesson>(`/lessons/${id}`).then((res) => res.data),

  create: (payload: CreateLessonPayload) => {
    const formData = new FormData();
    formData.append('chapterId', payload.chapterId);
    formData.append('title', payload.title);
    formData.append('order', String(payload.order));
    formData.append('duration', String(payload.duration));
    formData.append('video', payload.video);
    return api.post<{ message: string; lessonId: string }>('/lessons', formData).then((res) => res.data);
  },

  update: (id: string, payload: UpdateLessonPayload) =>
    api.patch<Lesson>(`/lessons/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/lessons/${id}`).then((res) => res.data),
};

// ========== NOTES ==========
export const notesApi = {
  list: (filters?: { chapterId?: string }) =>
    api.get<Note[]>('/notes', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Note>(`/notes/${id}`).then((res) => res.data),

  create: (payload: CreateNotePayload) =>
    api.post<Note>('/notes', payload).then((res) => res.data),

  update: (id: string, payload: UpdateNotePayload) =>
    api.patch<Note>(`/notes/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/notes/${id}`).then((res) => res.data),
};

// ========== QUESTIONS ==========
export const questionsApi = {
  list: (filters?: { subjectId?: string; chapterSlug?: string }) =>
    api.get<Question[]>('/questions', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Question>(`/questions/${id}`).then((res) => res.data),

  create: (payload: CreateQuestionPayload) =>
    api.post<Question>('/questions', payload).then((res) => res.data),

  update: (id: string, payload: UpdateQuestionPayload) =>
    api.patch<Question>(`/questions/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/questions/${id}`).then((res) => res.data),
};

// ========== TESTS ==========
export const testsApi = {
  list: (filters?: { subjectId?: string }) =>
    api.get<Test[]>('/tests', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Test>(`/tests/${id}`).then((res) => res.data),

  create: (payload: CreateTestPayload) =>
    api.post<Test>('/tests', payload).then((res) => res.data),

  update: (id: string, payload: UpdateTestPayload) =>
    api.patch<Test>(`/tests/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/tests/${id}`).then((res) => res.data),
};

// ========== SCHOOLS ==========
export const schoolsApi = {
  list: (filters?: { state?: string; city?: string }) =>
    api.get<School[]>('/schools', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<School>(`/schools/${id}`).then((res) => res.data),

  create: (payload: CreateSchoolPayload) =>
    api.post<School>('/schools', payload).then((res) => res.data),

  update: (id: string, payload: UpdateSchoolPayload) =>
    api.patch<School>(`/schools/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/schools/${id}`).then((res) => res.data),
};

// ========== OLYMPIADS ==========
export const olympiadsApi = {
  list: (filters?: { classLevel?: string }) =>
    api.get<Olympiad[]>('/olympiads', { params: filters }).then((res) => res.data),

  get: (id: string) => api.get<Olympiad>(`/olympiads/${id}`).then((res) => res.data),

  create: (payload: CreateOlympiadPayload) =>
    api.post<Olympiad>('/olympiads', payload).then((res) => res.data),

  update: (id: string, payload: UpdateOlympiadPayload) =>
    api.patch<Olympiad>(`/olympiads/${id}`, payload).then((res) => res.data),

  delete: (id: string) => api.delete(`/olympiads/${id}`).then((res) => res.data),
};
