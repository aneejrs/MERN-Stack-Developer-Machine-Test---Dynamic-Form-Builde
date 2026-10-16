
import {
  Type,
  ChevronDown,
  CheckSquare,
  CircleDot,
  Plus,
} from "lucide-react";
import { useFormBuilder } from "../context/FormContext";
import FieldEditor from "./FieldEditor";

const fieldTypes = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "dropdown", label: "Dropdown", icon: ChevronDown },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "radio", label: "Radio Buttons", icon: CircleDot },
];

export default function FormBuilder() {
  const { fields, addField, moveField } = useFormBuilder();

  return (
    <div className="builder-layout">
      <aside className="sidebar">
        <h3>Add Fields</h3>
        <p className="muted">Choose a field to add to your form.</p>

        {fieldTypes.map(({ type, label, icon: Icon }) => (
          <button
            className="add-field-button"
            key={type}
            onClick={() => addField(type)}
            type="button"
          >
            <Icon size={18} />
            <span>{label}</span>
            <Plus size={16} />
          </button>
        ))}
      </aside>

      <section className="fields-panel">
        <div className="section-heading">
          <div>
            <h2>Form Fields</h2>
            <p className="muted">
              Configure your fields. Drag them to reorder.
            </p>
          </div>
          <span className="count-badge">{fields.length} fields</span>
        </div>

        {fields.length === 0 ? (
          <div className="empty-state">
            <Plus size={30} />
            <h3>Start building your form</h3>
            <p>Add your first field using the buttons on the left.</p>
          </div>
        ) : (
          fields.map((field) => (
            <FieldEditor
              key={field.id}
              field={field}
              onDrop={moveField}
            />
          ))
        )}
      </section>
    </div>
  );
}
