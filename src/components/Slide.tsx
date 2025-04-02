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
  isMirrorEffect?: boolean;
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
  
  useEffect(() => {
    const updateDimensions = () => {
      // Не используем setDimensions, так как эта переменная не нужна
    };

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
  const [showStatText, setShowStatText] = useState(false);
  
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
    
    // Show statistics text after animation completes
    const statTimer = setTimeout(() => {
      setShowStatText(true);
    }, 6000);
    
    // Periodically regenerate the blocked payments
    const interval = setInterval(() => {
      setBlockedPayments(generateBlockedPayments());
      setShowStatText(false);
      
      // Show statistics text after each new animation completes
      setTimeout(() => {
        setShowStatText(true);
      }, 6000);
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(statTimer);
    };
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
        </svg>
        
        {/* Statistics text that appears after animation */}
        <AnimatePresence>
          {showStatText && (
            <motion.div 
              className="absolute bottom-5 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="bg-black/70 px-8 py-4 rounded-xl border border-red-800">
                <h2 className="text-5xl font-bold text-white text-center">
                  В 2024 году 68% компаний из РФ столкнулись с отказами в платежах
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
            &quot;Мой банк заблокировал платеж в Китай. Что делать?&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Mission Impossible style visualization component
const MissionImpossibleVisualization = () => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  
  useEffect(() => {
    // Show checkmark after a delay
    const timer = setTimeout(() => {
      setShowCheckmark(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      <div className="relative w-[90%] max-w-5xl pt-40">
        {/* Background grid pattern inspired by Mission Impossible */}
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,120,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(0,255,120,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </motion.div>
        
        {/* Connection lines */}
        <svg className="absolute w-full h-full top-0 left-0 z-0">
          <motion.path
            d="M 250,130 L 490,130"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 550,130 L 790,130"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
        </svg>
        
        <div className="flex justify-between items-center h-60">
          {/* Bank Node */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="relative w-32 h-32 bg-red-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
              <motion.div
                className="absolute inset-[6px] rounded-full border-[3px] border-dashed border-red-500/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="text-7xl z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
              </motion.div>
              
              {/* Red cross animation */}
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCheckmark ? 0 : 1, scale: showCheckmark ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute w-12 h-3 bg-red-600 rounded-md top-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 45 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                  <motion.div
                    className="absolute w-12 h-3 bg-red-600 rounded-md top-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -45 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                </div>
              </motion.div>
              
              {/* Green checkmark animation */}
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showCheckmark ? 1 : 0, scale: showCheckmark ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute w-8 h-3 bg-green-500 rounded-md"
                    style={{ top: '5px', left: '-5px' }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 45 }}
                  />
                  <motion.div
                    className="absolute w-12 h-3 bg-green-500 rounded-md"
                    style={{ top: '0px', left: '0px' }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -45 }}
                  />
                </div>
              </motion.div>
            </div>
            <motion.div
              className="text-white text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
            </motion.div>
            <motion.div
              className="text-gray-300 text-sm mt-1 max-w-[180px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
            </motion.div>
          </motion.div>
          
          {/* Platform Node */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          >
            <div className="w-32 h-32 bg-green-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
              <motion.div
                className="absolute inset-[6px] rounded-full border-[3px] border-dashed border-green-500/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="relative text-6xl z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="relative">
                  <span>🛡️</span>
                  {/* Small check icon */}
                  <motion.span
                    className="absolute -top-2 -right-2 text-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.3 }}
                  >
                  </motion.span>
                </div>
              </motion.div>

              {/* Add a separate animation for the bounce effect */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  delay: 1.5,
                  duration: 0.7, 
                  ease: "easeInOut"
                }}
              />

              {/* Add a separate animation for the rotation */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ 
                  delay: 1.8,
                  duration: 0.5, 
                  ease: "easeInOut"
                }}
              />
            </div>
            <motion.div
              className="text-white text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
            </motion.div>
            <motion.div
              className="text-gray-300 text-sm mt-1 max-w-[180px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
            </motion.div>
          </motion.div>
          
          {/* Crypto Wallet Node */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
          >
            <div className="w-32 h-32 bg-blue-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
              <motion.div
                className="absolute inset-[6px] rounded-full border-[3px] border-dashed border-blue-500/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear", direction: "reverse" }}
              />
              <motion.div
                className="text-7xl z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.3, type: "spring" }}
              >
              </motion.div>

              {/* Add a separate animation for the rotation */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ rotate: 0 }}
                animate={{ rotate: [-10, 10, -5, 5, 0] }}
                transition={{ 
                  delay: 2.8,
                  duration: 0.8, 
                  ease: "easeInOut"
                }}
              />
            </div>
            <motion.div
              className="text-white text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
            </motion.div>
            <motion.div
              className="text-gray-300 text-sm mt-1 max-w-[180px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
            >
            </motion.div>
          </motion.div>
        </div>
        
        {/* Code-like elements */}
        <motion.div
          className="absolute -bottom-10 left-0 w-full overflow-hidden h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.pre
            className="text-green-500 text-xs font-mono"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {`>> Initializing secure bridge protocol...
>> Connection established. Transaction success rate: 99.8%
>> Smart contract deployed: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
>> Funds transfer complete. Untraceable. Secure. Fast.`}
          </motion.pre>
        </motion.div>
      </div>
    </div>
  );
};

const Slide = ({ title, subtitle, content, background, children, isFirstSlide, isTransitioning, isIntenseFlash, isMirrorEffect }: SlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      // Нет необходимости обновлять dimensions, так как не используем эту переменную
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles only on client side
    if (typeof window !== 'undefined') {
      // setParticles не нужен, так как переменная не используется
      // const newParticles = Array.from({ length: isFirstSlide ? 100 : 50 }).map(() => ({
      //   x: Math.random() * window.innerWidth,
      //   y: Math.random() * window.innerHeight,
      //   duration: Math.random() * 15 + 10,
      //   size: Math.random() * 4 + 1,
      //   opacity: Math.random() * 0.5 + 0.2,
      //   color: isFirstSlide ? `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})` : 'rgba(255, 255, 255, 0.2)'
      // }));
      // setParticles(newParticles);
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
      
      {/* Mission Impossible visualization for the "Решение" slide */}
      {title === "Решение" && <MissionImpossibleVisualization />}

      {/* Mirror Effect for the mirror slide */}
      {isMirrorEffect && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Reflective surface with perspective */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-black/70">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_30px] transform rotate-x-60 perspective-900 skew-y-6 translate-z-0 opacity-20" />
            </motion.div>
            
            {/* Reflection lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`reflection-${i}`}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ top: `${15 + i * 10}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 0.8, 1, 0],
                  opacity: [0, 0.4, 0.3, 0.5, 0]
                }}
                transition={{ 
                  duration: 6 + i * 0.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: i * 0.5
                }}
              />
            ))}
            
            {/* Reflection glints */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`glint-${i}`}
                className="absolute w-[2px] h-[2px] bg-white rounded-full"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: Math.random() * 5 
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Animated background elements for all slides */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* Global payment visualization for first slide */}
      {isFirstSlide && <GlobalPaymentEffect />}

      <div className="slide-content relative">
        {/* Mirror effect divider line */}
        {isMirrorEffect && (
          <motion.div 
            className="absolute left-0 right-0 h-[2px] bottom-[-80px]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
            
            {/* Water ripple effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-px"
              animate={{ 
                opacity: [0, 0.7, 0],
                scaleX: [0.3, 1, 0.7],
                x: [-50, 0, 50]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                repeatType: "loop"
              }}
            />
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent h-px"
              animate={{ 
                opacity: [0, 0.5, 0],
                scaleX: [0.5, 0.8, 0.3],
                x: [30, 0, -30]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                repeatType: "loop",
                delay: 1
              }}
            />
          </motion.div>
        )}

        <div className={`slide-text ${isMirrorEffect ? 'bg-black/40 px-16 py-10 rounded-2xl backdrop-blur-lg' : ''}`}>
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
            } ${
              isMirrorEffect ? 'text-center text-red-500' : ''
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
              } ${
                isMirrorEffect ? 'text-center text-white' : ''
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

      {/* Reflection effect - render a mirrored, semi-transparent, and distorted copy of the content below */}
      {isMirrorEffect && (
        <motion.div 
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ top: '55%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        >
          {/* Water ripple effect overlay */}
          <motion.div
            className="absolute inset-0 z-10 opacity-30"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='0.5' d='M0,10 Q25,5 50,10 T100,10'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 20px'
            }}
            animate={{
              backgroundPositionX: ['0px', '100px'],
              backgroundPositionY: ['0px', '5px', '0px', '-5px', '0px']
            }}
            transition={{
              x: { duration: 10, repeat: Infinity, ease: "linear" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            className="absolute inset-0 backdrop-blur-[1.5px]"
            animate={{
              backdropFilter: ['blur(1.5px)', 'blur(2px)', 'blur(1.7px)', 'blur(1.3px)', 'blur(1.5px)']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center transform scale-y-[-1] origin-top"
            style={{ 
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)'
            }}
          >
            <div className="slide-content relative z-0 transform translate-y-[-50%]">
              <div className="slide-text">
                <h1 className={`text-8xl font-bold mb-8 gradient-text ${isMirrorEffect ? 'text-center text-red-500/70' : ''}`}>
                  {title}
                </h1>
                {content && (
                  <p className={`text-4xl font-medium leading-relaxed ${isMirrorEffect ? 'text-center text-white/50' : ''}`}>
                    {content}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Occasional water drop ripples */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute w-0 h-0 bg-transparent border-[5px] border-white/20 rounded-full z-20"
              style={{ 
                left: `${20 + Math.random() * 60}%`, 
                top: `${Math.random() * 70}%`
              }}
              initial={{ width: 0, height: 0, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ 
                width: ['0px', '100px'],
                height: ['0px', '100px'],
                opacity: [0, 0.5, 0],
                border: ['5px solid rgba(255,255,255,0.2)', '1px solid rgba(255,255,255,0)']
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5 + Math.random() * 10,
                delay: i * 3,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}

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
            {isIntenseFlash ? (
              // Intense flash effect for transition from slide 1 to 2
              <>
                <motion.div
                  className="fixed inset-0 bg-white pointer-events-none z-[100]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.05,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="fixed inset-0 bg-white pointer-events-none z-[99]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="fixed inset-0 bg-white pointer-events-none z-[98]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.25,
                    ease: "easeOut",
                    delay: 0.05
                  }}
                />
              </>
            ) : (
              // Normal flash effect for other transitions
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
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Slide; 