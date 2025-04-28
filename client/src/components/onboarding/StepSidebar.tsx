import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type StepInfo = {
  number: number;
  title: string;
  description: string;
}

export function StepSidebar() {
  const { currentStep } = useOnboarding();
  
  const steps: StepInfo[] = [
    { number: 1, title: "Physical Installation", description: "Hardware setup" },
    { number: 2, title: "Installation & Wiring", description: "Mount and connect" },
    { number: 3, title: "Power On", description: "Activate device" },
    { number: 4, title: "Account Setup", description: "Create or login" },
    { number: 5, title: "Connect Device", description: "Link to app" },
    { number: 6, title: "Bind Device", description: "Secure to account" },
    { number: 7, title: "Firmware Update", description: "Install latest software" },
    { number: 8, title: "Calibration", description: "Optimize accuracy" },
    { number: 9, title: "Onboarding", description: "First use setup" },
  ];

  return (
    <div className="w-full md:w-1/3 mb-6 md:mb-0">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-lg mb-4">Setup Steps</h3>
        
        <div className="step-progress">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={cn(
                "flex items-start mb-6",
                step.number === currentStep && "step-current",
                step.number < currentStep && "step-complete"
              )}
              data-step={step.number}
            >
              <div 
                className={cn(
                  "step-icon w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3",
                  step.number === currentStep 
                    ? "border-primary" 
                    : "border-neutral-300"
                )}
              >
                <span>{step.number}</span>
              </div>
              <div>
                <h4 className={cn(
                  "font-medium",
                  step.number !== currentStep && "text-neutral-600"
                )}>
                  {step.title}
                </h4>
                <p className="text-sm text-neutral-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
