
import { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

const initialFields = [
  {
    id: "field-1",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    minLength: 3,
    maxLength: 50,
    options: [],
  },
  {
    id: "field-2",
    type: "text",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    minLength: 0,
    maxLength: 100,
    options: [],
  },
];

export function FormProvider({ children }) {
  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem("dynamic-form-fields");
      return saved ? JSON.parse(saved) : initialFields;
    } catch {
      return initialFields;
    }
  });

  useEffect(() => {
    localStorage.setItem("dynamic-form-fields", JSON.stringify(fields));
  }, [fields]);

  function addField(type) {
    const field = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      placeholder: "",
      required: false,
      minLength: 0,
      maxLength: 100,
      options: ["Option 1", "Option 2"],
    };

    setFields((prev) => [...prev, field]);
  }

  function updateField(id, changes) {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...changes } : field
      )
    );
  }

  function removeField(id) {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }

  function moveField(fromId, toId) {
    setFields((prev) => {
      const from = prev.findIndex((field) => field.id === fromId);
      const to = prev.findIndex((field) => field.id === toId);

      if (from < 0 || to < 0 || from === to) return prev;

      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function resetFields() {
    setFields([]);
  }

  return (
    <FormContext.Provider
      value={{
        fields,
        addField,
        updateField,
        removeField,
        moveField,
        resetFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormBuilder() {
  return useContext(FormContext);
}
