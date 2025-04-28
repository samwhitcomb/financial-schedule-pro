import { Club, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Club className="text-white h-6 w-6 mr-2" />
              <h2 className="text-lg font-semibold">GolfTrackPro</h2>
            </div>
            <p className="text-neutral-400 text-sm mt-2">Advanced swing analysis technology</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-sm font-semibold mb-3">Support</h5>
              <ul className="text-neutral-400 text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Installation Guide</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-semibold mb-3">Resources</h5>
              <ul className="text-neutral-400 text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">User Manual</Link></li>
                <li><Link href="#" className="hover:text-white">Videos</Link></li>
                <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h5 className="text-sm font-semibold mb-3">Connect</h5>
              <div className="flex space-x-4">
                <Link href="#" className="text-neutral-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-neutral-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-neutral-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-neutral-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} GolfTrackPro. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-neutral-500 hover:text-white text-sm">Terms of Service</Link>
            <Link href="#" className="text-neutral-500 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-neutral-500 hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
