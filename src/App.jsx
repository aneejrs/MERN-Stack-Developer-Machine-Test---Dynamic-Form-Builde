import { useState } from "react";
import {
  Moon,
  Sun,
  Eye,
  Settings2,
  RotateCcw,
  ClipboardList,
} from "lucide-react";
import { FormProvider, useFormBuilder } from "./context/FormContext";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";
import "./index.css";

function Dashboard() {
  const [mode, setMode] = useState("builder");
  const [dark, setDark] = useState(false);
  const { resetFields, fields } = useFormBuilder();

  return (
    <main className={dark ? "app dark" : "app"}>
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <ClipboardList size={23} />
          </span>
          <span>FormCraft</span>
        </a>

        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={() => setDark(!dark)}
            title="Toggle dark mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
            <span>{dark ? "Light" : "Dark"}</span>
          </button>
          <button
            className="secondary-button"
            onClick={() => {
              if (window.confirm("Delete all form fields?")) {
                resetFields();
              }
            }}
          >
            <RotateCcw size={16} />
            <span>Clear</span>
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <span className="eyebrow">REACT FORM BUILDER</span>
        <h1>Build forms. Collect responses.</h1>
        <p>
          Create custom forms with configurable fields and validation rules.
        </p>
      </section>

      <nav className="mode-tabs">
        <button
          className={mode === "builder" ? "mode-tab active" : "mode-tab"}
          onClick={() => setMode("builder")}
        >
          <Settings2 size={18} /> Builder
        </button>
        <button
          className={mode === "preview" ? "mode-tab active" : "mode-tab"}
          onClick={() => setMode("preview")}
        >
          <Eye size={18} /> Preview & Submit
        </button>
        <span className="tab-count">{fields.length} fields configured</span>
      </nav>

      {mode === "builder" ? <FormBuilder /> : <FormPreview />}

      <footer className="footer">Built with React, Vite & Context API</footer>
    </main>
  );
}

export default function App() {
  return (
    <FormProvider>
      <Dashboard />
    </FormProvider>
  );
}
