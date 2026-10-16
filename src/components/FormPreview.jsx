
import { useState } from "react";
import { CheckCircle, RotateCcw, Send } from "lucide-react";
import { useFormBuilder } from "../context/FormContext";
import FormField from "./FormField";

export default function FormPreview() {
  const { fields } = useFormBuilder();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function changeValue(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setSubmitted(false);
  }

  function validate() {
    const nextErrors = {};

    fields.forEach((field) => {
      const value = values[field.id];
      const empty =
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "string" && value.trim() === "");

      if (field.required) {
        if (field.type === "checkbox" && value !== true) {
          nextErrors[field.id] = "This checkbox is required.";
          return;
        }

        if (empty) {
          nextErrors[field.id] = `${field.label} is required.`;
          return;
        }
      }

      if (field.type === "text" && !empty) {
        const length = value.trim().length;

        if (length < (field.minLength || 0)) {
          nextErrors[field.id] =
            `Enter at least ${field.minLength} characters.`;
        } else if (length > (field.maxLength || 100)) {
          nextErrors[field.id] =
            `Enter no more than ${field.maxLength} characters.`;
        }
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setSubmitted(false);
      return;
    }

    const result = Object.fromEntries(
      fields.map((field) => [
        field.label,
        values[field.id] ?? (field.type === "checkbox" ? false : ""),
      ])
    );

    setSubmitted(true);
    console.log("Form submitted:", result);
  }

  function resetForm() {
    setValues({});
    setErrors({});
    setSubmitted(false);
  }

  if (fields.length === 0) {
    return (
      <div className="empty-state">
        <h3>No fields to preview</h3>
        <p>Add some fields in the builder first.</p>
      </div>
    );
  }

  return (
    <div className="preview-wrapper">
      <div className="preview-card">
        <div className="preview-heading">
          <div className="preview-icon">
            <CheckCircle size={24} />
          </div>
          <h2>Form Preview</h2>
          <p>Fill in the form and submit to test validation.</p>
        </div>

        {submitted ? (
          <div className="success-panel">
            <CheckCircle size={42} />
            <h3>Form submitted successfully!</h3>
            <p>Your responses are ready. They are logged in the browser console.</p>
            <button className="primary-button" onClick={resetForm}>
              <RotateCcw size={17} /> Submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={values[field.id]}
                error={errors[field.id]}
                onChange={(value) => changeValue(field.id, value)}
              />
            ))}

            <div className="form-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={resetForm}
              >
                <RotateCcw size={16} /> Reset
              </button>

              <button className="primary-button" type="submit">
                <Send size={16} /> Submit Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
