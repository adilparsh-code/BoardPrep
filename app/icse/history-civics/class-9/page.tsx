import Link from "next/link";
import {
  civicsModules,
  historyModules,
  mockTests,
  questionBankMeta,
  icseHistoryCivicsClass9Meta,
} from "@/icse/class-9/history-civics";

export default function Class9HistoryCivicsPage() {
  const meta = icseHistoryCivicsClass9Meta;
  const paper = meta.paperStructure.paper;
  return (
    <>
      <header className="topbar"><div className="container topbar-inner">
        <Link className="brand" href="/">BoardPrep</Link>
        <nav className="nav"><Link href="/icse/history-civics">ICSE History & Civics</Link></nav>
      </div></header>
      <main className="container">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/icse/history-civics">ICSE History & Civics</Link> / Class 9</div>
        <section className="section">
          <div className="eyebrow">ICSE - {meta.academicYearBasis} baseline</div>
          <h1>Class 9 History & Civics</h1>
          <p className="lead">Civics (Section A) and History (Section B), with chapter notes, practice and exam-style questions, and mock test sets.</p>
        </section>
        <section className="section">
          <div className="grid">
            <div className="card">
              <span className="pill">Section A</span><h2>Civics</h2>
              <p>{civicsModules.length} chapters covering {civicsModules.map((c) => c.title).join(", ")}.</p>
              <ul className="list">
                {civicsModules.map((c) => (
                  <li key={c.id}><strong>{c.title}</strong> - {c.sections.length} sections, {c.practiceQuestions.length + c.examQuestions.length} practice & exam questions</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="pill">Section B</span><h2>History</h2>
              <p>{historyModules.length} chapters from the Harappan Civilisation to the Modern Age in Europe.</p>
              <ul className="list">
                {historyModules.map((c) => (
                  <li key={c.id}><strong>{c.title}</strong> - {c.sections.length} sections, {c.practiceQuestions.length + c.examQuestions.length} practice & exam questions</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="grid">
            <div className="card">
              <span className="pill">Paper</span><h2>{paper.name}</h2>
              <p>{paper.duration} - {paper.totalMarks} marks + {paper.internalAssessment} marks internal assessment.</p>
              <ul className="list">
                {paper.parts.map((p) => (
                  <li key={p.part}><strong>{p.part} ({p.marks} marks):</strong> {p.detail}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="pill">Practice</span><h2>Question bank & tests</h2>
              <p>{questionBankMeta.totalQuestions} questions (including {questionBankMeta.mcqCount} MCQs) and {mockTests.length} mock test set(s) are ready.</p>
              <ul className="list">
                <li>Chapter-wise practice and exam-style questions inside each chapter.</li>
                <li>MCQ bank for quick factual recall.</li>
                <li>Civics, History and mixed mock tests in the ICSE pattern.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}