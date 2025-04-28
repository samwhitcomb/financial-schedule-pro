import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { AuthContext } from "@/hooks/use-auth";

type OnboardingContextType = {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null;
  const [currentStep, setCurrentStep] = useState(1);
  
  // Initialize step from user data if available
  useEffect(() => {
    if (user && user.currentStep) {
      setCurrentStep(user.currentStep);
    }
  }, [user]);
  
  const goToNextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 9) {
      setCurrentStep(step);
    }
  };
  
  const resetOnboarding = () => {
    setCurrentStep(1);
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
