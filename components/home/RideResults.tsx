"use client"

import { useRef, useEffect } from "react"
import { Plus } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import { RideCard, type Ride } from "./RideCard"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

interface RideResultsProps {
  rides: Ride[]
  searchActive: boolean
}

export function RideResults({ rides, searchActive }: RideResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const restRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && searchActive) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
    }
  }, [searchActive, rides])

  if (rides.length === 0 && !searchActive) return null

  const topRides = rides.slice(0, 3)
  const restRides = rides.slice(3)

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 mt-8">
      {rides.length === 0 && searchActive && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-slate-500 text-sm">No rides found for this route.</p>
          <p className="text-slate-400 text-xs mt-1">Try a different destination or date.</p>
        </div>
      )}

      {/* Top 3 results */}
      {topRides.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 pl-1">
            {searchActive ? "Best Matches" : "Popular Rides"}
          </h3>
          {topRides.map((ride, i) => (
            <RideCard key={ride.id} ride={ride} index={i} featured={i === 0} />
          ))}
        </div>
      )}

      {/* Add your own ride CTA */}
      {rides.length > 0 && (
        <div className="my-6">
          <Link href="/create-ride" className="w-full glass-card rounded-2xl p-4 flex items-center justify-center gap-3 
                           border-2 border-dashed border-[#4b51f1]/20 hover:border-[#4b51f1]/40 
                           transition-all duration-300 group hover:shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#4b51f1]/10 flex items-center justify-center 
                          group-hover:bg-[#4b51f1]/20 transition-colors">
              <Plus className="w-5 h-5 text-[#4b51f1]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-700">Add Your Own Ride</p>
              <p className="text-xs text-slate-400">Share your trip and split costs</p>
            </div>
          </Link>
        </div>
      )}

      {/* Rest of results with progressive blur */}
      {restRides.length > 0 && (
        <div ref={restRef} className="relative">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 pl-1">
            More Rides
          </h3>
          <div className="relative">
            <div className="space-y-3">
              {restRides.map((ride, i) => (
                <RideCard key={ride.id} ride={ride} index={i + 3} />
              ))}
            </div>
            {restRides.length > 2 && (
              <ProgressiveBlur
                position="bottom"
                height="40%"
                blurLevels={[0, 0.5, 1, 2, 4, 8]}
                className="pointer-events-none"
              />
            )}
          </div>
          {restRides.length > 2 && (
            <button className="relative z-20 mx-auto block mt-2 text-sm font-medium text-[#4b51f1] hover:underline">
              Show all {rides.length} rides
            </button>
          )}
        </div>
      )}
    </div>
  )
}
