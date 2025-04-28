import { useOnboarding } from "@/lib/onboarding-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StepSidebar } from "@/components/onboarding/StepSidebar";
import { Step1PhysicalInstallation } from "@/components/onboarding/Step1PhysicalInstallation";
import { Step2Installation } from "@/components/onboarding/Step2Installation";
import { Step3PowerOn } from "@/components/onboarding/Step3PowerOn";
import { Step5ConnectDevice } from "@/components/onboarding/Step5ConnectDevice";
import { Step6BindDevice } from "@/components/onboarding/Step6BindDevice";
import { Step7Firmware } from "@/components/onboarding/Step7Firmware";
import { Step8Calibration } from "@/components/onboarding/Step8Calibration";
import { Step9Onboarding } from "@/components/onboarding/Step9Onboarding";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();
  
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / 8) * 100); // Adjusted for 8 steps
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Setup Progress */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-1">Device Setup</h2>
            <p className="text-neutral-600 mb-6">Follow these steps to get your GolfTrackPro launch monitor ready.</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Setup Container */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Steps Navigation */}
            <StepSidebar />
            
            {/* Right Side: Current Step Content */}
            <div className="w-full md:w-2/3">
              {currentStep === 1 && <Step1PhysicalInstallation />}
              {currentStep === 2 && <Step2Installation />}
              {currentStep === 3 && <Step3PowerOn />}
              {currentStep === 4 && <Step5ConnectDevice />}
              {currentStep === 5 && <Step6BindDevice />}
              {currentStep === 6 && <Step7Firmware />}
              {currentStep === 7 && <Step8Calibration />}
              {currentStep === 8 && <Step9Onboarding />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
