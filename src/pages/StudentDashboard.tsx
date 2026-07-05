import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useSubjects, useChapters, useLessons } from '../hooks/useEntities';
import { SiteHeader } from '../components/layout/SiteHeader';
import { StudentSidebar } from '../components/layout/StudentSidebar';
import { formatDuration } from '../lib/format';

export function StudentDashboard() {
  const { user } = useAuthContext();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();

  const primarySubject = subjects?.[0];
  const { data: chapters } = useChapters(
    primarySubject ? { subjectId: primarySubject.id } : undefined,
  );
  const firstChapter = chapters?.[0];
  const { data: lessons } = useLessons(firstChapter ? { chapterId: firstChapter.id } : undefined);
  const firstLesson = lessons?.[0];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          <StudentSidebar />

          <div className="min-w-0 flex-1 space-y-8">
            {/* Greeting hero */}
            <div className="rounded-xl bg-blue-600 p-8 text-white shadow-sm">
              <h1 className="text-2xl font-bold">
                Hello, {user.profile.firstName}! Ready to master{' '}
                {primarySubject ? primarySubject.name : 'Commerce'} today?
              </h1>
              <p className="mt-2 text-sm text-blue-100">
                You've completed 65% of your weekly goals. Keep the momentum going!
              </p>
              <div className="mt-4 h-2 w-full max-w-md overflow-hidden rounded-full bg-blue-500/50">
                <div className="h-full w-[65%] rounded-full bg-white" />
              </div>
            </div>

            {/* Continue Learning */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span>⏱</span> Continue Learning
              </h2>

              {subjectsLoading && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                  Loading your courses…
                </div>
              )}

              {!subjectsLoading && primarySubject && firstChapter && firstLesson && (
                <Link
                  to={`/lessons/${firstLesson.id}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
                >
                  <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 sm:h-auto sm:w-56">
                    <span className="text-4xl">🎬</span>
                  </div>
                  <div className="flex-1 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {primarySubject.name} · {firstChapter.title}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-slate-900">{firstLesson.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDuration(firstLesson.duration)} left
                    </p>
                    <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-1/3 rounded-full bg-blue-600" />
                    </div>
                    <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                      Resume Learning →
                    </span>
                  </div>
                </Link>
              )}

              {!subjectsLoading && !primarySubject && (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
                  <p className="text-sm text-slate-500">
                    No subjects available yet. Check back once your courses are published.
                  </p>
                </div>
              )}
            </section>

            {/* Subjects grid */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Your Subjects</h2>
                <Link to="/subjects" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(subjects ?? []).slice(0, 6).map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
                      🏛️
                    </div>
                    <h3 className="mt-3 font-bold text-slate-900">{subject.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">{subject.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
