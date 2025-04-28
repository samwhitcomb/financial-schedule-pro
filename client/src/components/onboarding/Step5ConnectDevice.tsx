import { useState, useEffect } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, WifiOff, Wifi, RefreshCw } from "lucide-react";
import { ConnectionModal } from "@/components/modals/ConnectionModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Step5ConnectDevice() {
  const { goToNextStep } = useOnboarding();
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [searchingDevices, setSearchingDevices] = useState(false);
  const [foundDevices, setFoundDevices] = useState<string[]>([]);

  // Simulate device scanning
  const scanForDevices = () => {
    setSearchingDevices(true);
    setFoundDevices([]);
    
    setTimeout(() => {
      setFoundDevices(["CLM-PRO-A7F9", "CLM-PRO-B123"]);
      setSearchingDevices(false);
    }, 3000);
  };

  const handleConnectionComplete = () => {
    setShowConnectionModal(false);
    setDeviceConnected(true);
  };

  const handleConnect = (deviceId: string) => {
    setShowConnectionModal(true);
  };

  useEffect(() => {
    // Auto scan for devices when component mounts
    scanForDevices();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Connect the App to the Launch Monitor</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 5 of 9</span>
      </div>
      
      {deviceConnected ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Device Connected Successfully</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your CLM PRO launch monitor is now connected to the app. You can now proceed to the next step.
          </p>
          
          <div className="bg-neutral-100 p-4 rounded-lg max-w-md">
            <div className="flex items-start mb-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                <Wifi className="h-3 w-3 text-white" />
              </div>
              <div>
                <h5 className="font-medium">CLM-PRO-A7F9</h5>
                <p className="text-xs text-neutral-500">Connected via Ethernet</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-600">
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">Online</span>
              <span>Firmware: v2.1.3</span>
              <span>Signal: Excellent</span>
            </div>
          </div>
          
          <Button
            onClick={goToNextStep}
            className="bg-primary hover:bg-primary/90 text-white mt-8"
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <p className="text-neutral-700 mb-6">
            Let's connect your device to the app. Make sure your launch monitor is powered on and connected to your network via Ethernet.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <div className="bg-neutral-100 rounded-lg p-6 relative overflow-hidden">
                <h4 className="font-medium mb-4 flex items-center">
                  <Wifi className="mr-2 h-5 w-5 text-primary" />
                  Available Devices
                </h4>
                
                {searchingDevices ? (
                  <div className="flex flex-col items-center justify-center p-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-12 w-12 mb-4"
                    >
                      <RefreshCw className="h-12 w-12 text-primary opacity-70" />
                    </motion.div>
                    <p className="text-neutral-600">Scanning for devices...</p>
                  </div>
                ) : foundDevices.length > 0 ? (
                  <div className="space-y-4">
                    {foundDevices.map((device, index) => (
                      <motion.div
                        key={device}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white p-4 rounded-lg border border-neutral-200 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "w-3 h-3 rounded-full mr-3",
                            "bg-green-500 animate-pulse"
                          )} />
                          <div>
                            <p className="font-medium">{device}</p>
                            <p className="text-xs text-neutral-500">Ready to connect</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90 text-white"
                          onClick={() => handleConnect(device)}
                        >
                          Connect
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-10 bg-neutral-50 border border-dashed border-neutral-300 rounded-lg">
                    <WifiOff className="h-12 w-12 text-neutral-400 mb-3" />
                    <h5 className="font-medium mb-1 text-neutral-700">No Devices Found</h5>
                    <p className="text-center text-neutral-500 text-sm mb-4">
                      We couldn't find any GolfTrackPro devices on your network.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={scanForDevices}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Scan Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h4 className="font-medium mb-3">Connection Tips:</h4>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    Ensure the device's power indicator is lit (green).
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    Verify the Ethernet cable is securely connected to both the device and your router.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    Make sure your phone/computer is on the same network as the device.
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-medium mb-2 text-blue-800">Troubleshooting:</h5>
                <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
                  <li>Try restarting your device and router</li>
                  <li>Check if your network firewall is blocking the connection</li>
                  <li>Ensure the device has the latest firmware</li>
                  <li>Position your router closer to the device if possible</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline"
              onClick={scanForDevices}
              disabled={searchingDevices}
              className="flex items-center"
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", searchingDevices && "animate-spin")} />
              {searchingDevices ? "Scanning..." : "Scan Again"}
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-neutral-700"
              onClick={goToNextStep}
            >
              Skip for Now
            </Button>
          </div>
        </>
      )}

      {showConnectionModal && (
        <ConnectionModal
          onClose={() => setShowConnectionModal(false)}
          onComplete={handleConnectionComplete}
          deviceName="GolfTrackPro-A7F9"
        />
      )}
    </div>
  );
}
