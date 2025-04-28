import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export function Step2Installation() {
  const { goToNextStep } = useOnboarding();
  const [installStep, setInstallStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextInstallStep = () => {
    if (installStep < 3) {
      setInstallStep(installStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const totalSteps = 3;
  const progress = (installStep / totalSteps) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Physical Installation & Wiring</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 2 of 9</span>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Mounting</span>
          <span>Wiring</span>
          <span>Final Check</span>
        </div>
      </div>

      {/* Step 1: Mounting */}
      {installStep === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-full sm:w-1/2 h-52 bg-neutral-100 rounded-lg overflow-hidden">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 208" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ceiling */}
                <rect x="50" y="20" width="300" height="10" fill="#d1d5db" />
                
                {/* Device mounted to ceiling */}
                <rect x="175" y="30" width="50" height="30" fill="#1a8754" rx="4" />
                <circle cx="200" cy="50" r="8" fill="#0f5132" />
                
                {/* Mounting brackets */}
                <rect x="180" y="25" width="40" height="5" fill="#6b7280" />
                <line x1="185" y1="25" x2="185" y2="20" stroke="#6b7280" strokeWidth="2" />
                <line x1="215" y1="25" x2="215" y2="20" stroke="#6b7280" strokeWidth="2" />
                
                {/* Measuring lines */}
                <line x1="100" y1="60" x2="100" y2="180" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="300" y1="60" x2="300" y2="180" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="100" y1="180" x2="300" y2="180" stroke="#9ca3af" strokeWidth="1" />
                <text x="200" y="195" fontFamily="sans-serif" fontSize="12" fill="#6b7280" textAnchor="middle">Hitting area (7-10 feet below)</text>
              </svg>
            </div>
            <div className="w-full sm:w-1/2">
              <h4 className="font-medium mb-3">Mount the device to your ceiling:</h4>
              <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-2 text-sm">
                <li>Position 7-10 feet above hitting area</li>
                <li>Use included mounting bracket and screws</li>
                <li>Ensure stable mounting surface</li>
                <li>Level the device parallel to the floor</li>
              </ul>
              <div className="bg-amber-50 p-3 rounded-lg text-sm flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-amber-800">Professional installation recommended for ceiling heights over 12 feet.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Wiring */}
      {installStep === 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-full sm:w-1/2 h-52 bg-neutral-100 rounded-lg overflow-hidden">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 208" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ceiling */}
                <rect x="50" y="20" width="300" height="10" fill="#d1d5db" />
                
                {/* Device */}
                <rect x="175" y="30" width="50" height="30" fill="#1a8754" rx="4" />
                <circle cx="200" cy="50" r="8" fill="#0f5132" />
                
                {/* Power cable */}
                <path d="M175,45 C150,45 130,60 130,100 C130,130 130,160 130,180" stroke="#4b5563" strokeWidth="3" fill="none" />
                
                {/* Ethernet cable */}
                <path d="M225,45 C250,45 270,60 270,100 C270,130 270,160 270,180" stroke="#60a5fa" strokeWidth="3" fill="none" />
                
                {/* Labels */}
                <text x="140" y="160" fontFamily="sans-serif" fontSize="12" fill="#4b5563">Power</text>
                <text x="260" y="160" fontFamily="sans-serif" fontSize="12" fill="#3b82f6">Ethernet</text>
              </svg>
            </div>
            <div className="w-full sm:w-1/2">
              <h4 className="font-medium mb-3">Connect power and Ethernet:</h4>
              <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-2 text-sm">
                <li>Connect the power adapter to the device</li>
                <li>Plug power adapter into a nearby outlet</li>
                <li>Connect Ethernet cable to device</li>
                <li>Connect other end to your router or network switch</li>
              </ul>
              <div className="bg-blue-50 p-3 rounded-lg text-sm flex items-start">
                <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-blue-800">A wired Ethernet connection provides the most reliable performance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Final Check */}
      {installStep === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-full sm:w-1/2 h-52 bg-neutral-100 rounded-lg overflow-hidden">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 208" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ceiling with installed device */}
                <rect x="50" y="20" width="300" height="10" fill="#d1d5db" />
                <rect x="175" y="30" width="50" height="30" fill="#1a8754" rx="4" />
                <circle cx="200" cy="50" r="8" fill="#0f5132" />
                
                {/* Power and ethernet cables */}
                <path d="M175,45 C150,45 130,60 130,100 C130,130 130,160 130,180" stroke="#4b5563" strokeWidth="3" fill="none" />
                <path d="M225,45 C250,45 270,60 270,100 C270,130 270,160 270,180" stroke="#60a5fa" strokeWidth="3" fill="none" />
                
                {/* Checkmarks */}
                <circle cx="130" cy="100" r="15" fill="#1a8754" opacity="0.8" />
                <path d="M125,100 L130,105 L135,95" stroke="white" strokeWidth="2" fill="none" />
                
                <circle cx="270" cy="100" r="15" fill="#1a8754" opacity="0.8" />
                <path d="M265,100 L270,105 L275,95" stroke="white" strokeWidth="2" fill="none" />
                
                <circle cx="200" cy="40" r="15" fill="#1a8754" opacity="0.8" />
                <path d="M195,40 L200,45 L205,35" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="w-full sm:w-1/2">
              <h4 className="font-medium mb-3">Final Installation Check:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Device is securely mounted to ceiling</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Power cable is connected and plugged in</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Ethernet cable is connected to device and network</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>Device is positioned above hitting area</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>All cables are neatly secured</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        {!isCompleted ? (
          <Button 
            onClick={handleNextInstallStep} 
            className="bg-primary hover:bg-primary/90 text-white ml-auto flex items-center"
          >
            {installStep === 3 ? "Complete" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <>
            <div className="text-sm text-neutral-600 flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span>Installation completed successfully</span>
            </div>
            <Button 
              onClick={goToNextStep} 
              className="bg-primary hover:bg-primary/90 text-white flex items-center"
            >
              Continue to Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
