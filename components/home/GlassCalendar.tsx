"use client"

import { useEffect, useRef, useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import gsap from "gsap"

interface GlassCalendarProps {
  selectedDate: Date | null
  onSelect: (date: Date) => void
  onClose: () => void
  onOpenChange?: (open: boolean) => void
}

export function GlassCalendar({ selectedDate, onSelect, onClose, onOpenChange }: GlassCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
  const calRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (calRef.current) {
      gsap.fromTo(
        calRef.current,
        { opacity: 0, y: 12, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      )
    }
  }, [])

  useEffect(() => {
    if (gridRef.current) {
      const cells = gridRef.current.querySelectorAll("[data-day]")
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: { each: 0.012, from: "start" },
          ease: "back.out(1.4)",
        }
      )
    }
  }, [currentMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: calStart, end: calEnd })
  const today = startOfDay(new Date())

  const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNext = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleSelect = (day: Date) => {
    if (isBefore(day, today)) return
    onSelect(day)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[999]" onClick={onClose} />
      <div
        ref={calRef}
        className="absolute top-full left-0 mt-2 z-[1000] glass-calendar rounded-2xl p-4 shadow-2xl min-w-[280px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <span className="text-sm font-semibold text-slate-800 tracking-wide">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div
              key={d}
              className="text-[10px] font-medium text-slate-500 text-center py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div ref={gridRef} className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const inMonth = isSameMonth(day, currentMonth)
            const selected = selectedDate && isSameDay(day, selectedDate)
            const isPast = isBefore(day, today)
            const todayMark = isToday(day)

            return (
              <button
                key={idx}
                data-day
                disabled={isPast}
                onClick={() => handleSelect(day)}
                className={`
                  relative w-8 h-8 rounded-xl text-xs font-medium transition-all duration-200
                  ${!inMonth ? "text-slate-300" : "text-slate-700"}
                  ${isPast ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-white/30 hover:scale-110"}
                  ${selected ? "!bg-[#4b51f1] !text-white shadow-lg shadow-[#4b51f1]/30 scale-110" : ""}
                  ${todayMark && !selected ? "ring-1 ring-[#4b51f1]/40" : ""}
                `}
              >
                {format(day, "d")}
                {todayMark && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4b51f1]" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
