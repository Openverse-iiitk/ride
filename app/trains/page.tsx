"use client"

import { useState, useRef, useEffect } from "react"
import {
  TrainFront,
  Clock,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Search,
  ArrowLeft,
} from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import { Navbar } from "@/components/home/Navbar"
import { MOCK_TRAINS, type TrainRoute } from "@/lib/data"

function StatusBadge({ status, delay }: { status: string; delay?: string }) {
  if (status === "on-time")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
        On Time
      </span>
    )
  if (status === "delayed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
        <AlertTriangle className="w-3 h-3" />
        Delayed {delay}
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
      Cancelled
    </span>
  )
}

function TrainCard({ train, index }: { train: TrainRoute; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: index * 0.08, ease: "power3.out" }
      )
    }
  }, [index])

  return (
    <div ref={cardRef} className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <TrainFront className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-slate-800">{train.trainName}</span>
              <span className="text-xs text-slate-400 font-mono">#{train.trainNumber}</span>
            </div>
            <div className="text-[11px] text-slate-400">{train.date}</div>
          </div>
        </div>
        <StatusBadge status={train.status} delay={train.delay} />
      </div>

      {/* Route */}
      <div className="mt-4 flex items-center gap-3">
        <div className="text-center min-w-[80px]">
          <div className="text-lg font-bold text-slate-800">{train.departure}</div>
          <div className="text-xs text-slate-500 truncate">{train.from}</div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="text-[10px] text-slate-400 font-medium">{train.duration}</div>
          <div className="w-full flex items-center gap-1 my-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200" />
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
          </div>
          <div className="text-[10px] text-slate-400">{train.stops.length} stops</div>
        </div>

        <div className="text-center min-w-[80px]">
          <div className="text-lg font-bold text-slate-800">{train.arrival}</div>
          <div className="text-xs text-slate-500 truncate">{train.to}</div>
        </div>
      </div>

      {/* Classes */}
      <div className="mt-4 flex flex-wrap gap-2">
        {train.classes.map((cls) => (
          <div
            key={cls.name}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
              cls.available > 0
                ? "bg-white/60 border-slate-200/60 text-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-400 line-through"
            }`}
          >
            <span className="font-bold">{cls.name}</span>
            <span className="mx-1.5 text-slate-300">|</span>
            <span className="text-emerald-600 font-semibold">{cls.price}</span>
            <span className="mx-1.5 text-slate-300">|</span>
            <span className={cls.available > 5 ? "text-emerald-600" : cls.available > 0 ? "text-amber-600" : "text-red-500"}>
              {cls.available > 0 ? `${cls.available} avl` : "WL"}
            </span>
          </div>
        ))}
      </div>

      {/* Expand stops */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs text-[#4b51f1] font-medium hover:underline"
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {expanded ? "Hide route" : "View route"}
      </button>

      {expanded && (
        <div className="mt-3 pl-3 border-l-2 border-emerald-200 space-y-2">
          {train.stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-[7px]" />
              {stop}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TrainsPage() {
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState(MOCK_TRAINS)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(MOCK_TRAINS)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      MOCK_TRAINS.filter(
        (t) =>
          t.trainName.toLowerCase().includes(q) ||
          t.from.toLowerCase().includes(q) ||
          t.to.toLowerCase().includes(q) ||
          t.trainNumber.includes(q)
      )
    )
  }, [query])

  return (
    <div className="min-h-screen bg-[#f0f2f8]">
      <Navbar />

      {/* Ambient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-green-400/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <Link href="/home" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#4b51f1] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <TrainFront className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Train Routes</h1>
              <p className="text-sm text-slate-500">{MOCK_TRAINS.length} routes available</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 glass-card rounded-xl p-1.5">
            <div className="flex items-center gap-2 px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trains, routes, or train numbers..."
                className="bg-transparent text-slate-800 text-sm w-full outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((train, i) => (
            <TrainCard key={train.id} train={train} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-slate-500 text-sm">No trains found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
