import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

export default function NoteCard({ note }) {
  return (
    <div className="bg-white rounded-xl border border-edge-muted shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col overflow-hidden group animate-fade-in-up">
      <div className="h-48 overflow-hidden bg-surface-subtle relative">
        <img
          src={`https://picsum.photos/seed/${note.id + 50}/400/250`}
          alt="Field location"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>LOG #{note.id}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-heading mb-3 leading-snug capitalize line-clamp-2">
          {note.title}
        </h3>
        <p className="text-muted text-sm mb-4 flex-grow line-clamp-3">
          {note.body}
        </p>
        <span className="text-link text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
          Read Report <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  )
}
