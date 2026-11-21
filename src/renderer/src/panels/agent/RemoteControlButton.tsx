import type { RemoteControl } from '@shared/agent'
import { RemoteIcon } from './icons'

const BASE = 'relative flex h-7 w-7 items-center justify-center rounded-md ring-1 transition hover:bg-neutral-800 disabled:opacity-40'
const TONE: Record<RemoteControl['status'] | 'off', string> = {
  off: 'text-neutral-400 ring-neutral-800 hover:text-neutral-100',
  connecting: 'text-amber-400 ring-amber-700/60',
  connected: 'text-emerald-400 ring-emerald-700/60',
  failed: 'text-red-400 ring-red-800/60',
}
const LABEL: Record<RemoteControl['status'] | 'off', string> = {
  off: 'Ativar Remote Control (continuar no claude.ai / celular)',
  connecting: 'Remote Control conectando… (clique para desligar)',
  connected: 'Remote Control ativo (clique para desligar)',
  failed: 'Remote Control falhou (clique para desligar)',
}

/** The CLI's /remote-control as a toolbar toggle, plus a link to the session on claude.ai once it's up. */
export function RemoteControlButton({ remote, onToggle }: { remote: RemoteControl | null | undefined; onToggle(): void }) {
  const status = remote?.status ?? 'off'
  const title = remote?.detail ? `${LABEL[status]}\n${remote.detail}` : LABEL[status]
  return (
    <>
      <button aria-label="Remote Control" aria-pressed={status !== 'off'} data-testid="remote-control" data-status={status} title={title} className={`${BASE} ${TONE[status]}`} onClick={onToggle}>
        {status === 'connecting' && <span className="absolute inset-0 animate-pulse rounded-md bg-amber-500/15" />}
        <RemoteIcon className="relative h-4 w-4" />
      </button>
      {remote?.url && status === 'connected' && (
        <a
          href={remote.url}
          target="_blank"
          rel="noreferrer"
          data-testid="remote-control-link"
          title={remote.url}
          className="whitespace-nowrap rounded px-1 text-emerald-400 hover:bg-neutral-800 hover:text-emerald-300"
        >
          remote ↗
        </a>
      )}
    </>
  )
}
