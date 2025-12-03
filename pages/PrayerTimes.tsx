
import React, { useEffect, useState, useCallback } from 'react';
import { PrayerTimes as AdhanPrayerTimes, Coordinates, CalculationMethod, Madhab } from 'adhan';
import { format } from 'date-fns';
import { RefreshCw, AlertCircle, MapPin } from 'lucide-react';
import { DEFAULT_COORDINATES } from '../constants';

const PrayerTimesPage: React.FC = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<AdhanPrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("Initializing...");

  // Geolocation options
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  const calculateTimes = useCallback((coordinates: Coordinates) => {
    try {
      const date = new Date();
      // Use Muslim World League as default calculation method
      const params = CalculationMethod.MuslimWorldLeague();
      
      // Fix: Explicitly use integer 1 for Shafi if enum access fails in certain bundlers
      // Madhab.Shafi = 1, Madhab.Hanafi = 2
      params.madhab = (Madhab && Madhab.Shafi) ? Madhab.Shafi : 1; 
      
      const pt = new AdhanPrayerTimes(coordinates, date, params);
      
      // Verify calculation validity
      if (!pt.fajr || isNaN(pt.fajr.getTime())) {
        throw new Error("Invalid time calculation");
      }

      setPrayerTimes(pt);
      setError(null);
    } catch (e) {
      console.error("Error calculating times", e);
      setError("Failed to calculate prayer times. Please verify location settings.");
      setPrayerTimes(null);
    }
  }, []);

  const handleGeoSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const newCoords = new Coordinates(latitude, longitude);
    setCoords(newCoords);
    setLocationStatus("Location Acquired");
    calculateTimes(newCoords);
    setLoading(false);
  };

  const handleGeoError = (err: GeolocationPositionError) => {
    console.warn("Geolocation error:", err);
    let msg = "Location access denied.";
    if (err.code === err.TIMEOUT) msg = "Location request timed out.";
    if (err.code === err.POSITION_UNAVAILABLE) msg = "Location unavailable.";
    
    // Fallback to default but inform user
    setError(`${msg} Using default location (Mecca).`);
    const defCoords = new Coordinates(DEFAULT_COORDINATES.latitude, DEFAULT_COORDINATES.longitude);
    setCoords(defCoords);
    calculateTimes(defCoords);
    setLoading(false);
    setLocationStatus("Default Location");
  };

  const fetchLocation = () => {
    setLoading(true);
    setError(null);
    setLocationStatus("Locating...");
    
    if (!navigator.geolocation) {
      handleGeoError({ code: 2, message: "Geolocation not supported" } as GeolocationPositionError);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, geoOptions);
  };

  useEffect(() => {
    fetchLocation();
    
    // Update next prayer indicator every minute
    const timer = setInterval(() => {
      if (coords) calculateTimes(coords);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const PRAYER_NAMES = [
    { key: 'fajr', label: 'Fajr' },
    { key: 'sunrise', label: 'Sunrise' },
    { key: 'dhuhr', label: 'Dhuhr' },
    { key: 'asr', label: 'Asr' },
    { key: 'maghrib', label: 'Maghrib' },
    { key: 'isha', label: 'Isha' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-white">Prayer Times</h2>
          <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
            <MapPin size={12} /> {locationStatus}
          </p>
        </div>
        <button 
          onClick={fetchLocation} 
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition hover:rotate-180 duration-500"
          title="Refresh Location"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="bg-amber-900/30 border border-amber-600/30 p-4 rounded-lg flex items-center gap-3 text-amber-200 text-sm animate-fade-in">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {prayerTimes ? (
        <div className="grid gap-4">
           {PRAYER_NAMES.map((p, index) => {
             // @ts-ignore - Indexing the class instance safely
             const time = prayerTimes[p.key] as Date;
             const nextPrayer = prayerTimes.nextPrayer();
             const isNext = nextPrayer === p.key || (nextPrayer === 'none' && p.key === 'fajr'); // Simplified logic
             
             return (
               <div 
                key={p.key} 
                className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-300 animate-slide-up ${
                  isNext 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg scale-[1.02]' 
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
               >
                 <div className="flex items-center gap-4">
                   <div className={`w-2 h-10 rounded-full ${isNext ? 'bg-white' : 'bg-slate-700'}`}></div>
                   <span className="text-lg font-medium">{p.label}</span>
                   {isNext && <span className="text-xs bg-white/20 px-2 py-0.5 rounded ml-2 animate-pulse">Next</span>}
                 </div>
                 <span className="text-2xl font-bold font-mono">
                   {time ? format(time, 'h:mm a') : '--:--'}
                 </span>
               </div>
             );
           })}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500 flex flex-col items-center animate-pulse">
          <RefreshCw className="animate-spin mb-4 opacity-50" size={32} />
          <p>Calculating prayer times...</p>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-4 text-xs text-slate-500 text-center animate-fade-in delay-500">
        Calculation Method: Muslim World League • Madhab: Shafi
      </div>
    </div>
  );
};

export default PrayerTimesPage;
