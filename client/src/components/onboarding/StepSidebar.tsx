import { useOnboarding } from "@/lib/onboarding-context";
import { Check } from "lucide-react";

type StepInfo = {
  number: number;
  title: string;
  description: string;
};

export function StepSidebar() {
  const { currentStep } = useOnboarding();
  
  const steps: StepInfo[] = [
    { number: 1, title: "Physical Installation", description: "Hardware setup" },
    { number: 2, title: "Installation & Wiring", description: "Mount and connect" },
    { number: 3, title: "Power On", description: "Activate device" },
    { number: 4, title: "Connect Device", description: "Link to app" },
    { number: 5, title: "Bind Device", description: "Secure to account" },
    { number: 6, title: "Firmware Update", description: "Install latest software" },
    { number: 7, title: "Calibration", description: "Optimize accuracy" },
    { number: 8, title: "Onboarding", description: "First use setup" },
  ];
  
  return (
    <div className="w-full md:w-1/3">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Setup Steps</h3>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                currentStep === step.number
                  ? "bg-primary/10 text-primary"
                  : currentStep > step.number
                  ? "text-neutral-600"
                  : "text-neutral-400"
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  currentStep === step.number
                    ? "bg-primary text-white"
                    : currentStep > step.number
                    ? "bg-green-500 text-white"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <div>
                <div className="font-medium">{step.title}</div>
                <div className="text-sm">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
