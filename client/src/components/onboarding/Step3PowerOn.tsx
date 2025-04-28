import { useState, useEffect } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, ArrowRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Step3PowerOn() {
  const { goToNextStep } = useOnboarding();
  const [poweredOn, setPoweredOn] = useState(false);
  const [powerConfirmed, setPowerConfirmed] = useState(false);
  const [networkConnected, setNetworkConnected] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  const handlePowerOn = () => {
    setChecking(true);
    setPoweredOn(true);
    
    // Simulate power on check
    setTimeout(() => {
      setPowerConfirmed(true);
      setChecking(false);
    }, 2000);
  };

  const handleNetworkCheck = () => {
    setChecking(true);
    
    // Simulate network check
    setTimeout(() => {
      setNetworkConnected(true);
      setChecking(false);
      setCheckComplete(true);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Power On the Launch Monitor</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 3 of 9</span>
      </div>
      
      <p className="text-neutral-700 mb-6">
        Now that you've mounted and connected your launch monitor, it's time to power it on and verify that it's connected to your network.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/2">
          <div className="bg-neutral-100 rounded-lg p-6 h-64 relative">
            <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Ceiling with device */}
              <rect x="50" y="20" width="300" height="10" fill="#d1d5db" />
              <rect x="175" y="30" width="50" height="30" fill="#1a8754" rx="4" />
              
              {/* Power indicator */}
              <circle 
                cx="185" 
                cy="50" 
                r="5" 
                fill={poweredOn ? "#22c55e" : "#9ca3af"}
                className={cn(poweredOn && "animate-pulse")}
              />
              
              {/* Network indicator */}
              <circle 
                cx="200" 
                cy="50" 
                r="5" 
                fill={networkConnected ? "#3b82f6" : "#9ca3af"}
                className={cn(networkConnected && "animate-pulse")}
              />
              
              {/* Status indicator */}
              <circle 
                cx="215" 
                cy="50" 
                r="5" 
                fill={checkComplete ? "#22c55e" : "#9ca3af"}
                className={cn(checkComplete && "animate-pulse")}
              />
              
              {/* Indicator labels */}
              <text x="185" y="70" fontFamily="sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">Power</text>
              <text x="200" y="70" fontFamily="sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">Network</text>
              <text x="215" y="70" fontFamily="sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">Status</text>
              
              {/* Power button */}
              <rect 
                x="170" 
                y="100" 
                width="60" 
                height="30" 
                rx="15" 
                fill={poweredOn ? "#1a8754" : "#4b5563"}
                className="cursor-pointer"
                onClick={() => !poweredOn && handlePowerOn()}
              />
              <text x="200" y="120" fontFamily="sans-serif" fontSize="12" fill="white" textAnchor="middle">POWER</text>
              
              {/* Power cable */}
              <path d="M175,45 C150,45 130,60 130,100 C130,130 130,160 130,180" stroke="#4b5563" strokeWidth="3" fill="none" />
              
              {/* Ethernet cable */}
              <path d="M225,45 C250,45 270,60 270,100 C270,130 270,160 270,180" stroke="#60a5fa" strokeWidth="3" fill="none" />
            </svg>
            
            {checking && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full mb-3"
                  />
                  <p className="text-sm text-neutral-700">
                    {poweredOn && !powerConfirmed ? "Verifying power..." : "Checking network connection..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h4 className="font-medium mb-4">Activation Steps:</h4>
          
          <div className="space-y-4 mb-6">
            <div className={cn(
              "p-3 rounded-lg border",
              poweredOn 
                ? "bg-green-50 border-green-200"
                : "bg-neutral-50 border-neutral-200"
            )}>
              <div className="flex items-start">
                <div className={cn(
                  "h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3",
                  poweredOn ? "bg-green-100" : "bg-neutral-200"
                )}>
                  {poweredOn ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-sm text-neutral-600">1</span>
                  )}
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Power on the device</h5>
                  <p className="text-xs text-neutral-600">
                    Press the power button on the device or plug it into a power outlet.
                  </p>
                </div>
              </div>
              {!poweredOn && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 ml-9"
                  onClick={handlePowerOn}
                  disabled={checking}
                >
                  Power On
                </Button>
              )}
            </div>
            
            <div className={cn(
              "p-3 rounded-lg border",
              networkConnected 
                ? "bg-green-50 border-green-200"
                : powerConfirmed 
                  ? "bg-neutral-50 border-neutral-200" 
                  : "bg-neutral-50 border-neutral-200 opacity-50"
            )}>
              <div className="flex items-start">
                <div className={cn(
                  "h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3",
                  networkConnected 
                    ? "bg-green-100" 
                    : "bg-neutral-200"
                )}>
                  {networkConnected ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-sm text-neutral-600">2</span>
                  )}
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Verify network connection</h5>
                  <p className="text-xs text-neutral-600">
                    Check that the network indicator light is blue, showing an active connection.
                  </p>
                </div>
              </div>
              {powerConfirmed && !networkConnected && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 ml-9"
                  onClick={handleNetworkCheck}
                  disabled={checking}
                >
                  Check Connection
                </Button>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {checkComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant="success" className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle>Device activated successfully</AlertTitle>
                  <AlertDescription>
                    Your GolfTrackPro launch monitor is powered on and connected to your network.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {powerConfirmed && !networkConnected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant="default" className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Power confirmed</AlertTitle>
                  <AlertDescription>
                    Your device is powered on. Now let's check the network connection.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {!powerConfirmed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant="default" className="bg-neutral-50">
                  <AlertCircle className="h-4 w-4 text-neutral-600" />
                  <AlertTitle>Checking indicators</AlertTitle>
                  <AlertDescription>
                    Look for the following LED lights on your device:
                    <ul className="list-disc pl-5 mt-2 text-xs space-y-1">
                      <li><span className="text-green-600 font-medium">Green</span>: Power indicator</li>
                      <li><span className="text-blue-600 font-medium">Blue</span>: Network connection</li>
                      <li><span className="text-green-600 font-medium">Green</span>: Status (ready)</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={goToNextStep} 
          className="bg-primary hover:bg-primary/90 text-white flex items-center"
          disabled={!checkComplete}
        >
          Continue to Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
