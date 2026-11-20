import { useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { classConfig, getRoleplayPair, roleplayPairs } from '../data';
import {
  CUSTOMER_VARIANTS,
  VARIANT_LABELS,
  type CustomerVariant,
  decodeSessionCode,
  encodeSessionCode,
} from '../lib/sessionCode';
import { ProblemCustomerPanel } from './class/ProblemCustomerPanel';
import { RoleplayStudentView } from './class/RoleplayStudentView';
import { RoleplayTeacherView } from './class/RoleplayTeacherView';

const PIN_KEY = 'odal-class-teacher-unlocked-v1';

function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(PIN_KEY) === '1';
  } catch {
    return false;
  }
}

function ClassHub() {
  return (
    <section className="section class-hub">
      <h1 className="class-title">Class Mode</h1>
      <p className="muted">
        Teacher-led pair speaking and whole-class problem practice. Students join with a session code — they cannot
        start activities alone.
      </p>
      <div className="class-choice-grid">
        <Link className="class-choice" to="join">
          <h2>Join</h2>
          <p>Students: enter the code from the teacher screen, then pick your role.</p>
        </Link>
        <Link className="class-choice" to="teacher">
          <h2>Teacher</h2>
          <p>Unlock with PIN to start role-play or problem-customer rounds.</p>
        </Link>
      </div>
      <p className="muted class-pin-note">
        Teacher PIN is a light classroom gate only — not real security. Default PIN is in{' '}
        <code>src/data/class-config.json</code>.
      </p>
    </section>
  );
}

function JoinPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const decoded = decodeSessionCode(code);
    if (!decoded) {
      setError('That code is not valid. Check the 4 characters on the teacher screen.');
      return;
    }
    const pair = getRoleplayPair(decoded.scenarioIndex);
    if (!pair) {
      setError('This code points to a role-play that is not in the current data file.');
      return;
    }
    setError('');
    navigate(`session/${encodeURIComponent(code.trim().toUpperCase())}`);
  }

  return (
    <section className="section">
      <Link className="back-link" to="/class">
        ← Class Mode
      </Link>
      <h1 className="class-title">Join class</h1>
      <p className="muted">Enter the session code shown on the teacher screen. You cannot start a role-play alone.</p>
      <form className="panel stack-gap" onSubmit={submit}>
        <label className="field-label" htmlFor="join-code">
          Session code
        </label>
        <input
          id="join-code"
          className="search code-input"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. 7K3M"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          maxLength={6}
          inputMode="text"
          required
        />
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </section>
  );
}

function StudentSessionPage() {
  const { code = '' } = useParams();
  const decoded = useMemo(() => decodeSessionCode(code), [code]);
  const pair = decoded ? getRoleplayPair(decoded.scenarioIndex) : undefined;
  const [role, setRole] = useState<'staff' | 'customer' | null>(null);

  if (!decoded || !pair) {
    return (
      <section className="section">
        <p className="form-error">Invalid or unknown session code.</p>
        <Link className="btn btn-secondary" to="/class/join">
          Try again
        </Link>
      </section>
    );
  }

  if (!role) {
    return (
      <section className="section">
        <Link className="back-link" to="/class/join">
          ← Join
        </Link>
        <h1 className="class-title">{pair.title}</h1>
        <p className="muted">
          Customer type for this session: <strong>{VARIANT_LABELS[decoded.variant]}</strong>
        </p>
        <div className="class-choice-grid">
          <button type="button" className="class-choice" onClick={() => setRole('staff')}>
            <h2>Role A — Counter staff</h2>
            <p>You see only the staff secret, goal, and useful phrases.</p>
          </button>
          <button type="button" className="class-choice" onClick={() => setRole('customer')}>
            <h2>Role B — Customer</h2>
            <p>{VARIANT_LABELS[decoded.variant]}</p>
          </button>
        </div>
      </section>
    );
  }

  return (
    <RoleplayStudentView
      pair={pair}
      variant={decoded.variant}
      role={role}
      onChangeRole={() => setRole(null)}
    />
  );
}

function TeacherGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!unlocked) {
    return (
      <section className="section">
        <Link className="back-link" to="/class">
          ← Class Mode
        </Link>
        <h1 className="class-title">Teacher unlock</h1>
        <p className="muted">
          Enter the classroom PIN. This is a light gate for lessons only — not real security. Default:{' '}
          <code>1234</code> (change in <code>class-config.json</code>).
        </p>
        <form
          className="panel stack-gap"
          onSubmit={(e) => {
            e.preventDefault();
            if (pin === classConfig.teacherPin) {
              try {
                sessionStorage.setItem(PIN_KEY, '1');
              } catch {
                /* ignore */
              }
              setUnlocked(true);
              setError('');
            } else {
              setError('Incorrect PIN.');
            }
          }}
        >
          <label className="field-label" htmlFor="teacher-pin">
            PIN
          </label>
          <input
            id="teacher-pin"
            className="search"
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoComplete="off"
            required
          />
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="btn btn-primary">
            Unlock teacher screen
          </button>
        </form>
      </section>
    );
  }

  return (
    <>
      {children}
      {/* lock affordance only on teacher home is enough; keep gate stateful */}
      <span className="sr-only" data-teacher-unlocked="1" />
      <TeacherLockButton
        onLock={() => {
          try {
            sessionStorage.removeItem(PIN_KEY);
          } catch {
            /* ignore */
          }
          setUnlocked(false);
          navigate('/class');
        }}
      />
    </>
  );
}

