"use client"

import { useRef, useEffect } from "react"
import { MapPin, Clock, ArrowRight, Users } from "lucide-react"
import gsap from "gsap"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { BorderBeam } from "@/components/ui/border-beam"

export interface Ride {
  id: string
  from: string
  to: string
  date: string
  time: string
  driver: string
  seats: number
  seatsAvailable: number
  price: string
  riders: { imageUrl: string; profileUrl: string }[]
  isPopular?: boolean
}

interface RideCardProps {
  ride: Ride
  index: number
  featured?: boolean
}

export function RideCard({ ride, index, featured = false }: RideCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1 + 0.1,
          ease: "power3.out",
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`
        relative glass-card rounded-2xl p-5 transition-all duration-300
        hover:translate-y-[-2px] hover:shadow-xl cursor-pointer group
        ${featured ? "ring-1 ring-[#4b51f1]/20" : ""}
      `}
    >
      {featured && (
        <BorderBeam
          size={80}
          duration={8}
          colorFrom="#4b51f1"
          colorTo="#818cf8"
          borderWidth={2}
        />
      )}

      {ride.isPopular && (
        <span className="absolute -top-2 right-4 px-3 py-0.5 bg-[#4b51f1] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-md">
          Popular
        </span>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Route */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#4b51f1] shrink-0" />
            <span className="truncate text-sm">{ride.from}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-sm">{ride.to}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {ride.date} • {ride.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {ride.seatsAvailable}/{ride.seats} seats
            </span>
          </div>
        </div>

        {/* Riders */}
        <div className="flex items-center gap-3">
          {ride.riders.length > 0 && (
            <AvatarCircles
              avatarUrls={ride.riders}
              numPeople={ride.riders.length > 3 ? ride.riders.length - 3 : 0}
              className="scale-[0.85]"
            />
          )}
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <div className="text-lg font-bold text-[#4b51f1]">{ride.price}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">per seat</div>
        </div>
      </div>

      {/* Driver */}
      <div className="mt-3 pt-3 border-t border-slate-200/40 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Hosted by <strong className="text-slate-700">{ride.driver}</strong>
        </span>
        <span className="text-xs text-[#4b51f1] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View details →
        </span>
      </div>
    </div>
  )
}
