import React from 'react'
import { Radio, Wind, Droplets, Sun, Cloud, CloudRain, Activity, AlertCircle } from 'lucide-react'

function getWeatherInfo(code) {
  if (code <= 3) return { Icon: Sun, label: 'Clear/Cloudy' }
  if (code <= 48) return { Icon: Cloud, label: 'Foggy' }
  if (code <= 67) return { Icon: CloudRain, label: 'Rainy' }
  if (code <= 86) return { Icon: Cloud, label: 'Snowy' }
  return { Icon: Activity, label: 'Unknown' }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-center space-x-2 text-slate-400 font-mono text-sm animate-pulse">
        <span>Connecting to Station</span>
        <span>...</span>
      </div>
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 w-1/2 animate-indeterminate-bar"></div>
      </div>
    </div>
  )
}

export default function WeatherCard({ weather, loading }) {
  const info = weather
    ? getWeatherInfo(weather.weather_code)
    : { Icon: Activity, label: '...' }

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-700 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-emerald-400">
          <Radio className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-bold tracking-wider uppercase">
            Wolong Reserve
          </span>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : !weather ? (
        <div className="text-center py-4 text-slate-400 text-sm">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
          <p>No weather data</p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-slate-400 text-xs uppercase mb-1">Temperature</p>
              <div className="text-4xl font-light tracking-tight">
                {Math.round(weather.temperature_2m)}
                <span className="text-2xl text-slate-400">°C</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <info.Icon className="w-8 h-8 text-emerald-400 mb-1" />
              <div className="text-lg font-medium text-emerald-100">{info.label}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-slate-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase">Wind</span>
                <span className="text-sm font-semibold">{weather.wind_speed_10m} m/s</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-slate-500" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase">Humidity</span>
                <span className="text-sm font-semibold">{weather.relative_humidity_2m}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
