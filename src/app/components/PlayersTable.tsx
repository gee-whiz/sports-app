import type { Player } from "../../lib/api"

type PlayersTableProps = {
  players: Player[]
  loading: boolean
  onEdit: (player: Player) => void
  onDelete: (player: Player) => void
}

export function PlayersTable({ players, loading, onEdit, onDelete }: PlayersTableProps) {
  const hasPlayers = players.length > 0

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="label">Current roster</p>
          <p className="muted">Newest players first</p>
        </div>
        {hasPlayers ? <span className="pill">{players.length} total</span> : null}
      </div>

      {loading ? (
        <p className="muted">Loading players…</p>
      ) : !hasPlayers ? (
        <p className="muted">No players yet. Add one below.</p>
      ) : (
        <div className="table">
          <div className="table-head">
            <div>Name</div>
            <div>Position</div>
            <div>Team</div>
            <div className="center">#</div>
            <div className="right">Actions</div>
          </div>
          <div className="table-body">
            {players.map((player) => (
              <div className="table-row" key={player._id}>
                <div>
                  <div className="strong">{player.name}</div>
                  <div className="muted small">
                    {player.createdAt ? new Date(player.createdAt).toLocaleDateString() : "—"}
                  </div>
                </div>
                <div>{player.position ?? "—"}</div>
                <div>{player.team ?? "—"}</div>
                <div className="center">{player.number ?? "—"}</div>
                <div className="right actions">
                  <button className="button ghost" onClick={() => onEdit(player)}>
                    Edit
                  </button>
                  <button className="button danger ghost" onClick={() => onDelete(player)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
