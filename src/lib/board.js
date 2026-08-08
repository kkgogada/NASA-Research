/**
 * Saved research board — bookmarks and personal notes.
 *
 * Stored in localStorage only. Nothing here is uploaded anywhere; there is no
 * account and no server. Notes written by the user are stored and displayed as
 * PERSONAL NOTES and are always visually distinguished from official source
 * material and from app-generated summaries.
 */

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'nre.board.v1'

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const write = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* storage full or unavailable — the session still works, it just won't persist */
  }
  window.dispatchEvent(new CustomEvent('nre:board-changed'))
}

export const itemKey = (type, id) => `${type}:${id}`

export function useBoard() {
  const [items, setItems] = useState(read)

  useEffect(() => {
    const sync = () => setItems(read())
    window.addEventListener('nre:board-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('nre:board-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const isSaved = useCallback(
    (type, id) => items.some((i) => i.key === itemKey(type, id)),
    [items],
  )

  const toggle = useCallback((entry) => {
    const key = itemKey(entry.type, entry.id)
    const current = read()
    const existing = current.find((i) => i.key === key)
    if (existing) {
      write(current.filter((i) => i.key !== key))
      return false
    }
    write([
      {
        key,
        type: entry.type,
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle || '',
        href: entry.href,
        sourceUrl: entry.sourceUrl || '',
        sourceLabel: entry.sourceLabel || '',
        imageUrl: entry.imageUrl || '',
        note: '',
        savedAt: new Date().toISOString(),
      },
      ...current,
    ])
    return true
  }, [])

  const setNote = useCallback((key, note) => {
    write(read().map((i) => (i.key === key ? { ...i, note, noteUpdatedAt: new Date().toISOString() } : i)))
  }, [])

  const remove = useCallback((key) => {
    write(read().filter((i) => i.key !== key))
  }, [])

  const clearAll = useCallback(() => write([]), [])

  return { items, isSaved, toggle, setNote, remove, clearAll }
}

/** Export the board as a plain-text study sheet the user can keep. */
export function boardToText(items) {
  const lines = [
    'NASA RESEARCH EXPLORER — SAVED RESEARCH BOARD',
    'Independent educational project. Not an official NASA product.',
    `Exported ${new Date().toLocaleString()}`,
    '',
  ]
  items.forEach((i, n) => {
    lines.push(`${n + 1}. ${i.title}${i.subtitle ? ` — ${i.subtitle}` : ''}`)
    if (i.sourceUrl) lines.push(`   Official source: ${i.sourceLabel || i.sourceUrl}`)
    if (i.sourceUrl) lines.push(`   ${i.sourceUrl}`)
    if (i.note) {
      lines.push('   My note:')
      i.note.split('\n').forEach((l) => lines.push(`     ${l}`))
    }
    lines.push('')
  })
  return lines.join('\n')
}
