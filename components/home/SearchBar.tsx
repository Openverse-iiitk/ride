"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { Calendar, Search, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { GlassCalendar } from "./GlassCalendar"
import { LocationAutocomplete } from "./LocationAutocomplete"

interface SearchBarProps {
  onSearch: (from: string, to: string, date: Date | null) => void
  onDropdownToggle?: (open: boolean) => void
}

export function SearchBar({ onSearch, onDropdownToggle }: SearchBarProps) {
  const [from, setFrom] = useState("IIIT Kottayam")
  const [to, setTo] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [nearbyPlaces, setNearbyPlaces] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  // Track when any dropdown is open
  useEffect(() => {
    const anyOpen = fromOpen || toOpen || showCalendar
    onDropdownToggle?.(anyOpen)
  }, [fromOpen, toOpen, showCalendar, onDropdownToggle])

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
      )
    }
  }, [])

  const handleSearch = () => {
    onSearch(from, to, date)
  }

  return (
    <div ref={barRef} className="w-full max-w-4xl mx-auto px-4">
      <div className="rounded-2xl p-1.5 md:p-2 bg-white/50 border border-white/40 shadow-lg">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0">
          {/* From */}
          <div className="flex-1 px-4 py-3 md:border-r border-slate-200/40">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              From:
            </label>
            <LocationAutocomplete
              value={from}
              onChange={setFrom}
              placeholder="Origin"
              icon="origin"
              onOpenChange={setFromOpen}
            />
          </div>

          {/* To */}
          <div className="flex-1 px-4 py-3 md:border-r border-slate-200/40">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              To:
            </label>
            <LocationAutocomplete
              value={to}
              onChange={setTo}
              placeholder="Airport, city, etc"
              icon="destination"
              onOpenChange={setToOpen}
            />
          </div>

          {/* Depart Date */}
          <div className="flex-1 px-4 py-3 relative">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Depart:
            </label>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 w-full text-left"
            >
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className={`text-sm font-semibold ${date ? "text-slate-800" : "text-slate-400"}`}>
                {date ? format(date, "MMM dd, yyyy") : "Add Date"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-auto" />
            </button>
            {showCalendar && (
              <GlassCalendar
                selectedDate={date}
                onSelect={(d) => {
                  setDate(d)
                  setShowCalendar(false)
                }}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="search-btn flex items-center justify-center gap-2 px-8 py-3 md:py-0 md:my-1 rounded-xl md:rounded-2xl 
                       bg-[#4b51f1] text-white font-bold text-sm tracking-wide
                       hover:bg-[#3a3fd4] active:scale-[0.97] transition-all duration-200
                       shadow-lg shadow-[#4b51f1]/25 hover:shadow-[#4b51f1]/40"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Nearby checkbox */}
      <div className="mt-3 flex items-center gap-2 pl-2">
        <input
          type="checkbox"
          id="nearby"
          checked={nearbyPlaces}
          onChange={(e) => setNearbyPlaces(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-[#4b51f1] focus:ring-[#4b51f1]/30 accent-[#4b51f1]"
        />
        <label htmlFor="nearby" className="text-sm text-slate-600 select-none cursor-pointer">
          Add Nearby places
        </label>
      </div>
    </div>
  )
}
