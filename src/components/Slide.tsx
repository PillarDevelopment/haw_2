'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface SlideProps {
  title: string;
  subtitle?: string;
  content?: string;
  background: string;
  children?: ReactNode;
  isFirstSlide?: boolean;
  isTransitioning?: boolean;
  isIntenseFlash?: boolean;
}

interface Particle {
  x: number;
  y: number;
  duration: number;
  size: number;
  opacity: number;
  color: string;
}

interface Connection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

const generateLightningPath = (startX: number, startY: number, endX: number, endY: number): string => {
  const points = [];
  points.push(`M ${startX} ${startY}`);
  
  const segments = 4; // Number of lightning segments
  const dx = (endX - startX) / segments;
  const dy = (endY - startY) / segments;
  
  for (let i = 1; i < segments; i++) {
    const offset = (Math.random() - 0.5) * 50; // Random offset for zigzag effect
    points.push(`L ${startX + dx * i + offset} ${startY + dy * i + offset}`);
  }
  
  points.push(`L ${endX} ${endY}`);
  return points.join(' ');
};

const GlobalPaymentEffect = () => {
  const [nodes, setNodes] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Create payment nodes (cities/points)
    const newNodes = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 2 + 1,
      size: Math.random() * 6 + 4,
      opacity: Math.random() * 0.5 + 0.5,
      color: `rgba(0, 255, ${Math.random() * 155 + 100}, ${Math.random() * 0.5 + 0.5})`
    }));
    setNodes(newNodes);

    // Create connections between nodes
    const newConnections = [];
    for (let i = 0; i < 20; i++) {
      const startNode = newNodes[Math.floor(Math.random() * newNodes.length)];
      const endNode = newNodes[Math.floor(Math.random() * newNodes.length)];
      newConnections.push({
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      });
    }
    setConnections(newConnections);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Payment nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute rounded-full"
          style={{
            width: node.size,
            height: node.size,
            backgroundColor: node.color,
            filter: 'blur(2px)',
            x: node.x,
            y: node.y
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [node.opacity, node.opacity * 1.5, node.opacity]
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Lightning connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map((connection, i) => (
          <g key={`connection-${i}`}>
            {/* Base lightning path */}
            <motion.path
              d={generateLightningPath(connection.startX, connection.startY, connection.endX, connection.endY)}
              stroke="rgba(0, 255, 200, 0.3)"
              strokeWidth="1"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: connection.duration,
                delay: connection.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Bright core of the lightning */}
            <motion.path
              d={generateLightningPath(connection.startX, connection.startY, connection.endX, connection.endY)}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: connection.duration * 0.8,
                delay: connection.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// Animated Earth Component
const AnimatedEarth = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      <div className="relative w-[150vh] h-[150vh]">
        {/* Earth base */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-900"
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear" 
            },
            scale: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          {/* Rest of AnimatedEarth component code */}
        </motion.div>
      </div>
    </div>
  );
};

// World Map Infographic with Blocked Payments Animation
const WorldMapInfographic = () => {
  const [blockedPayments, setBlockedPayments] = useState<Array<{from: [number, number], to: [number, number], id: number}>>([]);
  
  useEffect(() => {
    // Define coordinates for countries and global financial centers
    const sanctionedCountries: Record<string, [number, number]> = {
      russia: [130, 35],
      iran: [125, 85],
      venezuela: [30, 110],
      northKorea: [190, 60]
    };
    
    const financialCenters: Array<[number, number]> = [
      [60, 50],   // London
      [70, 62],   // Frankfurt
      [72, 45],   // Amsterdam
      [83, 75],   // Zurich
      [90, 90],   // Milan
      [48, 48]    // Dublin
    ];
    
    // Generate blocked payments animation data
    const generateBlockedPayments = (): Array<{from: [number, number], to: [number, number], id: number}> => {
      const newBlockedPayments: Array<{from: [number, number], to: [number, number], id: number}> = [];
      let id = 0;
      
      Object.values(sanctionedCountries).forEach(country => {
        // Each sanctioned country attempts payments to 2-3 financial centers
        const targetCenters = [...financialCenters]
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 2) + 2);
        
        targetCenters.forEach(center => {
          newBlockedPayments.push({
            from: country,
            to: center,
            id: id++
          });
        });
      });
      
      return newBlockedPayments;
    };
    
    setBlockedPayments(generateBlockedPayments());
    
    // Periodically regenerate the blocked payments
    const interval = setInterval(() => {
      setBlockedPayments(generateBlockedPayments());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[90%] h-[80%]">
        {/* Europe map SVG */}
        <svg viewBox="0 0 200 150" className="w-full h-full">
          {/* Map background */}
          <rect x="0" y="0" width="200" height="150" fill="#1A365D" />
          
          {/* Ocean */}
          <path 
            d="M0,0 L0,150 L200,150 L200,0 Z" 
            fill="#2A4365" 
          />
          
          {/* Europe continent */}
          <path 
            d="M40,30 L35,35 L45,45 L50,50 L47,55 L48,60 L55,65 L65,62 L70,65 L75,70 L85,75 L95,72 L100,75 L105,70 L110,68 L115,65 L120,60 L125,55 L122,50 L118,45 L110,40 L107,35 L105,30 L100,25 L95,27 L90,30 L85,32 L75,33 L65,30 L60,32 L50,30 L45,28 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Iberian Peninsula */}
          <path 
            d="M40,60 L42,65 L45,70 L50,75 L55,80 L60,82 L65,80 L68,75 L67,70 L65,65 L60,62 L55,60 L50,58 L45,55 L42,57 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Italy */}
          <path 
            d="M80,65 L85,70 L87,75 L90,80 L92,85 L95,90 L97,95 L95,100 L90,98 L88,95 L85,90 L83,85 L82,80 L80,75 L78,70 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Balkans */}
          <path 
            d="M90,65 L95,70 L100,72 L105,75 L110,78 L108,82 L105,85 L102,90 L98,92 L95,88 L92,85 L90,80 L88,75 L87,70 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Scandinavian Peninsula */}
          <path 
            d="M75,20 L80,22 L85,25 L87,30 L90,28 L93,25 L95,20 L92,15 L88,12 L85,10 L80,8 L75,10 L70,15 L72,18 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* British Isles */}
          <path 
            d="M50,40 L55,42 L60,45 L63,47 L62,50 L58,52 L53,53 L50,51 L47,48 L45,44 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          <path 
            d="M45,40 L48,43 L47,46 L44,47 L42,45 L43,42 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Russia - large part extending east */}
          <path 
            d="M120,20 L125,25 L130,30 L140,35 L150,38 L160,40 L170,38 L180,35 L190,30 L195,25 L198,20 L195,15 L190,10 L185,8 L175,7 L165,8 L155,10 L145,15 L135,18 L128,15 L125,17 Z" 
            fill="#3F5F85" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Black Sea */}
          <path 
            d="M115,70 L120,75 L125,80 L130,82 L135,80 L138,75 L135,70 L130,68 L125,65 L120,67 Z" 
            fill="#2A4365" 
            stroke="#4A5568" 
            strokeWidth="0.3" 
          />
          
          {/* Mediterranean Sea */}
          <path 
            d="M60,85 L70,88 L80,90 L90,95 L100,98 L110,100 L120,98 L125,95 L120,92 L115,90 L110,88 L105,87 L100,85 L95,84 L90,85 L85,83 L80,82 L75,83 L70,82 L65,83 Z" 
            fill="#2A4365" 
            stroke="#4A5568" 
            strokeWidth="0.3" 
          />
          
          {/* North Africa */}
          <path 
            d="M40,95 L50,100 L60,103 L70,105 L80,107 L90,108 L100,110 L110,107 L120,105 L130,102 L135,100 L130,95 L125,90 L120,88 L115,87 L110,85 L105,83 L100,82 L95,83 L90,82 L85,80 L80,81 L75,80 L70,78 L65,80 L60,83 L55,85 L50,90 L45,92 Z" 
            fill="#4A5568" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Middle East region */}
          <path 
            d="M130,85 L135,90 L140,95 L145,100 L150,98 L155,95 L160,90 L158,85 L155,80 L150,75 L145,70 L140,65 L135,67 L130,70 L128,75 L125,80 Z" 
            fill="#4A5568" 
            stroke="#4A5568" 
            strokeWidth="0.5" 
          />
          
          {/* Sanctioned countries in red */}
          <circle cx="130" cy="35" r="8" fill="#E53E3E" opacity="0.8" /> {/* Russia */}
          <text x="130" y="35" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold">RU</text>
          
          <circle cx="125" cy="85" r="6" fill="#E53E3E" opacity="0.8" /> {/* Iran */}
          <text x="125" y="85" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold">IR</text>
          
          <circle cx="30" cy="110" r="6" fill="#E53E3E" opacity="0.8" /> {/* Venezuela (off map, but indicated) */}
          <text x="30" y="110" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold">VE</text>
          
          <circle cx="190" cy="60" r="6" fill="#E53E3E" opacity="0.8" /> {/* North Korea (off map, but indicated) */}
          <text x="190" y="60" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold">NK</text>
          
          {/* Financial centers */}
          {[
            [60, 50],   // London
            [70, 62],   // Frankfurt
            [72, 45],   // Amsterdam
            [83, 75],   // Zurich
            [90, 90],   // Milan
            [48, 48]    // Dublin
          ].map((center, i) => (
            <g key={`center-${i}`}>
              <circle cx={center[0]} cy={center[1]} r="2" fill="#4FD1C5" />
              <motion.circle 
                cx={center[0]} 
                cy={center[1]} 
                r="2" 
                fill="transparent" 
                stroke="#4FD1C5" 
                strokeWidth="0.5"
                initial={{ r: "2" }}
                animate={{ r: "4" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }}
              />
              <text x={center[0]} y={center[1] - 4} fill="white" fontSize="2.5" textAnchor="middle">
                {
                  i === 0 ? "London" :
                  i === 1 ? "Frankfurt" :
                  i === 2 ? "Amsterdam" :
                  i === 3 ? "Zurich" :
                  i === 4 ? "Milan" :
                  "Dublin"
                }
              </text>
            </g>
          ))}
          
          {/* Blocked payments animations */}
          {blockedPayments.map((payment) => (
            <g key={`payment-${payment.id}`}>
              <motion.path
                d={`M ${payment.from[0]} ${payment.from[1]} L ${(payment.from[0] + payment.to[0])/2} ${(payment.from[1] + payment.to[1])/2}`}
                stroke="#F56565"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 + Math.random() * 2, repeat: 1, repeatType: "reverse" }}
              />
              
              <motion.path
                d={`M ${(payment.from[0] + payment.to[0])/2} ${(payment.from[1] + payment.to[1])/2} L ${payment.to[0]} ${payment.to[1]}`}
                stroke="#F56565"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 0.9, 0.1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  delay: 2,
                  repeat: 1, 
                  repeatDelay: 1
                }}
              />
              
              {/* X mark for blocked payments */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 3.5 + Math.random() }}
              >
                <line 
                  x1={payment.to[0] - 3} 
                  y1={payment.to[1] - 3} 
                  x2={payment.to[0] + 3} 
                  y2={payment.to[1] + 3} 
                  stroke="#FC8181" 
                  strokeWidth="1.2" 
                />
                <line 
                  x1={payment.to[0] - 3} 
                  y1={payment.to[1] + 3} 
                  x2={payment.to[0] + 3} 
                  y2={payment.to[1] - 3} 
                  stroke="#FC8181" 
                  strokeWidth="1.2" 
                />
              </motion.g>
            </g>
          ))}
          
          {/* Country borders - simple lines to represent some main divisions */}
          <path d="M60,45 L65,55 L70,62" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* France-Germany border */}
          <path d="M70,62 L80,65" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Germany-Italy border */}
          <path d="M70,62 L75,55 L80,50" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Germany-Poland border */}
          <path d="M80,50 L90,45 L100,40" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Poland-Belarus border */}
          <path d="M100,40 L110,45 L120,50" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Belarus-Russia border */}
          <path d="M80,50 L85,60 L90,65" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Poland-Slovakia-Hungary border */}
          <path d="M90,65 L95,70 L100,72" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Hungary-Romania border */}
          <path d="M100,72 L105,75 L110,78" stroke="#CBD5E0" strokeWidth="0.2" fill="none" /> {/* Romania-Bulgaria border */}
          
          {/* Text overlay */}
          <text x="100" y="135" fill="white" fontSize="6" textAnchor="middle" fontWeight="bold">
            68% компаний из РФ столкнулись с отказами в платежах
          </text>
        </svg>
        
        {/* Businessman quote */}
        <motion.div 
          className="absolute top-0 right-0 bg-gray-800/80 p-4 rounded-lg border border-gray-700 w-52"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-300 font-medium">Бизнесмен</p>
              <p className="text-xs text-gray-400">Импортёр оборудования</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-300 italic">
            "Мой банк заблокировал платеж в Китай. Что делать?"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Slide = ({ title, subtitle, content, background, children, isFirstSlide, isTransitioning, isIntenseFlash }: SlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles only on client side
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: isFirstSlide ? 100 : 50 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 15 + 10,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: isFirstSlide ? `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})` : 'rgba(255, 255, 255, 0.2)'
      }));
      setParticles(newParticles);
    }

    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFirstSlide]);

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 flex flex-col items-center justify-center ${background} overflow-hidden`}
    >
      {/* Earth background for first slide */}
      {isFirstSlide && <AnimatedEarth />}
      
      {/* World Map infographic for second slide */}
      {title === "Боль рынка" && <WorldMapInfographic />}

      {/* Animated background elements for all slides */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* Global payment network effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </motion.div>

      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Animated connection lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * dimensions.width}
              y1={Math.random() * dimensions.height}
              x2={Math.random() * dimensions.width}
              y2={Math.random() * dimensions.height}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full particle"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: [0, 1, 0],
              opacity: [0, particle.opacity, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Global payment visualization for first slide */}
      {isFirstSlide && <GlobalPaymentEffect />}

      <div className="slide-content">
        <div className="slide-text">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2 
            }}
            className={`text-8xl font-bold mb-8 gradient-text glow ${
              isFirstSlide ? 'tracking-tight' : ''
            }`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.4 
              }}
              className={`text-4xl text-gray-300 mb-12 font-light glow ${
                isFirstSlide ? 'tracking-wide' : ''
              }`}
            >
              {subtitle}
            </motion.p>
          )}
          {content && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6 
              }}
              className={`text-4xl font-medium leading-relaxed glow ${
                isFirstSlide ? 'text-gray-400' : ''
              }`}
            >
              {content}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8 
              }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-white/5 rounded-full" />
      </motion.div>

      {/* Flash Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            <motion.div
              className="fixed inset-0 bg-white pointer-events-none z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.1,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="fixed inset-0 bg-white pointer-events-none z-[99]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut",
                delay: 0.05
              }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Slide; 