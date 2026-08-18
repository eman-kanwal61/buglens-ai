import { useState } from "react";
import "./App.css";

function App() {
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [environment, setEnvironment] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!bugTitle.trim() || !bugDescription.trim()) {
      setError("Please provide a bug title and description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bugTitle,
          description: bugDescription,
          environment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze the bug.");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Something went wrong while connecting to BugLens AI."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalyzer = () => {
    setBugTitle("");
    setBugDescription("");
    setEnvironment("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app">

      {/* Ambient background */}
      <div className="noise"></div>
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <a href="/" className="brand">
          <div className="brand-mark">
            <span></span>
          </div>

          <div>
            <strong>BUGLENS</strong>
            <small>AI DIAGNOSTICS</small>
          </div>
        </a>

        <nav>
          <a href="#analyzer">Analyzer</a>
          <a href="#workflow">Workflow</a>
          <a href="#about">About</a>
        </nav>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>

      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="hero-kicker">
              <span>01</span>
              INTELLIGENT SOFTWARE DIAGNOSTICS
            </div>

            <h1>
              Find the
              <span>reason</span>
              behind the bug.
            </h1>

            <p className="hero-description">
              Turn messy bug reports into clear technical intelligence.
              BugLens analyzes context, identifies probable causes,
              evaluates severity, and gives developers their next move.
            </p>

            <div className="hero-buttons">
              <a href="#analyzer" className="hero-button">
                Start diagnosis
                <span>↗</span>
              </a>

              <div className="hero-note">
                <span></span>
                Built for developers & software teams
              </div>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>AI</strong>
                <small>Powered analysis</small>
              </div>

              <div>
                <strong>JSON</strong>
                <small>Structured intelligence</small>
              </div>

              <div>
                <strong>24/7</strong>
                <small>Always ready</small>
              </div>
            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="visual-frame">

              <div className="frame-top">
                <span>BUGLENS / CORE</span>
                <span>LIVE</span>
              </div>

              <div className="diagnostic-visual">

                <div className="scan-line"></div>

                <div className="crosshair">
                  <span></span>
                </div>

                <div className="target target-one"></div>
                <div className="target target-two"></div>

                <div className="visual-center">
                  <div className="lens">
                    <div className="lens-inner">
                      ✦
                    </div>
                  </div>

                  <small>ANALYZING CONTEXT</small>
                </div>

              </div>

              <div className="frame-bottom">
                <span>CONTEXT</span>
                <span>CAUSE</span>
                <span>SEVERITY</span>
                <span>ACTION</span>
              </div>

            </div>

          </div>

        </section>

        {/* ANALYZER */}
        <section className="analyzer" id="analyzer">

          <div className="section-intro">

            <div className="section-label">
              <span>02</span>
              BUG REPORT
            </div>

            <h2>
              Give us the
              <em>symptoms.</em>
            </h2>

            <p>
              The more context you provide, the more useful the diagnosis.
            </p>

          </div>

          <div className="diagnostic-layout">

            {/* LEFT FORM */}
            <div className="report-card">

              <div className="card-heading">
                <div>
                  <small>CASE INTAKE</small>
                  <h3>Describe the problem</h3>
                </div>

                <span className="case-number">BL-01</span>
              </div>

              <form onSubmit={handleAnalyze}>

                <div className="form-section">

                  <div className="field-number">01</div>

                  <div className="field-content">

                    <label>
                      BUG TITLE
                      <span>Required</span>
                    </label>

                    <input
                      type="text"
                      value={bugTitle}
                      onChange={(e) =>
                        setBugTitle(e.target.value)
                      }
                      placeholder="Dashboard becomes blank after login"
                    />

                  </div>

                </div>

                <div className="form-section">

                  <div className="field-number">02</div>

                  <div className="field-content">

                    <label>
                      DESCRIPTION
                      <span>Required</span>
                    </label>

                    <textarea
                      value={bugDescription}
                      onChange={(e) =>
                        setBugDescription(e.target.value)
                      }
                      placeholder="Explain what happened, what you expected to happen, and what you were doing when the issue appeared..."
                    />

                  </div>

                </div>

                <div className="form-section">

                  <div className="field-number">03</div>

                  <div className="field-content">

                    <label>
                      ENVIRONMENT
                      <span>Optional</span>
                    </label>

                    <input
                      type="text"
                      value={environment}
                      onChange={(e) =>
                        setEnvironment(e.target.value)
                      }
                      placeholder="React · Chrome · Windows 11 · Production"
                    />

                  </div>

                </div>

                {error && (
                  <div className="error-box">
                    <strong>Analysis failed</strong>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="diagnose-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loader"></span>
                      ANALYZING REPORT...
                    </>
                  ) : (
                    <>
                      RUN AI DIAGNOSIS
                      <span>↗</span>
                    </>
                  )}
                </button>

              </form>

              <div className="privacy-note">
                <span>◈</span>
                Your report is processed only for this diagnosis.
              </div>

            </div>

            {/* RIGHT RESULT */}
            <div className="result-card">

              {!result && !loading && (
                <div className="empty-result">

                  <div className="result-number">
                    04
                  </div>

                  <div className="empty-icon">
                    <span>✦</span>
                  </div>

                  <small>AI DIAGNOSIS</small>

                  <h3>
                    Your technical
                    <br />
                    intelligence appears here.
                  </h3>

                  <p>
                    Submit a bug report and BugLens will transform
                    the symptoms into an actionable diagnosis.
                  </p>

                  <div className="result-preview">
                    <span>SEVERITY</span>
                    <span>ROOT CAUSE</span>
                    <span>NEXT ACTION</span>
                  </div>

                </div>
              )}

              {loading && (
                <div className="loading-result">

                  <div className="loading-ring">
                    <span>✦</span>
                  </div>

                  <small>BUGLENS ENGINE</small>

                  <h3>
                    Reading the evidence...
                  </h3>

                  <p>
                    Cross-checking symptoms, environment and
                    probable failure points.
                  </p>

                  <div className="progress-line">
                    <span></span>
                  </div>

                </div>
              )}

              {result && (
                <div className="actual-result">

                  <div className="result-header">

                    <div>
                      <small>DIAGNOSIS COMPLETE</small>
                      <h3>Technical intelligence</h3>
                    </div>

                    <button
                      onClick={resetAnalyzer}
                      className="reset-btn"
                    >
                      NEW CASE
                    </button>

                  </div>

                  <div className="result-summary">
                    <small>SUMMARY</small>
                    <p>{result.summary}</p>
                  </div>

                  <div className="result-stats">

                    <div>
                      <small>SEVERITY</small>
                      <strong className={`severity ${String(result.severity || "").toLowerCase()}`}>
                        {result.severity}
                      </strong>
                    </div>

                    <div>
                      <small>CATEGORY</small>
                      <strong>{result.category}</strong>
                    </div>

                    <div>
                      <small>CONFIDENCE</small>
                      <strong>
                        {result.confidence}%
                      </strong>
                    </div>

                  </div>

                  <div className="result-block">

                    <small>PROBABLE CAUSE</small>

                    <p>
                      {result.probableCause}
                    </p>

                  </div>

                  <div className="result-block">

                    <small>DEBUGGING STEPS</small>

                    <ol>
                      {result.debuggingSteps?.map(
                        (step, index) => (
                          <li key={index}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            {step}
                          </li>
                        )
                      )}
                    </ol>

                  </div>

                  <div className="action-box">

                    <small>RECOMMENDED ACTION</small>

                    <p>
                      {result.recommendedAction}
                    </p>

                    <span>→</span>

                  </div>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* WORKFLOW */}
        <section className="workflow" id="workflow">

          <div className="workflow-heading">

            <div className="section-label">
              <span>03</span>
              HOW IT WORKS
            </div>

            <h2>
              From symptom
              <br />
              to <em>solution.</em>
            </h2>

          </div>

          <div className="workflow-grid">

            <article>
              <span className="workflow-number">01</span>
              <div className="workflow-icon">⌁</div>
              <h3>Capture</h3>
              <p>
                Describe the bug and provide the technical
                environment around it.
              </p>
            </article>

            <article className="featured-workflow">
              <span className="workflow-number">02</span>
              <div className="workflow-icon">✦</div>
              <h3>Diagnose</h3>
              <p>
                AI interprets the context and identifies
                likely causes and severity.
              </p>
            </article>

            <article>
              <span className="workflow-number">03</span>
              <div className="workflow-icon">↗</div>
              <h3>Resolve</h3>
              <p>
                Receive focused debugging steps and
                a recommended next action.
              </p>
            </article>

          </div>

        </section>

        {/* CTA */}
        <section className="final-cta" id="about">

          <div className="cta-symbol">
            ✦
          </div>

          <div className="section-label">
            BUGLENS AI
          </div>

          <h2>
            Stop guessing.
            <br />
            <em>Start diagnosing.</em>
          </h2>

          <a href="#analyzer">
            Analyze a bug
            <span>↗</span>
          </a>

        </section>

      </main>

      <footer>

        <div>
          <strong>BUGLENS AI</strong>
          <span>Intelligent software diagnostics</span>
        </div>

        <span>© 2026 BugLens</span>

      </footer>

    </div>
  );
}

export default App;