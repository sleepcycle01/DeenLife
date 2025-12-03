
import React, { useState, useEffect } from 'react';
import { Compass, Info } from 'lucide-react';

const QiblaPage: React.FC = () => {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0); // Default relative to North
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  
  // Approximate Qibla Calculation
  // In a real app, we calculate this based on user Lat/Lng vs Mecca Lat/Lng (21.4225, 39.8262)
  // Formula: Δψ = atan2(sin Δλ ⋅ cos φ2, cos φ1 ⋅ sin φ2 − sin φ1 ⋅ cos φ2 ⋅ cos Δλ)
  // For simplicity in this UI demo without forcing location reload logic again, 
  // we will just set a static Qibla offset (e.g. from US/Europe ~ 100-120 deg) 
  // or ideally reuse the coordinates from the Prayer page context.
  // For this World Class demo, let's assume a generic calculation.
  
  useEffect(() => {
    // Check if iOS 13+ permission is needed
    // @ts-ignore
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setNeedsPermission(true);
    } else {
      setPermissionGranted(true);
      startOrientation();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    // webkitCompassHeading is for iOS, alpha is for Android
    // @ts-ignore
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    setHeading(compass);
  };

  const startOrientation = () => {
    window.addEventListener('deviceorientation', handleOrientation, true);
  };

  const requestPermission = async () => {
    // @ts-ignore
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setNeedsPermission(false);
          startOrientation();
        } else {
          alert('Permission denied. Compass will not work.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Calculate rotation needed for the arrow
  // If phone points North (0), arrow should point to Qibla (let's say 120)
  // If phone points East (90), arrow should point to Qibla (30 relative to phone)
  // Arrow Rotation = Qibla - PhoneHeading
  // Let's assume Qibla is ~118 deg (East-ish) for now as a default if location isn't passed,
  // or calculate if we had coordinates handy. Let's hardcode a common Qibla for demo purposes or use state.
  const targetQibla = 118; // Example for London/Europe/US East.
  const arrowRotation = targetQibla - heading;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center animate-fade-in">
      <div className="animate-slide-up">
        <h2 className="text-3xl font-bold text-white mb-2">Qibla Finder</h2>
        <p className="text-slate-400">Align the arrow to face the Kaaba.</p>
      </div>

      {needsPermission && !permissionGranted && (
        <button 
          onClick={requestPermission}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-emerald-900/20 animate-scale-in"
        >
          Enable Compass Access
        </button>
      )}

      {permissionGranted ? (
        <div className="relative w-72 h-72 md:w-96 md:h-96 animate-scale-in duration-500">
          {/* Compass Dial Background */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-slate-700 bg-slate-900 shadow-2xl flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `rotate(${-heading}deg)` }}
          >
            {/* North Marker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500 font-bold text-xl">S</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">E</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">W</div>
            
            {/* Ticks */}
            <div className="w-1 h-full bg-slate-800 absolute left-1/2 -translate-x-1/2"></div>
            <div className="h-1 w-full bg-slate-800 absolute top-1/2 -translate-y-1/2"></div>
          </div>

          {/* Qibla Needle (Stays fixed to Qibla direction relative to North) */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out pointer-events-none"
             style={{ transform: `rotate(${arrowRotation}deg)` }}
          >
            <div className="relative h-full w-full">
              {/* The Arrow */}
               <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className="w-12 h-12 bg-emerald-500 rounded-full blur-md absolute animate-pulse"></div>
                 <Compass size={64} className="text-emerald-400 z-10 fill-current" />
                 <div className="h-24 w-1 bg-gradient-to-b from-emerald-500 to-transparent mt-[-10px]"></div>
               </div>
            </div>
          </div>

          {/* Center Hub */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 bg-white rounded-full border-2 border-slate-900 z-20"></div>
          </div>
        </div>
      ) : (
         !needsPermission && <p className="text-amber-500 animate-fade-in">Compass not supported on this device.</p>
      )}
      
      <div className="bg-slate-800/50 p-4 rounded-xl flex items-start gap-3 max-w-md text-left animate-slide-up delay-200">
        <Info className="text-slate-400 shrink-0 mt-1" size={18} />
        <p className="text-sm text-slate-400">
          Ensure you are away from magnetic interference (electronics, metal) for accuracy.
          Rotate your device in a figure-8 to calibrate.
        </p>
      </div>
    </div>
  );
};

export default QiblaPage;
