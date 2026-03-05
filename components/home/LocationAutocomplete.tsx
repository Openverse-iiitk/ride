"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { MapPin, Clock } from "lucide-react"
import gsap from "gsap"
import { LOCATIONS } from "@/lib/data"

interface LocationAutocompleteProps {
  value: string
  onChange: (val: string) => void
  placeholder: string
  icon?: "origin" | "destination"
  recentSearches?: string[]
  onOpenChange?: (open: boolean) => void
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  icon = "destination",
  recentSearches = [],
  onOpenChange,
}: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  const filtered = useMemo(() => {
    if (!value.trim()) return LOCATIONS.slice(0, 8)
    const q = value.toLowerCase()
    return LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [value])

  useEffect(() => {
    if (open && dropRef.current) {
      gsap.fromTo(
        dropRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      )
    }
  }, [open])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleSelect = (name: string) => {
    onChange(name)
    setOpen(false)
  }

  const showDropdown = open && (filtered.length > 0 || recentSearches.length > 0)

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2">
        <MapPin
          className={`w-4 h-4 shrink-0 ${icon === "origin" ? "text-[#4b51f1]" : "text-slate-400"}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="bg-transparent text-slate-800 font-semibold text-sm w-full outline-none placeholder:text-slate-400 placeholder:font-normal"
          autoComplete="off"
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropRef}
          className="absolute top-full left-0 mt-2 w-full rounded-xl bg-white/70 shadow-2xl max-h-[280px] overflow-y-auto py-1 z-50"
        >
          {/* Recent searches */}
          {recentSearches.length > 0 && !value.trim() && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Recent
              </div>
              {recentSearches.slice(0, 3).map((r) => (
                <button
                  key={r}
                  onClick={() => handleSelect(r)}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-white/50 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-700 truncate">{r}</span>
                </button>
              ))}
              <div className="border-t border-slate-200/40 my-1" />
            </>
          )}

          {/* Suggestions */}
          {filtered.length > 0 && (
            <>
              {value.trim() && (
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Suggestions
                </div>
              )}
              {filtered.map((loc) => (
                <button
                  key={loc.locationId}
                  onClick={() => handleSelect(loc.name)}
                  className="w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-white/50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#4b51f1]/60 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">
                      {loc.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {loc.address}
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

          {filtered.length === 0 && value.trim() && (
            <div className="px-3 py-4 text-center text-sm text-slate-400">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
