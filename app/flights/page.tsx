"use client"

import { useState, useRef, useEffect } from "react"
import {
  Plane,
  Search,
  ArrowLeft,
  AlertTriangle,
  Luggage,
  ArrowRight,
} from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import { Navbar } from "@/components/home/Navbar"
import { MOCK_FLIGHTS, type Flight } from "@/lib/data"

function FlightCard({ flight, index }: { flight: Flight; index: number }) {
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

  const stopsLabel =
    flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`

  return (
    <div ref={cardRef} className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left: Flight info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-sky-600" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-slate-800">{flight.airline}</div>
              <div className="text-[11px] text-slate-400">{flight.flightNumber} &middot; {flight.class}</div>
            </div>
            {flight.status === "delayed" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 ml-auto shrink-0">
                <AlertTriangle className="w-3 h-3" /> Delayed
              </span>
            )}
            {flight.status === "cancelled" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 ml-auto shrink-0">
                Cancelled
              </span>
            )}
          </div>

          {/* Route with airport codes */}
          <div className="flex items-center gap-3">
            <div className="min-w-[80px]">
              <div className="text-lg font-bold text-slate-800">{flight.departure}</div>
              <div className="text-xs font-bold text-sky-600">{flight.fromCode}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{flight.from}</div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-medium">{flight.duration}</div>
              <div className="w-full flex items-center gap-1 my-1">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <div className="flex-1 relative">
                  <div className="border-t-2 border-dashed border-slate-200 w-full" />
                  {flight.stops > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-sky-300" />
                  )}
                </div>
                <Plane className="w-3 h-3 text-sky-600 -rotate-45" />
              </div>
              <div className="text-[10px] text-slate-400">{stopsLabel}</div>
              {flight.stopLocations && flight.stopLocations.length > 0 && (
                <div className="text-[9px] text-slate-400">
                  via {flight.stopLocations.join(", ")}
                </div>
              )}
            </div>

            <div className="min-w-[80px] text-right">
              <div className="text-lg font-bold text-slate-800">{flight.arrival}</div>
              <div className="text-xs font-bold text-sky-600">{flight.toCode}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px] ml-auto">{flight.to}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/60 border border-slate-200/60 text-slate-600">
              <Luggage className="w-3 h-3" />
              {flight.baggage}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/60 border border-slate-200/60 text-slate-600">
              {flight.class}
            </span>
          </div>
        </div>

        {/* Right: Price & date */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:min-w-[100px] sm:border-l border-slate-200/40 sm:pl-4">
          <div className="text-right">
            <div className="text-xl font-bold text-sky-600">{flight.price}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">per person</div>
          </div>
          <div className="text-[11px] text-slate-400">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

export default function FlightsPage() {
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState(MOCK_FLIGHTS)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(MOCK_FLIGHTS)
      return
    }
    const q = query.toLowerCase()
    setFiltered(
      MOCK_FLIGHTS.filter(
        (f) =>
          f.airline.toLowerCase().includes(q) ||
          f.flightNumber.toLowerCase().includes(q) ||
          f.from.toLowerCase().includes(q) ||
          f.to.toLowerCase().includes(q) ||
          f.fromCode.toLowerCase().includes(q) ||
          f.toCode.toLowerCase().includes(q)
      )
    )
  }, [query])

  return (
    <div className="min-h-screen bg-[#f0f2f8]">
      <Navbar />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-sky-500/[0.04] blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-400/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div ref={headerRef} className="mb-8">
          <Link href="/home" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#4b51f1] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center">
              <Plane className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Flights</h1>
              <p className="text-sm text-slate-500">{MOCK_FLIGHTS.length} flights available</p>
            </div>
          </div>

          <div className="mt-4 glass-card rounded-xl p-1.5">
            <div className="flex items-center gap-2 px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search airlines, flight numbers, cities, or airport codes..."
                className="bg-transparent text-slate-800 text-sm w-full outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((flight, i) => (
            <FlightCard key={flight.id} flight={flight} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-slate-500 text-sm">No flights found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
