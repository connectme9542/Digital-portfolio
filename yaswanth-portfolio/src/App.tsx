import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  Sparkles, 
  Code, 
  Cloud, 
  Database, 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Download,
  Twitter,
  Instagram
} from "lucide-react";

// Intersection Observer Hook for animations
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView] as const;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, isVisible }: { end: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);
  
  return <span>{count}</span>;
}

// Floating Particles Background Component
function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  );
}

export default function Portfolio() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for scroll animations
  const [heroRef, heroInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [experienceRef, experienceInView] = useInView();
  const [educationRef, educationInView] = useInView();
  const [achievementsRef, achievementsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const handleEnter = () => {
    setShowEntrance(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entrance Screen with enhanced animations
  if (showEntrance) {
    return (
      <div 
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center cursor-pointer z-50 overflow-hidden entrance-screen"
        onClick={handleEnter}
      >
        <ParticlesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))] animate-pulse" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-500/30 rotate-45 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-cyan-500/40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-500/30 rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
        
        <div className="relative z-10 text-center space-y-8 px-4 transform transition-all duration-1000 entrance-content">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse glitch-text">
              YASWANTH
            </h1>
            <div className="text-lg md:text-2xl text-gray-300 typewriter">
              Where <span className="text-yellow-400 font-semibold glow-text">Hardware</span> Meets{" "}
              <span className="text-cyan-400 font-semibold glow-text">Software</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-400 text-lg animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              Click anywhere to enter the Digital Universe
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 animate-fadeInUp" style={{ animationDelay: '1s' }}>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Your journey beyond the screen awaits</span>
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
        
        {/* Interactive cursor effect */}
        <div 
          className="absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${showEntrance ? 1 : 0})`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Navigation with glass effect */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                YASWANTH
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" /> : 
                <Menu className="w-6 h-6 transition-transform duration-300" />
              }
            </button>
          </div>
          
          {/* Mobile Menu with slide animation */}
          <div className={`md:hidden transition-all duration-500 ease-in-out transform ${
            isMenuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
          } overflow-hidden`}>
            <div className="mt-4 space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 px-3 py-3 rounded-lg transform ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with enhanced animations */}
      <section className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 pb-8 lg:pb-12 relative">
        <div ref={heroRef} className={`container mx-auto transform transition-all duration-1000 ${
          heroInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 xl:gap-5 items-center max-w-5xl mx-auto">
            {/* Profile Image Section */}
            <div className={`order-1 lg:order-1 flex justify-center lg:justify-center transition-all duration-1000 delay-200 ${
              heroInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse"></div>
                <div className="relative">
                  <img 
                    src="https://avatars.githubusercontent.com/u/86795414?v=4" 
                    alt="Yaswanth Dharmavarapu"
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-60 lg:h-60 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 rounded-full object-cover border-4 border-white/10 shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/5"></div>
                </div>
                {/* Floating elements around image */}
                <div className="absolute top-4 -right-2 w-4 h-4 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-purple-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -left-6 w-2 h-2 bg-cyan-400/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className={`order-2 lg:order-2 text-center space-y-4 sm:space-y-6 lg:space-y-5 xl:space-y-6 transition-all duration-1000 delay-400 ${
              heroInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="space-y-2 sm:space-y-3 lg:space-y-2 xl:space-y-3">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent transition-all duration-1000 leading-tight ${
                  heroInView ? 'scale-100' : 'scale-95'
                }`}>
                  YASWANTH
                </h1>
                <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-light text-gray-300 transition-all duration-1000 delay-200 ${
                  heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  DHARMAVARAPU
                </h2>
                <div className={`text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl text-gray-400 space-y-1 sm:space-y-2 transition-all duration-1000 delay-400 ${
                  heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="typing-animation">Electronics & Communication Engineer</div>
                  <div className="text-cyan-400 typing-animation" style={{ animationDelay: '1s' }}>Software Developer</div>
                  <div className="text-yellow-400 typing-animation" style={{ animationDelay: '2s' }}>AI/ML Enthusiast</div>
                </div>
              </div>
          
              <p className={`text-base sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
                heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                Bridging the gap between hardware and software with expertise in embedded systems, 
                cloud technologies, and innovative problem-solving.
              </p>
          
              {/* Social Media Links */}
              <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-3 xl:gap-4 transition-all duration-1000 delay-700 ${
                heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <a 
                  href="https://www.linkedin.com/in/yaswanthd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:from-blue-600/40 group-hover:to-blue-500/40 transition-all duration-300">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:block">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/yaswanth-yashu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-all duration-300 transform hover:scale-110"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-600/20 to-gray-500/20 rounded-full flex items-center justify-center group-hover:from-gray-600/40 group-hover:to-gray-500/40 transition-all duration-300">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:block">GitHub</span>
                </a>
                <a 
                  href="https://twitter.com/yaswanthd161" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 rounded-full flex items-center justify-center group-hover:from-cyan-600/40 group-hover:to-cyan-500/40 transition-all duration-300">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:block">Twitter</span>
                </a>
              </div>
          
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4 justify-center transition-all duration-1000 delay-800 ${
                heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('about')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group text-sm sm:text-base lg:text-sm xl:text-base px-4 sm:px-6 lg:px-5 xl:px-6 py-2 sm:py-3"
                >
                  <span>Explore My Journey</span>
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/YaswanthD_resume_Software_Development_Engineer.pdf';
                    link.download = 'YaswanthD_Resume.pdf';
                    link.click();
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-white/5 transform transition-all duration-300 hover:scale-105 glass group text-sm sm:text-base lg:text-sm xl:text-base px-4 sm:px-6 lg:px-5 xl:px-6 py-2 sm:py-3"
                >
                  <Download className="mr-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:animate-pulse" />
                  Download Resume
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="border-gray-600 text-gray-300 hover:bg-white/5 transform transition-all duration-300 hover:scale-105 glass text-sm sm:text-base lg:text-sm xl:text-base px-4 sm:px-6 lg:px-5 xl:px-6 py-2 sm:py-3"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 animate-float" style={{ animationDelay: '0s' }}>
          <Star className="w-6 h-6 text-blue-400/50" />
        </div>
        <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Zap className="w-8 h-8 text-purple-400/50" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Code className="w-5 h-5 text-cyan-400/50" />
        </div>
      </section>

      {/* Section Separator */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 px-8">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-1 h-1 bg-blue-400/30 rounded-full" />
        </div>
        <div className="absolute top-1/3 right-1/3 transform -translate-y-1/2 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-1 h-1 bg-purple-400/30 rounded-full" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 transform translate-y-1/2 animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-1 h-1 bg-cyan-400/30 rounded-full" />
        </div>
      </div>

      {/* About Section with staggered animations */}
      <section id="about" className="py-24 px-4 bg-gradient-to-b from-transparent to-black/10">
        <div className="container mx-auto">
          <div ref={aboutRef} className={`text-center mb-16 transform transition-all duration-1000 ${
            aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              ABOUT ME
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto animate-expand" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transform transition-all duration-1000 delay-200 ${
              aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p className="hover:text-white transition-colors duration-300">
                  I'm an IT and Electronics undergraduate with a strong foundation in cloud platforms, 
                  embedded systems, and database concepts. My journey combines the precision of 
                  hardware engineering with the creativity of software development.
                </p>
                <p className="hover:text-white transition-colors duration-300">
                  With proven experience in real-world hardware-software integration, data analysis, 
                  and IT systems support, I'm passionate about creating innovative solutions that 
                  bridge the physical and digital worlds.
                </p>
                <p className="hover:text-white transition-colors duration-300">
                  Currently pursuing B.Tech in Electronics & Communication Engineering at Pragati 
                  Engineering College, I'm constantly exploring new technologies and pushing the 
                  boundaries of what's possible.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'Problem Solver', color: 'blue' },
                  { text: 'Team Leader', color: 'purple' },
                  { text: 'Innovator', color: 'cyan' },
                  { text: 'Quick Learner', color: 'yellow' }
                ].map((badge, index) => (
                  <Badge 
                    key={badge.text}
                    className={`${
                      badge.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      badge.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                      badge.color === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
                      badge.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                      'bg-gray-600 hover:bg-gray-700'
                    } text-white transform transition-all duration-300 hover:scale-110 cursor-default animate-fadeInUp`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 transform transition-all duration-1000 delay-400 ${
              aboutInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              {[
                { icon: GraduationCap, value: '8.4', label: 'Current CGPA', color: 'blue' },
                { icon: Code, value: '10+', label: 'Projects', color: 'purple' },
                { icon: Award, value: '3+', label: 'Certifications', color: 'yellow' },
                { icon: Briefcase, value: '2+', label: 'Internships', color: 'green' }
              ].map((stat, index) => (
                <Card 
                  key={stat.label}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group hover:border-${stat.color}-500/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fadeInUp`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-2 group-hover:animate-bounce`} />
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {stat.value === '8.4' || stat.value === '10+' || stat.value === '3+' || stat.value === '2+' ? 
                        <AnimatedCounter end={parseFloat(stat.value)} isVisible={aboutInView} /> :
                        stat.value
                      }
                      {stat.value.includes('+') && '+'}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with enhanced animations */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div ref={skillsRef} className={`text-center mb-16 transform transition-all duration-1000 ${
            skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              TECHNICAL SKILLS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto animate-expand" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Programming */}
            <Card className={`bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50 group hover:border-blue-500/80 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-fadeInUp ${
              skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0s' }}>
              <CardHeader>
                <Code className="w-8 h-8 text-blue-400 mb-2 group-hover:animate-bounce" />
                <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">Programming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Python', level: 90 },
                  { name: 'C', level: 85 },
                  { name: 'SQL', level: 80 },
                  { name: 'JavaScript', level: 75 },
                  { name: 'HTML/CSS', level: 85 }
                ].map((skill, index) => (
                  <div key={skill.name} className={`transform transition-all duration-500 ${
                    skillsInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full h-2 bg-gray-700">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-out animate-progress"
                        style={{ 
                          width: skillsInView ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Cloud & DevOps */}
            <Card className={`bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50 group hover:border-purple-500/80 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fadeInUp ${
              skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <Cloud className="w-8 h-8 text-purple-400 mb-2 group-hover:animate-bounce" />
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">Cloud & DevOps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Google Cloud', level: 80 },
                  { name: 'AWS', level: 60 },
                  { name: 'Azure', level: 55 },
                  { name: 'Git/GitHub', level: 85 },
                  { name: 'Docker', level: 65 }
                ].map((skill, index) => (
                  <div key={skill.name} className={`transform transition-all duration-500 ${
                    skillsInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full h-2 bg-gray-700">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: skillsInView ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.2 + 0.4}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Databases */}
            <Card className={`bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50 group hover:border-green-500/80 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-fadeInUp ${
              skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <Database className="w-8 h-8 text-green-400 mb-2 group-hover:animate-bounce" />
                <CardTitle className="text-white group-hover:text-green-300 transition-colors duration-300">Databases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'SQLite', level: 85 },
                  { name: 'MySQL', level: 75 },
                  { name: 'Database Design', level: 80 }
                ].map((skill, index) => (
                  <div key={skill.name} className={`transform transition-all duration-500 ${
                    skillsInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.1 + 0.4}s` }}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full h-2 bg-gray-700">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: skillsInView ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.2 + 0.6}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Embedded Systems */}
            <Card className={`bg-gradient-to-br from-yellow-900/50 to-orange-800/50 border-yellow-700/50 group hover:border-yellow-500/80 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fadeInUp ${
              skillsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <Cpu className="w-8 h-8 text-yellow-400 mb-2 group-hover:animate-bounce" />
                <CardTitle className="text-white group-hover:text-yellow-300 transition-colors duration-300">Embedded Systems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Arduino', level: 90 },
                  { name: 'Raspberry Pi', level: 80 },
                  { name: 'VHDL/Verilog', level: 70 },
                  { name: 'Circuit Design', level: 85 }
                ].map((skill, index) => (
                  <div key={skill.name} className={`transform transition-all duration-500 ${
                    skillsInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`} style={{ transitionDelay: `${index * 0.1 + 0.6}s` }}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-yellow-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="relative overflow-hidden rounded-full h-2 bg-gray-700">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: skillsInView ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 0.2 + 0.8}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
              FEATURED PROJECTS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sign Language Converter */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 text-white">AI/ML</Badge>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                  Sign Language to Speech Converter
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time gesture recognition system using computer vision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Built with OpenCV and MediaPipe for gesture recognition. Developed real-time system 
                  integrating computer vision with text and speech conversion, involving direct 
                  troubleshooting of hardware/software integration issues.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">OpenCV</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">MediaPipe</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Python</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Computer Vision</Badge>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://github.com/yaswanth-yashu/Sign-Language-to-Speech-Converter', '_blank')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <Github className="mr-2 w-3 h-3 group-hover:animate-bounce" />
                    GitHub
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('#', '_blank')}
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/10 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <ExternalLink className="mr-2 w-3 h-3 group-hover:animate-pulse" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* LintAI */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-600 text-white">Web App</Badge>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                  LintAI - Code Quality Checker
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Full-stack web application for code analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Developed a full stack web application for code quality analysis as part of the 
                  Bolt Hackathon. Utilized modern web technologies to build an intuitive interface 
                  that helps developers identify and improve code issues.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">React</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Node.js</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">AI</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Full Stack</Badge>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://github.com/yaswanth-yashu/Lint', '_blank')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <Github className="mr-2 w-3 h-3 group-hover:animate-bounce" />
                    GitHub
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://lintai.vercel.app', '_blank')}
                    className="border-purple-600 text-purple-400 hover:bg-purple-600/10 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <ExternalLink className="mr-2 w-3 h-3 group-hover:animate-pulse" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Line Follower Robot */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group hover:border-green-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600 text-white">Hardware</Badge>
                  <Award className="w-4 h-4 text-yellow-400" />
                </div>
                <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                  Line Follower Robot
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Award-winning autonomous robot with advanced algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Designed using Arduino, IR sensors, and drivers with robust feedback algorithms. 
                  Won 1st Prize at ROBO SPARK, Strides 2k24. Experience with sensor interfacing, 
                  system debugging, and real-time data processing.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Arduino</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Sensors</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">C++</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">1st Prize</Badge>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://github.com/yaswanth-yashu/line-follower-robot', '_blank')}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <Github className="mr-2 w-3 h-3 group-hover:animate-bounce" />
                    GitHub
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('#', '_blank')}
                    className="border-green-600 text-green-400 hover:bg-green-600/10 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <Award className="mr-2 w-3 h-3 group-hover:animate-pulse" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Automation Project */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group hover:border-yellow-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-600 text-white">Automation</Badge>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                </div>
                <CardTitle className="text-white group-hover:text-yellow-400 transition-colors">
                  Automated Blogging System
                </CardTitle>
                <CardDescription className="text-gray-400">
                  End-to-end content automation workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Created an automatic blogging system using n8n, automating end-to-end web content 
                  deployment. Built a workflow to generate SEO-friendly posts with images and 
                  auto-publish them to the blog.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">n8n</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Automation</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">SEO</Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">Workflow</Badge>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://github.com/yaswanth-yashu/automated-blogging', '_blank')}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <Github className="mr-2 w-3 h-3 group-hover:animate-bounce" />
                    GitHub
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('#', '_blank')}
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10 transform transition-all duration-300 hover:scale-105 group flex-1"
                  >
                    <ExternalLink className="mr-2 w-3 h-3 group-hover:animate-pulse" />
                    Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
              EXPERIENCE
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-500 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {/* Microchip */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Embedded System Developer</CardTitle>
                    <CardDescription className="text-blue-400 font-semibold">Microchip Technology Inc.</CardDescription>
                  </div>
                  <Badge className="bg-blue-600 text-white w-fit">Virtual | Jan 2025 - Mar 2025</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 space-y-2">
                  <li>• Designed, simulated, and integrated microcontroller-based systems</li>
                  <li>• Hands-on experience in C programming, sensor/UART interfacing</li>
                  <li>• Troubleshooting circuit issues and system optimization</li>
                  <li>• Real-time embedded system development and testing</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Google */}
            <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-700/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">AI/ML Virtual Intern</CardTitle>
                    <CardDescription className="text-green-400 font-semibold">Google (AICTE)</CardDescription>
                  </div>
                  <Badge className="bg-green-600 text-white w-fit">Virtual | Apr 2024 - Jun 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 space-y-2">
                  <li>• Built and deployed an image classifier using TensorFlow (85% accuracy)</li>
                  <li>• Explored practical applications of cloud and AI/ML concepts</li>
                  <li>• Worked on machine learning model optimization and deployment</li>
                  <li>• Gained experience with Google Cloud Platform services</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              EDUCATION
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {/* B.Tech */}
            <Card className="bg-gradient-to-r from-indigo-900/30 to-indigo-800/30 border-indigo-700/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Bachelor of Technology</CardTitle>
                    <CardDescription className="text-indigo-400 font-semibold">Electronics and Communication Engineering</CardDescription>
                    <CardDescription className="text-gray-400">Pragati Engineering College, Surampalem</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-indigo-600 text-white">2023 - 2026 (Expected)</Badge>
                    <div className="text-2xl font-bold text-white mt-2">CGPA: 8.4</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            {/* Diploma */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-700/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Diploma</CardTitle>
                    <CardDescription className="text-purple-400 font-semibold">Electronics and Communication Engineering</CardDescription>
                    <CardDescription className="text-gray-400">Aditya Polytechnic College, Surampalem</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-purple-600 text-white">2020 - 2023</Badge>
                    <div className="text-2xl font-bold text-white mt-2">CGPA: 9.0</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              ACHIEVEMENTS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Certifications */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-600 text-white">CERTIFIED</Badge>
              </div>
              <CardHeader>
                <Award className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Cloud IoT Edge ML</CardTitle>
                <CardDescription className="text-gray-400">Foundation Certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-300">February 2025</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-600 text-white">CERTIFIED</Badge>
              </div>
              <CardHeader>
                <Award className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Google Cloud Career</CardTitle>
                <CardDescription className="text-gray-400">Cloud Engineer Track</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-300">August 2024</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-600 text-white">CERTIFIED</Badge>
              </div>
              <CardHeader>
                <Award className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Zero Trust Associate</CardTitle>
                <CardDescription className="text-gray-400">Zscaler Academy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-300">November 2024</div>
              </CardContent>
            </Card>
            
            {/* Competition Wins */}
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-800/50 border-yellow-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-600 text-white">1ST PRIZE</Badge>
              </div>
              <CardHeader>
                <Award className="w-8 h-8 text-yellow-400 mb-2" />
                <CardTitle className="text-white">ROBO SPARK</CardTitle>
                <CardDescription className="text-gray-400">Line Follower Robot Competition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-300">Strides 2k24</div>
              </CardContent>
            </Card>
            
            {/* Leadership */}
            <Card className="bg-gradient-to-br from-red-900/50 to-pink-800/50 border-red-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-600 text-white">LEADERSHIP</Badge>
              </div>
              <CardHeader>
                <Award className="w-8 h-8 text-red-400 mb-2" />
                <CardTitle className="text-white">Robot Arena Event</CardTitle>
                <CardDescription className="text-gray-400">Event Lead & Organizer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-300">STRIDE 2k25 - Managed 30+ participants</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              CONTACT ME
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 text-lg">
              Let's build something amazing together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 max-w-6xl mx-auto">
            <div className="space-y-4 md:space-y-6 lg:space-y-5 xl:space-y-6">
              <div className="space-y-3 md:space-y-4 lg:space-y-3 xl:space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-semibold text-sm md:text-base">Email</div>
                    <a href="mailto:yaswanthd161@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base break-all">
                      yaswanthd161@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-semibold text-sm md:text-base">Phone</div>
                    <a href="tel:+919542310266" className="text-green-400 hover:text-green-300 transition-colors text-sm md:text-base">
                      +91 9542310266
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-semibold text-sm md:text-base">Location</div>
                    <div className="text-gray-400 text-sm md:text-base">Kakinada, Andhra Pradesh, India</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 md:space-x-4 lg:space-x-3 xl:space-x-4">
                <a 
                  href="https://www.linkedin.com/in/yaswanthd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-700 to-blue-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </a>
                <a 
                  href="https://github.com/yaswanth-yashu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </a>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Have a project in mind? Let's discuss!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <input 
                      type="email" 
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  >
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-black/40 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              YASWANTH DHARMAVARAPU
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Yaswanth Dharmavarapu. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Crafted with passion and precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
