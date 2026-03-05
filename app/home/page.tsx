"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/home/Navbar"
import { SearchBar } from "@/components/home/SearchBar"
import { RideResults } from "@/components/home/RideResults"
import { TransportCards } from "@/components/home/TransportCards"
import { MOCK_RIDES } from "@/lib/data"
import type { Ride } from "@/components/home/RideCard"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const [searchActive, setSearchActive] = useState(false)
  const [filteredRides, setFilteredRides] = useState<Ride[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Smooth scroll sections on page load
    const ctx = gsap.context(() => {
      sectionRefs.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el!,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el!,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const handleSearch = (from: string, to: string, _date: Date | null) => {
    setSearchActive(true)

    const query = to.toLowerCase().trim()
    if (!query) {
      setFilteredRides(MOCK_RIDES as Ride[])
      return
    }

    const results = MOCK_RIDES.filter(
      (r) =>
        r.to.toLowerCase().includes(query) ||
        r.from.toLowerCase().includes(query)
    )
    setFilteredRides(results as Ride[])
  }

  return (
    <div ref={mainRef} className="home-page min-h-screen bg-[#f0f2f8]">
      <Navbar />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-[#4b51f1]/[0.04] blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-sky-400/[0.04] blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-violet-400/[0.03] blur-[80px]" />
      </div>

      {/* Hero */}
      <div ref={heroRef} className="pt-28 pb-14 sm:pt-32 sm:pb-20">
        <div className="text-center mb-8 sm:mb-10 px-4">
          <h1
            className="text-[#4b51f1] text-5xl sm:text-6xl md:text-7xl leading-none mb-3 select-none"
            style={{ fontFamily: "'Krisha', sans-serif" }}
          >
            ride.
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            Find travel partners from IIIT Kottayam. Split costs, share the journey.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} onDropdownToggle={setDropdownOpen} />
      </div>

      {/* Search Results */}
      <div className={dropdownOpen ? "mt-48 sm:mt-64" : "mt-8"}>
        <RideResults
          rides={searchActive ? filteredRides : (MOCK_RIDES.filter((r) => r.isPopular) as Ride[])}
          searchActive={searchActive}
        />
      </div>

      {/* Transport Options */}
      <div
        ref={(el) => { sectionRefs.current[0] = el }}
        className="py-12 sm:py-16"
      >
        <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Explore Other Options
        </h2>
        <TransportCards />
      </div>

      {/* Footer spacer */}
      <div className="h-20" />

      {/* Version badge */}
      <div className="fixed bottom-4 right-4 z-50 glass-badge px-3 py-1.5 rounded-lg">
        <span
          className="text-[10px] text-slate-400 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-geist-mono), 'Courier New', monospace" }}
        >
          v0.1.0
        </span>
      </div>
    </div>
  )
}
