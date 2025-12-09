"use client";

import { useEffect, useMemo, useState } from "react";
import { createPlayer, deletePlayer, listPlayers, Player, PlayerInput, updatePlayer } from "../lib/api";
import { HeaderBar } from "./components/HeaderBar";
import { PlayersTable } from "./components/PlayersTable";
import { PlayerForm } from "./components/PlayerForm";
import { Modal } from "./components/Modal";

export type Message = { type: "success" | "error"; text: string };

const emptyForm: PlayerInput = {
  name: "",
  position: "",
  team: "",
  number: null,
};

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<PlayerInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const sortedPlayers = useMemo(
    () =>
      [...players]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .filter((player) => {
          if (!filter.trim()) return true;
          const term = filter.toLowerCase();
          return (
            player.name.toLowerCase().includes(term) ||
            (player.team ?? "").toLowerCase().includes(term) ||
            (player.position ?? "").toLowerCase().includes(term)
          );
        }),
    [players, filter],
  );

  const fetchPlayers = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await listPlayers();
      setPlayers(data);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Could not load players.";
      setLoadError(text);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onChange = (key: keyof PlayerInput, value: string | number | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage(null);
  };

  const handleSubmit = async () => {
    setMessage(null);

    const payload: PlayerInput = {
      name: form.name.trim(),
      position: form.position?.trim() || undefined,
      team: form.team?.trim() || undefined,
      number: form.number === null || form.number === undefined ? undefined : Number(form.number),
    };

    if (!payload.name) {
      setMessage({ type: "error", text: "Name is required." });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updatePlayer(editingId, payload);
        setMessage({ type: "success", text: "Player updated." });
      } else {
        await createPlayer(payload);
        setMessage({ type: "success", text: "Player created." });
      }
      await fetchPlayers();
      reset();
      setFormOpen(false);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Could not save player.";
      setMessage({ type: "error", text });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (player: Player) => {
    setEditingId(player._id);
    setForm({
      name: player.name ?? "",
      position: player.position ?? "",
      team: player.team ?? "",
      number: player.number ?? null,
    });
    setMessage(null);
    setFormOpen(true);
  };

  const handleDelete = async (player: Player) => {
    if (!confirm(`Delete ${player.name}?`)) return;
    setMessage(null);
    try {
      await deletePlayer(player._id);
      await fetchPlayers();
      if (editingId === player._id) reset();
      setMessage({ type: "success", text: "Player deleted." });
    } catch (err) {
      const text = err instanceof Error ? err.message : "Could not delete player.";
      setMessage({ type: "error", text });
    }
  };

  return (
    <div className="page">
      <HeaderBar
        onRefresh={fetchPlayers}
        loading={loading}
        onAdd={() => {
          reset();
          setFormOpen(true);
        }}
        filter={filter}
        onFilterChange={setFilter}
      />

      {loadError ? (
        <div className="card error">
          <strong>Could not load players.</strong>
          <p>{loadError}</p>
        </div>
      ) : (
        <PlayersTable
          players={sortedPlayers}
          loading={loading}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        title={editingId ? "Edit player" : "Add player"}
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          reset();
        }}
        footer={
          <div className="actions">
            <button className="button primary" onClick={handleSubmit} disabled={saving}>
              {editingId ? "Save changes" : "Create player"}
            </button>
            <button className="button ghost" onClick={reset} disabled={saving}>
              Reset
            </button>
          </div>
        }
      >
        <PlayerForm
          form={form}
          message={message}
          onChange={onChange}
        />
      </Modal>
    </div>
  );
}
