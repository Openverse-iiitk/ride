"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bus,
  Clock,
  Star,
  Users,
  Wifi,
  Zap,
  Snowflake,
  Search,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import { Navbar } from "@/components/home/Navbar"
import { MOCK_BUSES, type BusRoute } from "@/lib/data"

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  AC: <Snowflake className="w-3 h-3" />,
  WiFi: <Wifi className="w-3 h-3" />,
  "Charging Port": <Zap className="w-3 h-3" />,
}

function BusCard({ bus, index }: { bus: BusRoute; index: number }) {
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

  const seatColor =
    bus.seatsAvailable > 15
      ? "text-emerald-600"
      : bus.seatsAvailable > 5
        ? "text-amber-600"
        : "text-red-500"

  return (
    <div ref={cardRef} className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left: Operator info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-slate-800 truncate">{bus.operator}</div>
              <div className="text-[11px] text-slate-400">{bus.busType}</div>
            </div>
            {bus.status === "delayed" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 ml-auto shrink-0">
                <AlertTriangle className="w-3 h-3" /> Delayed
              </span>
            )}
          </div>

          {/* Route */}
          <div className="flex items-center gap-3">
            <div className="min-w-[80px]">
              <div className="text-lg font-bold text-slate-800">{bus.departure}</div>
              <div className="text-xs text-slate-500 truncate">{bus.from}</div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-medium">{bus.duration}</div>
              <div className="w-full flex items-center gap-1 my-1">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="flex-1 border-t-2 border-dashed border-slate-200" />
                <div className="w-2 h-2 rounded-full bg-amber-600" />
              </div>
            </div>

            <div className="min-w-[80px] text-right">
              <div className="text-lg font-bold text-slate-800">{bus.arrival}</div>
              <div className="text-xs text-slate-500 truncate">{bus.to}</div>
            </div>
          </div>

          {/* Amenities */}
          {bus.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {bus.amenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/60 border border-slate-200/60 text-slate-600"
                >
                  {AMENITY_ICONS[a] || null}
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Price & stats */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:min-w-[100px] sm:border-l border-slate-200/40 sm:pl-4">
          <div className="text-right">
            <div className="text-xl font-bold text-amber-600">{bus.price}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">per seat</div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {bus.rating}
            </span>
            <span className={`flex items-center gap-1 font-medium ${seatColor}`}>
              <Users className="w-3 h-3" />
              {bus.seatsAvailable} left
            </span>
          </div>

          <div className="text-[11px] text-slate-400">{bus.date}</div>
        </div>
      </div>
    </div>
  )
}

export default function BusesPage() {
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState(MOCK_BUSES)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(MOCK_BUSES)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      MOCK_BUSES.filter(
        (b) =>
          b.operator.toLowerCase().includes(q) ||
          b.from.toLowerCase().includes(q) ||
          b.to.toLowerCase().includes(q) ||
          b.busType.toLowerCase().includes(q)
      )
    )
  }, [query])

  return (
    <div className="min-h-screen bg-[#f0f2f8]">
      <Navbar />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-amber-500/[0.04] blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-orange-400/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div ref={headerRef} className="mb-8">
          <Link href="/home" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#4b51f1] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Bus className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Bus Routes</h1>
              <p className="text-sm text-slate-500">{MOCK_BUSES.length} routes available</p>
            </div>
          </div>

          <div className="mt-4 glass-card rounded-xl p-1.5">
            <div className="flex items-center gap-2 px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search operators, routes, or bus types..."
                className="bg-transparent text-slate-800 text-sm w-full outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((bus, i) => (
            <BusCard key={bus.id} bus={bus} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-slate-500 text-sm">No buses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
