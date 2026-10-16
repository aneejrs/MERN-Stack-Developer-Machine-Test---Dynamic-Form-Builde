
import { Trash2, GripVertical } from "lucide-react";
import { useFormBuilder } from "../context/FormContext";

export default function FieldEditor({ field, onDragStart, onDrop }) {
  const { updateField, removeField } = useFormBuilder();

  const hasOptions = ["dropdown", "radio"].includes(field.type);

  return (
    <div
      className="field-editor"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("fieldId", field.id);
        onDragStart?.(field.id);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const fromId = e.dataTransfer.getData("fieldId");
        if (fromId) onDrop?.(fromId, field.id);
      }}
    >
      <div className="field-editor-heading">
        <span className="drag-handle" title="Drag to reorder">
          <GripVertical size={19} />
        </span>
        <strong>{field.label || "Untitled field"}</strong>
        <span className="field-type">{field.type}</span>
        <button
          className="icon-button danger"
          type="button"
          title="Delete field"
          onClick={() => removeField(field.id)}
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="editor-grid">
        <label>
          Field Label
          <input
            value={field.label}
            onChange={(e) =>
              updateField(field.id, { label: e.target.value })
            }
            placeholder="Enter label"
          />
        </label>

        {["text", "dropdown"].includes(field.type) && (
          <label>
            Placeholder
            <input
              value={field.placeholder}
              onChange={(e) =>
                updateField(field.id, { placeholder: e.target.value })
              }
              placeholder="Enter placeholder"
            />
          </label>
        )}

        <label className="checkbox-setting">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) =>
              updateField(field.id, { required: e.target.checked })
            }
          />
          Required field
        </label>

        {field.type === "text" && (
          <>
            <label>
              Minimum Length
              <input
                type="number"
                min="0"
                value={field.minLength ?? 0}
                onChange={(e) =>
                  updateField(field.id, {
                    minLength: Number(e.target.value),
                  })
                }
              />
            </label>

            <label>
              Maximum Length
              <input
                type="number"
                min={field.minLength ?? 0}
                value={field.maxLength ?? 100}
                onChange={(e) =>
                  updateField(field.id, {
                    maxLength: Math.max(
                      field.minLength ?? 0,
                      Number(e.target.value)
                    ),
                  })
                }
              />
            </label>
          </>
        )}

        {hasOptions && (
          <label className="full-width">
            Options (one per line)
            <textarea
              rows="3"
              value={(field.options || []).join("\n")}
              onChange={(e) =>
                updateField(field.id, {
                  options: e.target.value.split("\n"),
                })
              }
              placeholder={"Option 1\nOption 2"}
            />
          </label>
        )}
      </div>
    </div>
  );
}
