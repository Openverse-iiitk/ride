"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Car,
  CalendarDays,
  Clock,
  Users,
  IndianRupee,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import { Navbar } from "@/components/home/Navbar"
import { LocationAutocomplete } from "@/components/home/LocationAutocomplete"

export default function CreateRidePage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [seats, setSeats] = useState("")
  const [price, setPrice] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
    }
  }, [])

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(successRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
    }
  }, [submitted])

  const canSubmit = from && to && date && time && seats && price

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f2f8]">
        <Navbar />
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        </div>
        <div className="max-w-md mx-auto px-4 pt-32 text-center">
          <div ref={successRef} className="glass-card rounded-3xl p-10">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Ride Created!</h2>
            <p className="text-sm text-slate-500 mb-1">{from} → {to}</p>
            <p className="text-xs text-slate-400 mb-6">{date} at {time} &middot; {seats} seats &middot; ₹{price}/seat</p>
            <Link
              href="/home"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#4b51f1] text-white text-sm font-semibold hover:bg-[#3b41d1] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f2f8]">
      <Navbar />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-violet-500/[0.04] blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
        <Link href="/home" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#4b51f1] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div ref={formRef}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#4b51f1]/10 flex items-center justify-center">
              <Car className="w-6 h-6 text-[#4b51f1]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Create a Ride</h1>
              <p className="text-sm text-slate-500">Share your trip and split costs</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
            {/* From */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Departure
              </label>
              <LocationAutocomplete
                value={from}
                onChange={setFrom}
                placeholder="Where are you leaving from?"
                icon="origin"
              />
            </div>

            {/* To */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> Destination
              </label>
              <LocationAutocomplete
                value={to}
                onChange={setTo}
                placeholder="Where are you going?"
                icon="destination"
              />
            </div>

            {/* Date & Time row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <CalendarDays className="w-3.5 h-3.5" /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl bg-white/60 border border-slate-200/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#4b51f1]/40 focus:ring-2 focus:ring-[#4b51f1]/10 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5" /> Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl bg-white/60 border border-slate-200/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#4b51f1]/40 focus:ring-2 focus:ring-[#4b51f1]/10 transition-all"
                />
              </div>
            </div>

            {/* Seats & Price row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <Users className="w-3.5 h-3.5" /> Seats Available
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full rounded-xl bg-white/60 border border-slate-200/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#4b51f1]/40 focus:ring-2 focus:ring-[#4b51f1]/10 transition-all placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <IndianRupee className="w-3.5 h-3.5" /> Price per Seat
                </label>
                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full rounded-xl bg-white/60 border border-slate-200/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#4b51f1]/40 focus:ring-2 focus:ring-[#4b51f1]/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3 rounded-xl bg-[#4b51f1] text-white text-sm font-semibold 
                       hover:bg-[#3b41d1] disabled:opacity-40 disabled:cursor-not-allowed 
                       transition-all duration-200 shadow-lg shadow-[#4b51f1]/20"
            >
              Create Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
