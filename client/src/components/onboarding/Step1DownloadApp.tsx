import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountModal } from "@/components/modals/AccountModal";
import { 
  Bolt, 
  Wifi, 
  PlugZap, 
  Ruler, 
  Drill, 
  Club,
  ArrowRight,
  HardHat,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowDown,
  Scale
} from "lucide-react";
import { motion } from "framer-motion";

export function Step1PhysicalInstallation() {
  const { goToNextStep } = useOnboarding();
  const [installationReviewed, setInstallationReviewed] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleContinue = () => {
    setShowAccountModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Physical Installation Guide</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 1 of 9</span>
      </div>
      
      <p className="text-neutral-700 mb-6">
        Before proceeding with the digital setup, please ensure your GolfTrackPro launch monitor is physically installed. 
        Review the installation guide below or refer to the printed manual that came with your device.
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-amber-800 mb-1">Already Installed?</h5>
            <p className="text-sm text-amber-700">
              If you've already physically installed your GolfTrackPro device, you can check the box below and continue to the next step.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">Installation Requirements:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Bolt className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Mounting hardware (included)</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Wifi className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Internet connection</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <PlugZap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Power outlet nearby</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Ruler className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Tape measure</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Drill className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Drill & level</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <HardHat className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Safety equipment</span>
          </motion.div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">Installation Steps:</h4>
        <div className="space-y-4">
          <div className="flex items-start bg-white border rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
              1
            </div>
            <div>
              <h5 className="font-medium mb-1">Identify the Optimal Location</h5>
              <p className="text-sm text-neutral-600 mb-2">
                Mount the device directly above your hitting area. The ideal height is 8-10 feet from the ground, 
                with a clear view of your hitting zone.
              </p>
              <div className="flex items-center text-sm text-primary">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Ensure there are no obstructions between the device and your hitting area</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start bg-white border rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
              2
            </div>
            <div>
              <h5 className="font-medium mb-1">Prepare the Mounting Bracket</h5>
              <p className="text-sm text-neutral-600 mb-2">
                Attach the mounting bracket to the ceiling using the provided screws. Make sure it's level and secure.
              </p>
              <div className="flex items-center text-sm text-amber-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Use appropriate anchors for your ceiling type (drywall, concrete, etc.)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start bg-white border rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
              3
            </div>
            <div>
              <h5 className="font-medium mb-1">Attach the Launch Monitor</h5>
              <p className="text-sm text-neutral-600 mb-2">
                Slide the GolfTrackPro device onto the mounting bracket until it clicks into place. 
                The front of the device (with the logo) should face your hitting area.
              </p>
            </div>
          </div>
          
          <div className="flex items-start bg-white border rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
              4
            </div>
            <div>
              <h5 className="font-medium mb-1">Connect Power</h5>
              <p className="text-sm text-neutral-600 mb-2">
                Connect the power adapter to the device and plug it into a nearby outlet. 
                Route the cable along the ceiling to keep it neat and out of the way.
              </p>
              <div className="flex items-center text-sm text-primary">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>The power indicator light should turn on when connected properly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-neutral-100 rounded-lg overflow-hidden h-64">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 800 300" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="800" height="300" fill="#f8f9fa" />
            <rect x="200" y="50" width="400" height="30" fill="#d1d5db" />
            <rect x="280" y="80" width="240" height="160" fill="#e5e7eb" rx="8" />
            <circle cx="400" cy="160" r="40" fill="#1a8754" opacity="0.8" />
            <path d="M400,130 L400,190" stroke="#fff" strokeWidth="2" />
            <path d="M370,160 L430,160" stroke="#fff" strokeWidth="2" />
            <line x1="310" y1="80" x2="310" y2="240" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="490" y1="80" x2="490" y2="240" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="400" y1="50" x2="400" y2="80" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
            <text x="400" y="270" fontFamily="sans-serif" fontSize="14" fill="#6b7280" textAnchor="middle">Ceiling mounted golf launch monitor</text>
            
            {/* Add dimensions */}
            <line x1="200" y1="260" x2="600" y2="260" stroke="#4b5563" strokeWidth="1" />
            <path d="M200,255 L200,265" stroke="#4b5563" strokeWidth="1" />
            <path d="M600,255 L600,265" stroke="#4b5563" strokeWidth="1" />
            <text x="400" y="280" fontFamily="sans-serif" fontSize="12" fill="#4b5563" textAnchor="middle">3-4 feet wide</text>
            
            <line x1="610" y1="80" x2="610" y2="240" stroke="#4b5563" strokeWidth="1" />
            <path d="M605,80 L615,80" stroke="#4b5563" strokeWidth="1" />
            <path d="M605,240 L615,240" stroke="#4b5563" strokeWidth="1" />
            <text x="630" y="160" fontFamily="sans-serif" fontSize="12" fill="#4b5563" textAnchor="middle" transform="rotate(90, 630, 160)">8-10 feet height</text>
            
            {/* Add golfer silhouette */}
            <path d="M390,290 C390,290 385,280 385,275 C385,270 387,265 390,260 C393,255 395,245 395,240 L405,240 C405,245 407,255 410,260 C413,265 415,270 415,275 C415,280 410,290 410,290" fill="#9ca3af" />
            <circle cx="400" cy="230" r="10" fill="#9ca3af" />
          </svg>
        </div>
      </div>
      
      <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200 mb-8">
        <h5 className="font-medium flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Additional Resources</span>
        </h5>
        <ul className="text-sm text-neutral-600 space-y-2">
          <li className="flex items-center gap-2">
            <ArrowDown className="h-4 w-4 text-primary" />
            <a href="#" className="text-primary underline">Download Detailed Installation Guide (PDF)</a>
          </li>
          <li className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            <a href="#" className="text-primary underline">Mounting Surface Requirements</a>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-neutral-600 text-sm">
          <label className="flex items-center" htmlFor="installation-reviewed">
            <Checkbox 
              id="installation-reviewed" 
              checked={installationReviewed}
              onCheckedChange={(checked) => setInstallationReviewed(!!checked)}
              className="mr-2 h-4 w-4"
            />
            <span>I've installed my device or will skip this step</span>
          </label>
        </div>
        <Button 
          onClick={handleContinue} 
          className="bg-primary hover:bg-primary/90 text-white transition flex items-center"
          disabled={!installationReviewed}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {showAccountModal && (
        <AccountModal 
          onClose={() => setShowAccountModal(false)} 
          onComplete={goToNextStep}
        />
      )}
    </div>
  );
}
