import { useState, useEffect } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Ruler, 
  Club, 
  Maximize,
  AlertCircle
} from "lucide-react";
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Step8Calibration() {
  const { goToNextStep } = useOnboarding();
  const [ceilingHeight, setCeilingHeight] = useState(9);
  const [calibrationStep, setCalibrationStep] = useState(1);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const [testShots, setTestShots] = useState<any[]>([]);
  
  const handleCeilingHeightChange = (value: number[]) => {
    setCeilingHeight(value[0]);
  };
  
  const startCalibration = () => {
    setCalibrationStep(2);
    setCalibrating(true);
    
    // Simulate test shots being recorded
    setTimeout(() => {
      setTestShots([
        { id: 1, clubSpeed: 93, ballSpeed: 138, launchAngle: 12.5, spinRate: 2800, distance: 235 },
      ]);
      
      setTimeout(() => {
        setTestShots(prev => [
          ...prev,
          { id: 2, clubSpeed: 95, ballSpeed: 142, launchAngle: 11.8, spinRate: 2650, distance: 243 },
        ]);
        
        setTimeout(() => {
          setTestShots(prev => [
            ...prev,
            { id: 3, clubSpeed: 94, ballSpeed: 140, launchAngle: 12.2, spinRate: 2750, distance: 240 },
          ]);
          
          setCalibrating(false);
          setCalibrationStep(3);
        }, 3000);
      }, 3000);
    }, 3000);
  };
  
  const completeCalibration = () => {
    setCalibrationComplete(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Calibrate the Launch Monitor</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 8 of 9</span>
      </div>
      
      {calibrationComplete ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Calibration Complete</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your launch monitor has been calibrated for optimal accuracy.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-6">
            <h4 className="font-medium mb-4">Calibration Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Ceiling Height:</span>
                <span className="font-medium">{ceilingHeight} feet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Test Shots:</span>
                <span className="font-medium">{testShots.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Status:</span>
                <span className="text-green-600 font-medium">Optimized</span>
              </div>
            </div>
          </div>
          
          <Card className="mb-6 w-full max-w-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Test Shot Results</h5>
                <span className="text-xs text-neutral-500">Average Values</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">94</div>
                  <div className="text-xs text-neutral-600">Club Speed (mph)</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">140</div>
                  <div className="text-xs text-neutral-600">Ball Speed (mph)</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded text-center">
                  <div className="text-xl font-medium text-primary">239</div>
                  <div className="text-xs text-neutral-600">Distance (yds)</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button
            onClick={goToNextStep}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Continue to Final Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          {calibrationStep === 1 && (
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/2">
                <div className="bg-neutral-100 rounded-lg p-6 relative">
                  <svg width="100%" height="220" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
                    {/* Ceiling */}
                    <rect x="40" y="20" width="220" height="10" fill="#d1d5db" />
                    
                    {/* Device */}
                    <rect x="125" y="30" width="50" height="20" fill="#1a8754" rx="4" />
                    
                    {/* Room height measurement */}
                    <line x1="30" y1="30" x2="30" y2={30 + (ceilingHeight * 15)} stroke="#9ca3af" strokeDasharray="5,5" strokeWidth="1" />
                    <line x1="25" y1="30" x2="35" y2="30" stroke="#9ca3af" strokeWidth="1" />
                    <line x1="25" y1={30 + (ceilingHeight * 15)} x2="35" y2={30 + (ceilingHeight * 15)} stroke="#9ca3af" strokeWidth="1" />
                    <text x="20" y={30 + (ceilingHeight * 7.5)} fontSize="12" fill="#6b7280" textAnchor="end" dominantBaseline="middle">{ceilingHeight} ft</text>
                    
                    {/* Floor */}
                    <rect x="40" y={30 + (ceilingHeight * 15)} width="220" height="10" fill="#d1d5db" />
                    
                    {/* Golf mat */}
                    <rect x="125" y={25 + (ceilingHeight * 15)} width="50" height="5" fill="#047857" />
                    
                    {/* Golfer silhouette */}
                    <svg x="130" y={30 + (ceilingHeight * 15) - 40} width="40" height="40" viewBox="0 0 24 24">
                      <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5C14.6,7 15.5,7.9 15.5,9V14.5H14V22H10V14.5H8.5V9C8.5,7.9 9.4,7 10.5,7Z" fill="#6b7280" />
                    </svg>
                    
                    {/* Golf club and ball */}
                    <line x1="150" y1={30 + (ceilingHeight * 15) - 35} x2="170" y2={30 + (ceilingHeight * 15) - 15} stroke="#6b7280" strokeWidth="1" />
                    <circle cx="175" cy={30 + (ceilingHeight * 15) - 10} r="5" fill="#e5e7eb" />
                    
                    {/* Measurement lines from device to ball */}
                    <line x1="150" y1="40" x2="175" y2={30 + (ceilingHeight * 15) - 10} stroke="#3b82f6" strokeDasharray="5,5" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-base font-medium mb-2">Set Your Ceiling Height</h4>
                  <div className="flex items-center space-x-4 mb-2">
                    <Ruler className="h-5 w-5 text-neutral-500" />
                    <div className="flex-1">
                      <Slider
                        defaultValue={[9]}
                        max={16}
                        min={7}
                        step={0.5}
                        value={[ceilingHeight]}
                        onValueChange={handleCeilingHeightChange}
                      />
                    </div>
                    <div className="w-16 text-center font-medium">
                      {ceilingHeight} ft
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    Accurately measure from floor to ceiling where your device is mounted.
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h4 className="font-medium mb-3">Calibration Steps:</h4>
                <div className="space-y-4 mb-6">
                  <div className="p-3 rounded-lg border border-primary bg-primary/5">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-sm text-primary">1</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Set ceiling height</h5>
                        <p className="text-xs text-neutral-600">
                          Enter the exact height from floor to ceiling where your device is mounted.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-neutral-200">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-sm text-neutral-600">2</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Take test shots</h5>
                        <p className="text-xs text-neutral-600">
                          Hit 3 test shots with your driver to help calibrate the system.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-neutral-200">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-sm text-neutral-600">3</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Verify and save</h5>
                        <p className="text-xs text-neutral-600">
                          Verify that the readings look accurate and save your calibration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-800">
                    For optimal accuracy, ensure your hitting area is clear and well-lit.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6">
                  <Button 
                    onClick={startCalibration} 
                    className="bg-primary hover:bg-primary/90 text-white w-full"
                  >
                    Start Calibration
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {calibrationStep === 2 && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                  <Club className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-medium mb-2">Take Test Shots</h4>
                <p className="text-neutral-600 max-w-lg mx-auto">
                  Please hit 3 shots with your driver so we can calibrate the device. 
                  Stand in your normal position and take full swings.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/2">
                  <div className="bg-neutral-100 rounded-lg p-6 h-64 flex items-center justify-center relative">
                    <svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
                      {/* Ceiling with device */}
                      <rect x="40" y="20" width="200" height="5" fill="#d1d5db" />
                      <rect x="120" y="25" width="40" height="15" fill="#1a8754" rx="3" />
                      
                      {/* Detection cone */}
                      <path 
                        d="M120,40 L80,140 L200,140 L160,40 Z" 
                        fill="#1a8754" 
                        fillOpacity="0.1" 
                        stroke="#1a8754" 
                        strokeWidth="1" 
                        strokeDasharray={calibrating ? "none" : "5,5"}
                      />
                      
                      {/* Ball trajectory */}
                      {calibrating && testShots.length > 0 && (
                        <motion.path 
                          d="M140,140 Q150,100 180,80" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      )}
                      
                      {/* Ball */}
                      {calibrating && (
                        <motion.circle 
                          cx="140" 
                          cy="140" 
                          r="5" 
                          fill="white" 
                          stroke="#d1d5db"
                          initial={{ cx: 140, cy: 140 }}
                          animate={{ cx: 180, cy: 80 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      )}
                    </svg>
                    
                    {calibrating && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="flex items-center justify-center h-16 w-16 mb-2"
                          >
                            <Maximize className="h-16 w-16 text-primary/40" />
                          </motion.div>
                          <p className="text-sm font-medium text-primary animate-pulse">
                            Detecting shot {testShots.length + 1}...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium mb-3">Test Shots: {testShots.length}/3</h4>
                  
                  {testShots.length === 0 ? (
                    <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-lg p-6 text-center">
                      <Club className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-600">
                        No shots detected yet. Hit your first test shot.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {testShots.map((shot, index) => (
                        <motion.div
                          key={shot.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-neutral-200 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-sm">Shot {index + 1}</h5>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Detected
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-center text-xs">
                            <div>
                              <div className="font-medium text-primary">{shot.clubSpeed}</div>
                              <div className="text-neutral-600">Club Speed (mph)</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.ballSpeed}</div>
                              <div className="text-neutral-600">Ball Speed (mph)</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.launchAngle}°</div>
                              <div className="text-neutral-600">Launch Angle</div>
                            </div>
                            <div>
                              <div className="font-medium text-primary">{shot.distance}</div>
                              <div className="text-neutral-600">Distance (yds)</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    {calibrating ? (
                      <div className="text-center text-sm text-neutral-600">
                        {testShots.length < 3 ? (
                          <p>Keep taking shots until you complete 3 test shots...</p>
                        ) : (
                          <p>Analyzing shots...</p>
                        )}
                      </div>
                    ) : (
                      testShots.length > 0 && testShots.length < 3 && (
                        <Button 
                          onClick={startCalibration} 
                          className="w-full mt-4"
                          variant="outline"
                        >
                          Continue Calibration ({3 - testShots.length} more shots)
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {calibrationStep === 3 && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-medium mb-2">Test Shots Complete</h4>
                <p className="text-neutral-600 max-w-lg mx-auto">
                  The system has recorded your test shots and is ready to be calibrated based on your ceiling height and shot data.
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto mb-8">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Calibration Summary</h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                        <div className="flex items-center">
                          <Ruler className="h-5 w-5 text-primary mr-2" />
                          <span className="text-neutral-700">Ceiling Height</span>
                        </div>
                        <span className="font-medium">{ceilingHeight} feet</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                        <div className="flex items-center">
                          <Club className="h-5 w-5 text-primary mr-2" />
                          <span className="text-neutral-700">Test Shots</span>
                        </div>
                        <span className="font-medium">{testShots.length} shots</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="text-lg font-medium text-primary">
                            {Math.round(testShots.reduce((sum, shot) => sum + shot.clubSpeed, 0) / testShots.length)}
                          </div>
                          <div className="text-xs text-neutral-600">Avg. Club Speed (mph)</div>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="text-lg font-medium text-primary">
                            {Math.round(testShots.reduce((sum, shot) => sum + shot.ballSpeed, 0) / testShots.length)}
                          </div>
                          <div className="text-xs text-neutral-600">Avg. Ball Speed (mph)</div>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="text-lg font-medium text-primary">
                            {Math.round(testShots.reduce((sum, shot) => sum + shot.distance, 0) / testShots.length)}
                          </div>
                          <div className="text-xs text-neutral-600">Avg. Distance (yds)</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setTestShots([]);
                    setCalibrationStep(1);
                  }}
                  className="flex items-center"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restart Calibration
                </Button>
                
                <Button 
                  onClick={completeCalibration} 
                  className="bg-primary hover:bg-primary/90 text-white flex items-center"
                >
                  Save Calibration
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
