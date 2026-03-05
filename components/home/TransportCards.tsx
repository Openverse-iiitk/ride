"use client"

import { useRef, useEffect } from "react"
import { Plane, TrainFront, Bus, ArrowRight } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"

const TRANSPORT = [
  {
    title: "Flights",
    desc: "Compare & book flights",
    icon: Plane,
    href: "/flights",
    gradient: "from-sky-400/20 to-blue-500/20",
    iconColor: "text-sky-500",
    hoverBorder: "hover:ring-sky-400/30",
  },
  {
    title: "Trains",
    desc: "Rail routes & schedules",
    icon: TrainFront,
    href: "/trains",
    gradient: "from-emerald-400/20 to-green-500/20",
    iconColor: "text-emerald-500",
    hoverBorder: "hover:ring-emerald-400/30",
  },
  {
    title: "Buses",
    desc: "Affordable bus travel",
    icon: Bus,
    href: "/buses",
    gradient: "from-amber-400/20 to-orange-500/20",
    iconColor: "text-amber-500",
    hoverBorder: "hover:ring-amber-400/30",
  },
]

export function TransportCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll("[data-transport-card]")
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      )
    }
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-4">
      {TRANSPORT.map((t) => (
        <Link
          key={t.title}
          href={t.href}
          data-transport-card
          className={`
            glass-card rounded-2xl p-6 group transition-all duration-300
            hover:translate-y-[-4px] hover:shadow-xl
            ring-1 ring-transparent ${t.hoverBorder}
          `}
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-4`}>
            <t.icon className={`w-6 h-6 ${t.iconColor}`} />
          </div>
          <h3 className="text-slate-800 font-bold text-lg">{t.title}</h3>
          <p className="text-slate-500 text-sm mt-1">{t.desc}</p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#4b51f1] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      ))}
    </div>
  )
}
