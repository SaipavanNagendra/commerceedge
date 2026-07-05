// Comprehensive types for all CommerceEdge entities
import type { ClassLevel } from './auth.types';

// ========== ENUMS ==========
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MCQ' | 'NUMERICAL' | 'CASE_STUDY';
export type TestType = 'CHAPTER' | 'UNIT' | 'HALF_YEARLY' | 'PRE_BOARD' | 'OLYMPIAD_MOCK';
export type NoteType = 'PDF' | 'MIND_MAP' | 'FORMULA_SHEET' | 'QUICK_REVISION';
export type VideoStatus = 'PROCESSING' | 'READY' | 'FAILED';

// ========== SUBJECTS ==========
export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectPayload {
  name: string;
  description?: string;
  icon?: File;
}

export interface UpdateSubjectPayload {
  name?: string;
  description?: string;
  icon?: File;
  isActive?: boolean;
}

// ========== CHAPTERS ==========
export interface Chapter {
  id: string;
  subjectId: string;
  classLevel: ClassLevel;
  title: string;
  slug: string;
  order: number;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterPayload {
  subjectId: string;
  classLevel: ClassLevel;
  title: string;
  order: number;
}

export interface UpdateChapterPayload {
  title?: string;
  classLevel?: ClassLevel;
  order?: number;
}

// ========== LESSONS ==========
export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  duration: number; // in seconds
  videoUrl: string;
  videoStatus: VideoStatus;
  chapter?: Chapter;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonPayload {
  chapterId: string;
  title: string;
  order: number;
  duration: number;
  video: File;
}

export interface UpdateLessonPayload {
  title?: string;
  order?: number;
  duration?: number;
}

// ========== NOTES ==========
export interface Note {
  id: string;
  chapterId: string;
  title: string;
  type: NoteType;
  filePath: string;
  fileSize: number;
  chapter?: Chapter;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotePayload {
  chapterId: string;
  title: string;
  type: NoteType;
  filePath: string;
  fileSize: number;
}

export interface UpdateNotePayload {
  title?: string;
  type?: NoteType;
  filePath?: string;
  fileSize?: number;
}

// ========== QUESTIONS ==========
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  subjectId: string;
  chapterSlug: string;
  type: QuestionType;
  difficulty: Difficulty;
  questionText: string;
  options: QuestionOption[];
  correctOption: string;
  tags: string[];
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionPayload {
  subjectId: string;
  chapterSlug: string;
  type: QuestionType;
  difficulty: Difficulty;
  questionText: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  correctOption: string;
  tags?: string[];
}

export interface UpdateQuestionPayload {
  questionText?: string;
  difficulty?: Difficulty;
  options?: Array<{ text: string; isCorrect: boolean }>;
  correctOption?: string;
  tags?: string[];
}

// ========== TESTS ==========
export interface Test {
  id: string;
  title: string;
  subjectId: string;
  classLevel: ClassLevel;
  type: TestType;
  totalQuestions: number;
  durationMinutes: number;
  negativeMarking: number;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestPayload {
  title: string;
  subjectId: string;
  classLevel: ClassLevel;
  type: TestType;
  totalQuestions: number;
  durationMinutes: number;
  negativeMarking: number;
}

export interface UpdateTestPayload {
  title?: string;
  totalQuestions?: number;
  durationMinutes?: number;
  negativeMarking?: number;
}

// ========== SCHOOLS ==========
export interface School {
  id: string;
  name: string;
  code: string;
  state: string;
  city: string;
  adminId?: string;
  logoPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolPayload {
  name: string;
  code: string;
  state: string;
  city: string;
  adminId?: string;
  logoPath?: string;
}

export interface UpdateSchoolPayload {
  name?: string;
  code?: string;
  state?: string;
  city?: string;
  adminId?: string;
  logoPath?: string;
}

// ========== OLYMPIADS ==========
export interface Olympiad {
  id: string;
  title: string;
  subjectId: string;
  classLevel: ClassLevel;
  registrationFee: number;
  examDate: string;
  testId: string;
  subject?: Subject;
  test?: Test;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOlympiadPayload {
  title: string;
  subjectId: string;
  classLevel: ClassLevel;
  registrationFee: number;
  examDate: string;
  testId: string;
}

export interface UpdateOlympiadPayload {
  title?: string;
  registrationFee?: number;
  examDate?: string;
  testId?: string;
}

// ========== LIST RESPONSES ==========
export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
