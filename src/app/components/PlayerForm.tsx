import type { PlayerInput } from "../../lib/api"

type PlayerFormProps = {
  form: PlayerInput
  message: { type: "success" | "error"; text: string } | null
  onChange: (key: keyof PlayerInput, value: string | number | null) => void
}

export function PlayerForm({
  form,
  message,
  onChange
}: PlayerFormProps) {
  return (
    <div className="form-stack">
      <div className="form-grid">
        <label className="field">
          <span>
            Name <span className="required">*</span>
          </span>
          <input
            value={form.name ?? ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Jane Doe"
          />
        </label>

        <label className="field">
          <span>Position</span>
          <input
            value={form.position ?? ""}
            onChange={(e) => onChange("position", e.target.value)}
            placeholder="Forward"
          />
        </label>

        <label className="field">
          <span>Team</span>
          <input
            value={form.team ?? ""}
            onChange={(e) => onChange("team", e.target.value)}
            placeholder="City Hawks"
          />
        </label>

        <label className="field">
          <span>Number</span>
          <input
            type="number"
            min="0"
            value={form.number ?? ""}
            onChange={(e) => onChange("number", e.target.value === "" ? null : Number(e.target.value))}
            placeholder="23"
          />
        </label>
      </div>

      {message ? <div className={`alert ${message.type}`}>{message.text}</div> : null}
    </div>
  )
}
