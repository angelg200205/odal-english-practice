import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { ScenarioPage } from './pages/ScenarioPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="scenario/:id" element={<ScenarioPage />} />
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
