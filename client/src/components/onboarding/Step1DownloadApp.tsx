import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QRCode } from "@/components/ui/qr-code";
import { AccountModal } from "@/components/modals/AccountModal";
import { 
  Bolt, 
  Wifi, 
  PlugZap, 
  Ruler, 
  Drill, 
  Club,
  ArrowRight,
  Apple,
  Play
} from "lucide-react";
import { motion } from "framer-motion";

export function Step1DownloadApp() {
  const { goToNextStep } = useOnboarding();
  const [appDownloaded, setAppDownloaded] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleContinue = () => {
    setShowAccountModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Download the Companion App</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 1 of 9</span>
      </div>
      
      <p className="text-neutral-700 mb-8">
        Scan the QR code below or search for "GolfTrackPro" in your app store to download the companion app that will guide you through setup.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8">
        <div className="w-full md:w-1/2">
          <div className="bg-white border border-neutral-300 rounded-lg p-4 flex flex-col items-center">
            <div className="mb-4 w-40 h-40 flex items-center justify-center">
              <QRCode value="https://golftrackpro.com/download" size={128} />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="bg-black text-white hover:bg-black/90 flex items-center gap-2">
                <Apple className="h-5 w-5" />
                <span className="text-sm">App Store</span>
              </Button>
              <Button variant="outline" className="bg-neutral-700 text-white hover:bg-neutral-600 flex items-center gap-2">
                <Play className="h-5 w-5" />
                <span className="text-sm">Google Play</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h4 className="font-medium mb-3">Compatible Devices:</h4>
          <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-2">
            <li>iOS 14.0 or later (iPhone, iPad)</li>
            <li>Android 8.0 or later</li>
            <li>Windows 10 PC or laptop</li>
            <li>macOS 10.15 or later</li>
          </ul>
          
          <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200">
            <h5 className="font-medium flex items-center gap-1 mb-2">
              <span className="text-primary">i</span>
              <span>After Installation</span>
            </h5>
            <p className="text-sm text-neutral-600">Open the app to continue with the setup process. The app will guide you through the remaining steps.</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">What You'll Need:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Bolt className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Mounting hardware</span>
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
            <span className="text-sm">Power outlet</span>
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
            <span className="text-sm">Drill (optional)</span>
          </motion.div>
          <motion.div 
            className="bg-neutral-100 p-3 rounded-lg flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Club className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Golf club & balls</span>
          </motion.div>
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
          </svg>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-neutral-600 text-sm">
          <label className="flex items-center" htmlFor="app-downloaded">
            <Checkbox 
              id="app-downloaded" 
              checked={appDownloaded}
              onCheckedChange={(checked) => setAppDownloaded(!!checked)}
              className="mr-2 h-4 w-4"
            />
            <span>I've downloaded the app</span>
          </label>
        </div>
        <Button 
          onClick={handleContinue} 
          className="bg-primary hover:bg-primary/90 text-white transition flex items-center"
          disabled={!appDownloaded}
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