function TeacherLockButton({ onLock }: { onLock: () => void }) {
  // Rendered after children; hide duplicate on nested pages by CSS if needed
  return (
    <div className="teacher-lock-bar">
      <button type="button" className="btn btn-secondary btn-compact" onClick={onLock}>
        Lock teacher screen
      </button>
    </div>
  );
}

function TeacherHome() {
  return (
    <section className="section">
      <Link className="back-link" to="/class">
        ← Class Mode
      </Link>
      <h1 className="class-title">Teacher</h1>
      <p className="muted">Start a role-play for pairs, or project Problem Customer for the whole class.</p>
      <div className="class-choice-grid">
        <Link className="class-choice" to="roleplay">
          <h2>Role-play cards</h2>
          <p>Pick a scenario, show a session code, keep the answer key on your screen.</p>
        </Link>
        <Link className="class-choice" to="problems">
          <h2>Problem customer</h2>
          <p>Big-screen draws for tough counter situations with a timer and model answer.</p>
        </Link>
      </div>
    </section>
  );
}

function TeacherRoleplaySetup() {
  const navigate = useNavigate();
  const [pairId, setPairId] = useState(roleplayPairs[0]?.id ?? '');
  const [variant, setVariant] = useState<CustomerVariant>('japanese');

  function start(random: boolean) {
    let index: number;
    let v: CustomerVariant = variant;
    if (random) {
      index = Math.floor(Math.random() * roleplayPairs.length);
      v = CUSTOMER_VARIANTS[Math.floor(Math.random() * CUSTOMER_VARIANTS.length)];
    } else {
      index = roleplayPairs.findIndex((p) => p.id === pairId);
      if (index < 0) return;
    }
    const sessionCode = encodeSessionCode(index, v);
    navigate(`live/${sessionCode}`);
  }

  return (
    <section className="section">
      <Link className="back-link" to="/class/teacher">
        ← Teacher
      </Link>
      <h1 className="class-title">Start role-play</h1>
      <p className="muted">
        Students open Class Mode → Join and enter the code. Each phone shows only one role’s secret card.
      </p>
      <div className="panel stack-gap">
        <label className="field-label" htmlFor="rp-select">
          Scenario
        </label>
        <select id="rp-select" className="search" value={pairId} onChange={(e) => setPairId(e.target.value)}>
          {roleplayPairs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <label className="field-label" htmlFor="variant-select">
          Customer type (Role B)
        </label>
        <select
          id="variant-select"
          className="search"
          value={variant}
          onChange={(e) => setVariant(e.target.value as CustomerVariant)}
        >
          {CUSTOMER_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {VARIANT_LABELS[v]}
            </option>
          ))}
        </select>
        <div className="hero-actions" style={{ marginTop: 0 }}>
          <button type="button" className="btn btn-primary" onClick={() => start(false)}>
            Start
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => start(true)}>
            Random
          </button>
        </div>
      </div>
    </section>
  );
}

function TeacherRoleplayLive() {
  const { code = '' } = useParams();
  const decoded = useMemo(() => decodeSessionCode(code), [code]);
  const pair = decoded ? getRoleplayPair(decoded.scenarioIndex) : undefined;
  if (!decoded || !pair) {
    return <Navigate to="/class/teacher/roleplay" replace />;
  }
  return <RoleplayTeacherView pair={pair} variant={decoded.variant} code={code.toUpperCase()} />;
}

export function ClassModePage() {
  return (
    <Routes>
      <Route index element={<ClassHub />} />
      <Route path="join" element={<JoinPage />} />
      <Route path="join/session/:code" element={<StudentSessionPage />} />
      <Route
        path="teacher"
        element={
          <TeacherGate>
            <TeacherHome />
          </TeacherGate>
        }
      />
      <Route
        path="teacher/roleplay"
        element={
          <TeacherGate>
            <TeacherRoleplaySetup />
          </TeacherGate>
        }
      />
      <Route
        path="teacher/roleplay/live/:code"
        element={
          <TeacherGate>
            <TeacherRoleplayLive />
          </TeacherGate>
        }
      />
      <Route
        path="teacher/problems"
        element={
          <TeacherGate>
            <ProblemCustomerPanel />
          </TeacherGate>
        }
      />
      <Route path="*" element={<Navigate to="/class" replace />} />
    </Routes>
  );
}
