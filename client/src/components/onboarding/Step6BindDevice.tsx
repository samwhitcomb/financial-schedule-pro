import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const bindDeviceSchema = z.object({
  deviceNickname: z.string().min(1, "Device nickname is required"),
  location: z.string().optional(),
});

export function Step6BindDevice() {
  const { goToNextStep } = useOnboarding();
  const { toast } = useToast();
  const [binding, setBinding] = useState(false);
  const [deviceBound, setDeviceBound] = useState(false);

  const form = useForm<z.infer<typeof bindDeviceSchema>>({
    resolver: zodResolver(bindDeviceSchema),
    defaultValues: {
      deviceNickname: "My GolfTrackPro",
      location: "",
    },
  });

  const onSubmit = (data: z.infer<typeof bindDeviceSchema>) => {
    setBinding(true);
    
    // Simulate binding device to account
    setTimeout(() => {
      setBinding(false);
      setDeviceBound(true);
      toast({
        title: "Device bound successfully",
        description: `Your device "${data.deviceNickname}" has been securely linked to your account.`,
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Bind the Device to Your Account</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Step 6 of 9</span>
      </div>
      
      {deviceBound ? (
        <div className="flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h3 className="text-xl font-medium text-center mb-2">Device Bound Successfully</h3>
          <p className="text-neutral-600 text-center mb-6">
            Your device has been securely linked to your account. You can now proceed to the next step.
          </p>
          
          <div className="bg-neutral-100 p-6 rounded-lg max-w-md w-full mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{form.getValues().deviceNickname}</h4>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Device ID:</span>
                <span className="font-mono">GolfTrackPro-A7F9</span>
              </div>
              {form.getValues().location && (
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{form.getValues().location}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Owner:</span>
                <span>Your Account</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={goToNextStep}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Continue to Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <p className="text-neutral-700 mb-6">
            Now let's secure your device to your account. This helps ensure that only you can access and control your GolfTrackPro launch monitor.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <div className="bg-neutral-100 rounded-lg p-6 h-full">
                <div className="flex items-center justify-center h-full">
                  <svg 
                    width="240" 
                    height="240" 
                    viewBox="0 0 240 240" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="opacity-90"
                  >
                    {/* User icon */}
                    <circle cx="90" cy="120" r="40" fill="#e5e7eb" />
                    <circle cx="90" cy="105" r="15" fill="#9ca3af" />
                    <path d="M65,140 C65,125 80,120 90,120 C100,120 115,125 115,140" fill="#9ca3af" />
                    
                    {/* Device icon */}
                    <rect x="150" y="100" width="40" height="40" rx="5" fill="#1a8754" />
                    <circle cx="170" cy="120" r="10" fill="#fff" fillOpacity="0.6" />
                    
                    {/* Connection line */}
                    <path 
                      d="M115,120 L150,120" 
                      stroke={binding ? "#22c55e" : "#9ca3af"} 
                      strokeWidth="3" 
                      strokeDasharray={binding ? "none" : "5,5"} 
                      className={binding ? "animate-pulse" : ""}
                    />
                    
                    {/* Lock icon */}
                    <circle 
                      cx="132" 
                      cy="120" 
                      r="15" 
                      fill={binding ? "#22c55e" : "#f3f4f6"} 
                      stroke={binding ? "#15803d" : "#d1d5db"} 
                      strokeWidth="2"
                      className={binding ? "animate-pulse" : ""}
                    />
                    <rect 
                      x="126" 
                      y="117" 
                      width="12" 
                      height="10" 
                      rx="2" 
                      fill={binding ? "#15803d" : "#9ca3af"} 
                    />
                    <rect x="129" y="112" width="6" height="5" rx="1" fill={binding ? "#15803d" : "#9ca3af"} />
                    
                    {/* Text labels */}
                    <text x="90" y="170" fontSize="14" textAnchor="middle" fill="#6b7280">Your Account</text>
                    <text x="170" y="170" fontSize="14" textAnchor="middle" fill="#6b7280">GolfTrackPro</text>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <div className="flex items-start">
                      <LinkIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm text-blue-800 mb-1">Device Information</h5>
                        <p className="text-xs text-blue-700">
                          Your device (GolfTrackPro-A7F9) is ready to be bound to your account. Binding your device helps secure it and ensures only you can access your data.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="deviceNickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Nickname</FormLabel>
                        <FormControl>
                          <Input placeholder="My GolfTrackPro" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a name for your device to identify it easily
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Home Office, Garage, etc." {...field} />
                        </FormControl>
                        <FormDescription>
                          Add a location to help identify where this device is installed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white w-full"
                    disabled={binding}
                  >
                    {binding ? "Binding Device..." : "Bind Device"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
