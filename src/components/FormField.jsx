
export default function FormField({
  field,
  value,
  onChange,
  error,
}) {
  const options = (field.options || [])
    .map((option) => option.trim())
    .filter(Boolean);

  return (
    <div className="form-group">
      {field.type !== "checkbox" && (
        <label className="form-label">
          {field.label}
          {field.required && <span className="required"> *</span>}
        </label>
      )}

      {field.type === "text" && (
        <input
          type="text"
          value={value ?? ""}
          placeholder={field.placeholder}
          maxLength={field.maxLength || undefined}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
      )}

      {field.type === "dropdown" && (
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {options.map((option, index) => (
            <option key={`${option}-${index}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === "checkbox" && (
        <label className="choice-option">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>
            {field.label}
            {field.required && <span className="required"> *</span>}
          </span>
        </label>
      )}

      {field.type === "radio" && (
        <div className="choice-list">
          {options.map((option, index) => (
            <label className="choice-option" key={`${option}-${index}`}>
              <input
                type="radio"
                name={field.id}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {field.type === "text" && (
        <p className="helper-text">
          {field.minLength > 0 && `Min ${field.minLength} characters · `}
          Max {field.maxLength || 100} characters
        </p>
      )}
    </div>
  );
}
