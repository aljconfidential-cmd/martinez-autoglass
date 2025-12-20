'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  Car, 
  Shield, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  Wrench,
  Smartphone,
  CreditCard,
  Award,
  Play,
  Heart,
  MessageCircle,
  Share
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    vehicle: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handlePhoneCall = () => {
    window.location.href = 'tel:+16028754840';
  };

  const handleQuoteFormChange = (field: string, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-quote-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          firstName: quoteForm.firstName,
          lastName: quoteForm.lastName,
          phone: quoteForm.phone,
          vehicle: quoteForm.vehicle,
          service: quoteForm.service,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage('Thank you! Your quote request has been sent. We\'ll contact you within 2 hours.');
        setQuoteForm({
          firstName: '',
          lastName: '',
          phone: '',
          vehicle: '',
          service: ''
        });
      } else {
        setSubmitMessage('There was an error sending your request. Please call us directly at 602-875-4840.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitMessage('There was an error sending your request. Please call us directly at 602-875-4840.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <img 
                src="/Small Logo MAG.png" 
                alt="Martinez Autoglass Logo" 
                className="w-10 h-10 object-contain"
              />
              <div className="text-sm text-white font-medium tracking-wide">
                MARTINEZ AUTOGLASS
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors font-medium">Home</a>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors font-medium">Services</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact</a>
              <Button onClick={handlePhoneCall} style={{backgroundColor: '#38BDF8'}} className="hover:opacity-90 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 rounded-lg mt-2 p-4 shadow-lg border border-gray-800">
              <div className="flex flex-col space-y-4">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors font-medium">Home</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors font-medium">Services</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors font-medium">About</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors font-medium">Contact</a>
                <Button onClick={handlePhoneCall} style={{backgroundColor: '#38BDF8'}} className="hover:opacity-90 text-white w-full rounded-full min-h-[44px]">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-gray-50 relative overflow-hidden pt-20 pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-sky-400 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-sky-300 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-sky-400 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 px-4">
              <img
                src="/Large Logo MAG.png"
                alt="Martinez Autoglass - MAG Logo"
                className="mx-auto max-w-[280px] sm:max-w-md w-full h-auto"
              />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Your trusted choice for windshield, door glass, and back glass replacement and repair. We offer same-day service, free mobile service, and we work with all insurance providers to make your repair hassle-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
              <Button size="lg" onClick={handlePhoneCall} style={{backgroundColor: '#38BDF8'}} className="hover:opacity-90 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto">
                <Phone className="mr-2 w-5 h-5" />
                Call 602-875-4840
              </Button>
              <Button size="lg" variant="outline" style={{borderColor: '#38BDF8', color: '#38BDF8'}} className="px-8 py-4 rounded-full border-2 hover:bg-sky-50 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-12 sm:mt-16 mb-12 sm:mb-16 px-4">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Clock className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <div className="text-xl sm:text-2xl font-bold text-sky-400">Same Day</div>
                <div className="text-sm sm:text-base text-gray-600">Service Available</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Car className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <div className="text-xl sm:text-2xl font-bold text-sky-400">Free Mobile</div>
                <div className="text-sm sm:text-base text-gray-600">Service to You</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CreditCard className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <div className="text-xl sm:text-2xl font-bold text-sky-400">All Insurance</div>
                <div className="text-sm sm:text-base text-gray-600">Accepted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Our <span className="text-sky-400">Services</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Professional auto glass services with quality workmanship and reliable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-sky-50 to-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Windshield Replacement</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete windshield replacement with OEM quality glass and professional installation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />OEM Quality Glass</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Lifetime Warranty</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Same Day Service</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-sky-50 to-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Door Glass Repair</CardTitle>
                <CardDescription className="text-gray-600">
                  Expert repair and replacement of side windows, door glass, and quarter panels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />All Vehicle Types</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Quick Turnaround</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Mobile Service</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-sky-50 to-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Back Glass Service</CardTitle>
                <CardDescription className="text-gray-600">
                  Rear window replacement and repair with precision fitting and quality materials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Heated Glass Available</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Defrost Repair</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Insurance Claims</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Why Choose <span className="text-sky-400">Martinez Autoglass</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Professional service you can trust with competitive pricing and guaranteed quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Same-Day Service</h3>
                  <p className="text-gray-600">Most repairs completed the same day you call. We understand you need your vehicle back quickly.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Mobile Service</h3>
                  <p className="text-gray-600">We come to you! Mobile service available at your home, office, or anywhere convenient.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">All Insurance Accepted</h3>
                  <p className="text-gray-600">We work with all major insurance companies and handle the paperwork for you.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600">Lifetime warranty on workmanship and premium OEM glass for lasting results.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <Card className="relative bg-white rounded-2xl p-8 shadow-xl border-0">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-sky-400 mb-2">Jaime</div>
                  <div className="text-lg text-gray-600 mb-4">Owner & Master Technician</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">602-875-4840</div>
                  <Badge className="bg-green-100 text-green-800">Available Now</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-sky-50 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">4.9★</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                  <div className="text-center p-4 bg-sky-50 rounded-lg">
                    <Shield className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">12+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button style={{backgroundColor: '#38BDF8'}} className="hover:opacity-90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Learn More About Our Process
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-8 sm:py-12" style={{backgroundColor: '#38BDF8'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 px-4">
              Emergency Auto Glass Service Available 24/7
            </h3>
            <p className="text-base sm:text-lg text-sky-100 mb-6 px-4">
              Cracked windshield? Don't wait - call now for immediate assistance
            </p>
            <Button size="lg" onClick={handlePhoneCall} style={{backgroundColor: 'white', color: '#38BDF8'}} className="hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base w-auto mx-4 sm:mx-0">
              <Phone className="mr-2 w-5 h-5" />
              Emergency Service: 602-875-4840
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted Auto Glass
                <span className="text-sky-400"> Experts</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Martinez Autoglass has been serving the community with professional auto glass services 
                for over 12 years. We specialize in windshield replacement, door glass repair, and 
                back glass service for all vehicle makes and models.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality workmanship, competitive pricing, and exceptional customer 
                service has made us the preferred choice for auto glass repair in the area. We use 
                only premium OEM glass and provide lifetime warranties on our work.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-3xl font-bold text-sky-400">1000+</div>
                  <div className="text-gray-600">Satisfied Customers</div>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-3xl font-bold text-sky-400">12+</div>
                  <div className="text-gray-600">Years in Business</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 rounded-2xl transform -rotate-3 opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Service Areas</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Greater Phoenix Area</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Maricopa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Buckeye</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Surprise</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Anthem</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-sky-400" />
                    <span className="text-gray-700">Queen Creek</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Mobile Service Available</span>
                  </div>
                  <p className="text-sm text-green-700">We'll come to your location within 30 miles at no extra charge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Follow Us on <span className="text-sky-400">Social Media</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              See our work in action and stay updated with our latest projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative">
              <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-sky-50 to-white">
                <div className="relative">
                  <video
                    className="w-full h-60 sm:h-80 object-cover"
                    controls
                    poster="/Large Logo MAG.png"
                  >
                    <source src="/VID_20250901_163304.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      <Play className="w-3 h-3 mr-1" />
                      LIVE
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/Small Logo MAG.png" 
                        alt="Martinez Autoglass" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Martinez Autoglass</div>
                        <div className="text-sm text-gray-600">@MARTINEZ_AUTOGLASS</div>
                      </div>
                    </div>
                    <Badge className="bg-sky-100 text-sky-800">Instagram</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Watch our expert technician Jaime demonstrate professional windshield replacement 
                    techniques. Quality workmanship you can trust! 🚗✨
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>247 likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span>18 comments</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share className="w-4 h-4 text-green-500" />
                        <span>32 shares</span>
                      </div>
                    </div>
                    <span>2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Connect With Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-pink-50 to-white border-0 shadow-md">
                    <img 
                      src="/instagram-logo copy.png" 
                      alt="Instagram" 
                      className="w-12 h-12 mx-auto mb-3 object-contain"
                    />
                    <div className="font-semibold text-gray-900">Instagram</div>
                    <div className="text-xs text-gray-600 break-all">@MARTINEZ_AUTOGLASS</div>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-sky-50 to-white border-0 shadow-md">
                    <img 
                      src="/FB Logo.wine copy.png" 
                      alt="Facebook" 
                      className="w-12 h-12 mx-auto mb-3 object-contain"
                    />
                    <div className="font-semibold text-gray-900">Facebook</div>
                    <div className="text-sm text-gray-600">Martinez Autoglass</div>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-white border-0 shadow-md">
                    <img 
                      src="/TIKTOK.png" 
                      alt="TikTok" 
                      className="w-12 h-12 mx-auto mb-3 object-contain"
                    />
                    <div className="font-semibold text-gray-900">TikTok</div>
                    <div className="text-sm text-gray-600">@martinezautoglass</div>
                  </Card>
                </div>
              </div>

              <div className="bg-sky-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Why Follow Us?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">See our work process and quality standards</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Get tips for auto glass maintenance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Stay updated on special offers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Customer testimonials and reviews</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button onClick={handlePhoneCall} style={{backgroundColor: '#38BDF8'}} className="hover:opacity-90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Phone className="mr-2 w-4 h-4" />
                  Call 602-875-4840 for Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Get Your <span className="text-sky-400">Free Quote</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Contact us today for professional auto glass service. Fast, reliable, and affordable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Contact Jaime Today</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call or Text</div>
                    <div className="text-lg sm:text-xl font-bold text-sky-400 cursor-pointer hover:underline" onClick={handlePhoneCall}>602-875-4840</div>
                    <div className="text-xs sm:text-sm text-gray-600">Available 7 days a week</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-sm sm:text-base text-sky-400 break-all">jaime@mag-autoglass.com</div>
                    <div className="text-xs sm:text-sm text-gray-600">Quick response guaranteed</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Service Area</div>
                    <div className="text-gray-600">Greater Phoenix Area</div>
                    <div className="text-sm text-gray-600">Mobile service available</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-sky-400 rounded-xl text-white">
                <h4 className="text-lg font-semibold mb-3">Emergency Service</h4>
                <p className="text-sky-100 mb-4">
                  Cracked windshield affecting your safety? We offer emergency same-day service
                  to get you back on the road safely.
                </p>
                <Button onClick={handlePhoneCall} style={{backgroundColor: 'white', color: '#38BDF8'}} className="hover:bg-gray-100 font-semibold">
                  Call for Emergency Service
                </Button>
              </div>
            </div>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">Request a Quote</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out this form and we'll get back to you with a competitive quote within 2 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input
                        placeholder="Your first name"
                        className="border-gray-300"
                        value={quoteForm.firstName}
                        onChange={(e) => handleQuoteFormChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input
                        placeholder="Your last name"
                        className="border-gray-300"
                        value={quoteForm.lastName}
                        onChange={(e) => handleQuoteFormChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="(602) 555-0123"
                      className="border-gray-300"
                      value={quoteForm.phone}
                      onChange={(e) => handleQuoteFormChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Information</label>
                    <Input
                      placeholder="Year, Make, Model (e.g., 2020 Honda Civic)"
                      className="border-gray-300"
                      value={quoteForm.vehicle}
                      onChange={(e) => handleQuoteFormChange('vehicle', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                    <Textarea
                      placeholder="Describe the glass damage or service needed..."
                      className="border-gray-300 min-h-[100px]"
                      value={quoteForm.service}
                      onChange={(e) => handleQuoteFormChange('service', e.target.value)}
                      required
                    />
                  </div>
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {submitMessage}
                    </div>
                  )}
                  <Button
                    type="submit"
                    style={{backgroundColor: '#38BDF8'}}
                    className="w-full hover:opacity-90 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Free Quote'}
                    {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    We'll respond within 2 hours during business hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/Small Logo MAG.png" 
                  alt="Martinez Autoglass Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div className="text-lg font-bold text-white">
                  MARTINEZ AUTOGLASS
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Professional auto glass repair and replacement services. Same-day service, 
                mobile repairs, and all insurance accepted.
              </p>
              <div className="flex items-center space-x-2 text-sky-400 font-semibold text-lg">
                <Phone className="w-5 h-5" />
                <span className="cursor-pointer hover:underline" onClick={handlePhoneCall}>602-875-4840</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Windshield Replacement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Door Glass Repair</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Back Glass Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insurance Claims</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 8AM - 6PM</li>
                <li>Saturday: 9AM - 4PM</li>
                <li>Sunday: Emergency Only</li>
                <li className="text-sky-400 font-semibold">24/7 Emergency Service</li>
              </ul>
              
              <div className="mt-6">
                <h5 className="font-semibold mb-2">Service Area</h5>
                <p className="text-gray-400 text-sm">
                  Greater Phoenix Area<br />
                  Mobile service available
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Martinez Autoglass. All rights reserved. Licensed & Insured Auto Glass Professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}