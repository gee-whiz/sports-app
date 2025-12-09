type HeaderBarProps = {
  onRefresh: () => void
  loading: boolean
  onAdd: () => void
  filter: string
  onFilterChange: (value: string) => void
}

export function HeaderBar({ onRefresh, loading, onAdd, filter, onFilterChange }: HeaderBarProps) {
  return (
    <header className="page-header">
      <div>
        <h1>Roster</h1>
        <p className="muted">Keep track of your players and their details.</p>
      </div>
      <div className="header-actions">
        <input
          className="search"
          type="search"
          value={filter}
          placeholder="Search players..."
          onChange={(e) => onFilterChange(e.target.value)}
        />
        <button className="button primary" onClick={onAdd}>
          Add player
        </button>
        <button className="button ghost" onClick={onRefresh} disabled={loading}>
          Refresh
        </button>
      </div>
    </header>
  )
}
