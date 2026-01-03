(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Dayflow/lib/motion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Framer Motion animation variants for Dayflow HRMS
// Conservative, professional animations - no bounce, no playful motion
__turbopack_context__.s([
    "buttonHover",
    ()=>buttonHover,
    "buttonTap",
    ()=>buttonTap,
    "cardHover",
    ()=>cardHover,
    "containerVariants",
    ()=>containerVariants,
    "dialogContent",
    ()=>dialogContent,
    "dialogOverlay",
    ()=>dialogOverlay,
    "fadeIn",
    ()=>fadeIn,
    "fadeInDown",
    ()=>fadeInDown,
    "fadeInUp",
    ()=>fadeInUp,
    "gentleSpring",
    ()=>gentleSpring,
    "itemVariants",
    ()=>itemVariants,
    "pageTransition",
    ()=>pageTransition,
    "reducedMotion",
    ()=>reducedMotion,
    "scaleIn",
    ()=>scaleIn,
    "sidebarTransition",
    ()=>sidebarTransition,
    "slideInLeft",
    ()=>slideInLeft,
    "slideInRight",
    ()=>slideInRight,
    "smoothSpring",
    ()=>smoothSpring,
    "staggerContainer",
    ()=>staggerContainer,
    "staggerItem",
    ()=>staggerItem
]);
const fadeIn = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
};
const fadeInUp = {
    initial: {
        opacity: 0,
        y: 16
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -8
    }
};
const fadeInDown = {
    initial: {
        opacity: 0,
        y: -16
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: 8
    }
};
const scaleIn = {
    initial: {
        opacity: 0,
        scale: 0.96
    },
    animate: {
        opacity: 1,
        scale: 1
    },
    exit: {
        opacity: 0,
        scale: 0.98
    }
};
const slideInLeft = {
    initial: {
        opacity: 0,
        x: -24
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: -12
    }
};
const slideInRight = {
    initial: {
        opacity: 0,
        x: 24
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: 12
    }
};
const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};
const staggerItem = {
    initial: {
        opacity: 0,
        y: 12
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
const pageTransition = {
    initial: {
        opacity: 0,
        y: 12
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: {
            duration: 0.25,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
const dialogOverlay = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15
        }
    }
};
const dialogContent = {
    initial: {
        opacity: 0,
        scale: 0.96,
        y: 8
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.15,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
const sidebarTransition = {
    type: "tween",
    duration: 0.3,
    ease: [
        0.25,
        0.1,
        0.25,
        1
    ]
};
const buttonHover = {
    scale: 1.02,
    transition: {
        duration: 0.15
    }
};
const buttonTap = {
    scale: 0.98,
    transition: {
        duration: 0.1
    }
};
const cardHover = {
    y: -2,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    transition: {
        duration: 0.2,
        ease: "easeOut"
    }
};
const reducedMotion = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
};
const gentleSpring = {
    type: "spring",
    stiffness: 300,
    damping: 30
};
const smoothSpring = {
    type: "spring",
    stiffness: 200,
    damping: 25
};
const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 16
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Motion System Configuration
 * 
 * Defines timing constraints, transform limits, easing functions, and performance settings
 * for the Dayflow HRMS Motion System using GSAP.
 */ __turbopack_context__.s([
    "defaultMotionConfig",
    ()=>defaultMotionConfig
]);
const defaultMotionConfig = {
    enabled: true,
    reducedMotion: false,
    deviceType: 'desktop',
    timing: {
        maxDuration: 600,
        minDuration: 150,
        staggerStep: 80
    },
    transforms: {
        maxTranslateX: 40,
        maxTranslateY: 40,
        maxScale: 1.05,
        minOpacity: 0.85
    },
    easing: {
        primary: 'power2.out',
        secondary: 'power1.out'
    },
    performance: {
        fpsThreshold: 50,
        monitoringEnabled: true
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Device Adapter
 * 
 * Detects device type and adapts animation behavior for responsive motion.
 * 
 * Requirements:
 * - 14.1: Desktop enables full motion capabilities
 * - 14.2: Tablet reduces motion intensity by factor of 0.7
 * - 14.3: Mobile disables ScrollTrigger animations
 * - 14.5: Apply motion scaling to transforms and duration
 */ __turbopack_context__.s([
    "DeviceAdapter",
    ()=>DeviceAdapter
]);
class DeviceAdapter {
    deviceType;
    motionScale;
    constructor(){
        this.deviceType = this.detectDevice();
        this.motionScale = this.getMotionScale();
    }
    /**
   * Detect device type based on window width
   * 
   * Requirements:
   * - 14.1: Desktop >= 1024px
   * - 14.2: Tablet >= 768px and < 1024px
   * - 14.3: Mobile < 768px
   */ detectDevice() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const width = window.innerWidth;
        if (width < 768) {
            return 'mobile';
        } else if (width < 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }
    /**
   * Get motion scale factor based on device type
   * 
   * Requirements:
   * - 14.1: Desktop = 1.0 (full motion)
   * - 14.2: Tablet = 0.7 (reduced motion)
   * - 14.3: Mobile = 0.0 (no motion)
   */ getMotionScale() {
        switch(this.deviceType){
            case 'desktop':
                return 1.0;
            case 'tablet':
                return 0.7;
            case 'mobile':
                return 0.0;
            default:
                return 1.0;
        }
    }
    /**
   * Check if ScrollTrigger should be enabled
   * 
   * Requirements:
   * - 14.3: Disable ScrollTrigger on mobile
   */ shouldEnableScrollTrigger() {
        return this.deviceType !== 'mobile';
    }
    /**
   * Adapt animation options based on device type
   * Scales transforms and duration according to motion scale
   * 
   * Requirements:
   * - 14.5: Scale transforms and duration based on device
   */ adaptAnimation(options) {
        const scale = this.motionScale;
        // If motion is disabled (mobile), return no-op animation
        if (scale === 0) {
            return {
                ...options,
                duration: 0
            };
        }
        // Scale duration
        const adaptedDuration = options.duration ? options.duration * scale : undefined;
        // Scale transforms in from and to
        const adaptedFrom = options.from ? this.scaleTransforms(options.from, scale) : undefined;
        const adaptedTo = this.scaleTransforms(options.to, scale);
        return {
            ...options,
            from: adaptedFrom,
            to: adaptedTo,
            duration: adaptedDuration
        };
    }
    /**
   * Scale transform values (x, y) while preserving opacity and scale
   * 
   * @param vars - GSAP tween variables
   * @param scale - Motion scale factor
   * @returns Scaled tween variables
   */ scaleTransforms(vars, scale) {
        const scaled = {
            ...vars
        };
        // Scale translateX and translateY
        if (typeof scaled.x === 'number') {
            scaled.x = scaled.x * scale;
        }
        if (typeof scaled.y === 'number') {
            scaled.y = scaled.y * scale;
        }
        // Opacity and scale remain unchanged
        // (they are already subtle and don't need device-based scaling)
        return scaled;
    }
    /**
   * Get current device type
   */ getDeviceType() {
        return this.deviceType;
    }
    /**
   * Update device type (useful for resize events)
   */ updateDeviceType() {
        this.deviceType = this.detectDevice();
        this.motionScale = this.getMotionScale();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Performance Monitor
 * 
 * Tracks FPS (frames per second) using requestAnimationFrame and triggers
 * a callback when performance drops below a specified threshold.
 * 
 * Requirements:
 * - 15.5: Monitor frame rate and maintain minimum 50 FPS threshold
 * - 15.6: Disable motion system when FPS drops below threshold
 */ __turbopack_context__.s([
    "PerformanceMonitor",
    ()=>PerformanceMonitor
]);
class PerformanceMonitor {
    frameCount = 0;
    lastTime = 0;
    fpsHistory = [];
    rafId = null;
    threshold;
    onThresholdBreached;
    isRunning = false;
    /**
   * Create a new PerformanceMonitor
   * 
   * @param threshold - Minimum FPS threshold (default: 50)
   * @param onThresholdBreached - Callback to invoke when FPS drops below threshold
   */ constructor(threshold = 50, onThresholdBreached){
        this.threshold = threshold;
        this.onThresholdBreached = onThresholdBreached;
    }
    /**
   * Start monitoring FPS
   * 
   * Uses requestAnimationFrame to track frame rate and maintains
   * a rolling average of the last 60 FPS measurements.
   */ start() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fpsHistory = [];
        const measure = ()=>{
            if (!this.isRunning) {
                return;
            }
            const currentTime = performance.now();
            const delta = currentTime - this.lastTime;
            // Calculate FPS every second
            if (delta >= 1000) {
                const fps = Math.round(this.frameCount * 1000 / delta);
                this.fpsHistory.push(fps);
                // Keep only last 60 measurements (rolling window)
                if (this.fpsHistory.length > 60) {
                    this.fpsHistory.shift();
                }
                // Check if average FPS over last 10 frames is below threshold
                if (this.fpsHistory.length >= 10) {
                    const avgFps = this.getAverageFPS(10);
                    if (avgFps < this.threshold) {
                        this.onThresholdBreached();
                    }
                }
                // Reset counters
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            this.frameCount++;
            this.rafId = requestAnimationFrame(measure);
        };
        this.rafId = requestAnimationFrame(measure);
    }
    /**
   * Stop monitoring FPS
   */ stop() {
        this.isRunning = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
    /**
   * Get current FPS (most recent measurement)
   * 
   * @returns Current FPS or 0 if no measurements yet
   */ getCurrentFPS() {
        return this.fpsHistory.length > 0 ? this.fpsHistory[this.fpsHistory.length - 1] : 0;
    }
    /**
   * Calculate average FPS over the last N frames
   * 
   * @param frames - Number of recent frames to average (default: 10)
   * @returns Average FPS over the specified number of frames
   */ getAverageFPS(frames = 10) {
        if (this.fpsHistory.length === 0) {
            return 0;
        }
        const recentFrames = this.fpsHistory.slice(-frames);
        const sum = recentFrames.reduce((acc, fps)=>acc + fps, 0);
        return sum / recentFrames.length;
    }
    /**
   * Check if performance is acceptable based on threshold
   * 
   * @returns True if average FPS is above threshold
   */ isPerformanceAcceptable() {
        if (this.fpsHistory.length < 10) {
            // Not enough data yet, assume acceptable
            return true;
        }
        return this.getAverageFPS(10) >= this.threshold;
    }
    /**
   * Get the full FPS history
   * 
   * @returns Array of FPS measurements
   */ getFPSHistory() {
        return [
            ...this.fpsHistory
        ];
    }
    /**
   * Clear FPS history
   */ clearHistory() {
        this.fpsHistory = [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionSystemProvider",
    ()=>MotionSystemProvider,
    "useMotionSystem",
    ()=>useMotionSystem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Motion System Provider
 * 
 * React Context provider for the motion system that manages configuration,
 * accessibility detection, and animation lifecycle.
 * 
 * Requirements:
 * - 1.1: Animations never block interaction
 * - 1.2: Scroll-based animations are reversible
 * - 1.3: No infinite loops or autonomous animations
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const MotionSystemContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function MotionSystemProvider({ children, config: userConfig }) {
    _s();
    // Initialize DeviceAdapter
    const [deviceAdapter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MotionSystemProvider.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeviceAdapter"]()
    }["MotionSystemProvider.useState"]);
    // Merge user config with defaults and device detection
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MotionSystemProvider.useState": ()=>({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMotionConfig"],
                ...userConfig,
                deviceType: deviceAdapter.getDeviceType(),
                timing: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMotionConfig"].timing,
                    ...userConfig?.timing
                },
                transforms: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMotionConfig"].transforms,
                    ...userConfig?.transforms
                },
                easing: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMotionConfig"].easing,
                    ...userConfig?.easing
                },
                performance: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultMotionConfig"].performance,
                    ...userConfig?.performance
                }
            })
    }["MotionSystemProvider.useState"]);
    // Animation registry for lifecycle management
    const [animationRegistry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Performance monitor reference
    const performanceMonitorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Detect prefers-reduced-motion on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionSystemProvider.useEffect": ()=>{
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            // Set initial state
            setConfig({
                "MotionSystemProvider.useEffect": (prev)=>({
                        ...prev,
                        reducedMotion: mediaQuery.matches
                    })
            }["MotionSystemProvider.useEffect"]);
            // Listen for changes
            const handleChange = {
                "MotionSystemProvider.useEffect.handleChange": (e)=>{
                    setConfig({
                        "MotionSystemProvider.useEffect.handleChange": (prev)=>({
                                ...prev,
                                reducedMotion: e.matches
                            })
                    }["MotionSystemProvider.useEffect.handleChange"]);
                    // Kill all animations if reduced motion is enabled
                    if (e.matches) {
                        killAllAnimations();
                    }
                }
            }["MotionSystemProvider.useEffect.handleChange"];
            mediaQuery.addEventListener('change', handleChange);
            return ({
                "MotionSystemProvider.useEffect": ()=>{
                    mediaQuery.removeEventListener('change', handleChange);
                }
            })["MotionSystemProvider.useEffect"];
        }
    }["MotionSystemProvider.useEffect"], []);
    // Handle window resize to update device type
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionSystemProvider.useEffect": ()=>{
            const handleResize = {
                "MotionSystemProvider.useEffect.handleResize": ()=>{
                    deviceAdapter.updateDeviceType();
                    const newDeviceType = deviceAdapter.getDeviceType();
                    setConfig({
                        "MotionSystemProvider.useEffect.handleResize": (prev)=>{
                            if (prev.deviceType !== newDeviceType) {
                                return {
                                    ...prev,
                                    deviceType: newDeviceType
                                };
                            }
                            return prev;
                        }
                    }["MotionSystemProvider.useEffect.handleResize"]);
                }
            }["MotionSystemProvider.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "MotionSystemProvider.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                }
            })["MotionSystemProvider.useEffect"];
        }
    }["MotionSystemProvider.useEffect"], [
        deviceAdapter
    ]);
    /**
   * Check if animations should be enabled
   * Animations are disabled if:
   * - Global enabled flag is false
   * - User has reduced motion preference
   * - Device type is mobile (for scroll animations)
   */ const isAnimationEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MotionSystemProvider.useCallback[isAnimationEnabled]": ()=>{
            return config.enabled && !config.reducedMotion;
        }
    }["MotionSystemProvider.useCallback[isAnimationEnabled]"], [
        config.enabled,
        config.reducedMotion
    ]);
    /**
   * Register an animation timeline for lifecycle management
   */ const registerAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MotionSystemProvider.useCallback[registerAnimation]": (id, timeline)=>{
            animationRegistry.set(id, timeline);
        }
    }["MotionSystemProvider.useCallback[registerAnimation]"], [
        animationRegistry
    ]);
    /**
   * Unregister and cleanup a specific animation
   */ const unregisterAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MotionSystemProvider.useCallback[unregisterAnimation]": (id)=>{
            const timeline = animationRegistry.get(id);
            if (timeline) {
                // Kill the timeline if it has a kill method (GSAP timeline)
                if (typeof timeline.kill === 'function') {
                    timeline.kill();
                }
                animationRegistry.delete(id);
            }
        }
    }["MotionSystemProvider.useCallback[unregisterAnimation]"], [
        animationRegistry
    ]);
    /**
   * Kill all registered animations
   * Used for performance safeguards and accessibility
   */ const killAllAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MotionSystemProvider.useCallback[killAllAnimations]": ()=>{
            animationRegistry.forEach({
                "MotionSystemProvider.useCallback[killAllAnimations]": (timeline)=>{
                    if (timeline && typeof timeline.kill === 'function') {
                        timeline.kill();
                    }
                }
            }["MotionSystemProvider.useCallback[killAllAnimations]"]);
            animationRegistry.clear();
        }
    }["MotionSystemProvider.useCallback[killAllAnimations]"], [
        animationRegistry
    ]);
    // Cleanup all animations on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionSystemProvider.useEffect": ()=>{
            return ({
                "MotionSystemProvider.useEffect": ()=>{
                    killAllAnimations();
                }
            })["MotionSystemProvider.useEffect"];
        }
    }["MotionSystemProvider.useEffect"], [
        killAllAnimations
    ]);
    // Initialize and manage performance monitoring
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MotionSystemProvider.useEffect": ()=>{
            // Only start monitoring if enabled in config
            if (!config.performance.monitoringEnabled || !config.enabled) {
                return;
            }
            // Create performance monitor with threshold breach callback
            const monitor = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"](config.performance.fpsThreshold, {
                "MotionSystemProvider.useEffect": ()=>{
                    console.warn(`Performance threshold breached (FPS < ${config.performance.fpsThreshold}). Disabling motion system.`);
                    // Kill all animations
                    killAllAnimations();
                    // Disable motion system
                    setConfig({
                        "MotionSystemProvider.useEffect": (prev)=>({
                                ...prev,
                                enabled: false
                            })
                    }["MotionSystemProvider.useEffect"]);
                }
            }["MotionSystemProvider.useEffect"]);
            performanceMonitorRef.current = monitor;
            monitor.start();
            // Cleanup on unmount or when monitoring is disabled
            return ({
                "MotionSystemProvider.useEffect": ()=>{
                    if (performanceMonitorRef.current) {
                        performanceMonitorRef.current.stop();
                        performanceMonitorRef.current = null;
                    }
                }
            })["MotionSystemProvider.useEffect"];
        }
    }["MotionSystemProvider.useEffect"], [
        config.performance.monitoringEnabled,
        config.performance.fpsThreshold,
        config.enabled,
        killAllAnimations
    ]);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MotionSystemProvider.useMemo[contextValue]": ()=>({
                config,
                deviceAdapter,
                isAnimationEnabled,
                registerAnimation,
                unregisterAnimation,
                killAllAnimations
            })
    }["MotionSystemProvider.useMemo[contextValue]"], [
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation,
        killAllAnimations
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionSystemContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
_s(MotionSystemProvider, "sOsY+c/CqDOgPfLTHoSTVCRvYzE=");
_c = MotionSystemProvider;
function useMotionSystem() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MotionSystemContext);
    if (context === undefined) {
        throw new Error('useMotionSystem must be used within a MotionSystemProvider');
    }
    return context;
}
_s1(useMotionSystem, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "MotionSystemProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Animation Validation
 * 
 * Validates animation configurations against motion system constraints.
 * 
 * Requirements:
 * - 1.7: Prohibit elastic, bounce, and back easing functions
 * - 2.1: Maximum duration 600ms
 * - 2.2: Minimum duration 150ms
 * - 2.4: Validate durations before execution
 * - 3.1: Maximum translateY 40px
 * - 3.2: Maximum translateX 40px
 * - 3.3: Maximum scale 1.05
 * - 3.4: Minimum opacity 0.85
 * - 3.6: Validate transforms before execution
 */ __turbopack_context__.s([
    "validateAnimation",
    ()=>validateAnimation
]);
function validateAnimation(options, config) {
    let isValid = true;
    // Check duration constraints (Requirements 2.1, 2.2, 2.4)
    if (options.duration !== undefined) {
        if (options.duration < config.timing.minDuration) {
            console.warn(`[Motion System] Duration ${options.duration}ms is below minimum ${config.timing.minDuration}ms`);
            isValid = false;
        }
        if (options.duration > config.timing.maxDuration) {
            console.warn(`[Motion System] Duration ${options.duration}ms exceeds maximum ${config.timing.maxDuration}ms`);
            isValid = false;
        }
    }
    // Check forbidden easing functions (Requirement 1.7)
    const forbiddenEasings = [
        'elastic',
        'bounce',
        'back'
    ];
    if (options.easing) {
        const hasForbidenEasing = forbiddenEasings.some((forbidden)=>options.easing.toLowerCase().includes(forbidden));
        if (hasForbidenEasing) {
            console.warn(`[Motion System] Easing "${options.easing}" is forbidden. Use "power2.out" or "power1.out" instead.`);
            isValid = false;
        }
    }
    // Helper function to validate transforms in an object
    const validateTransforms = (transforms, label)=>{
        if (!transforms) return;
        // Check translateY limit (Requirement 3.1)
        if (transforms.y !== undefined) {
            const absY = Math.abs(transforms.y);
            if (absY > config.transforms.maxTranslateY) {
                console.warn(`[Motion System] ${label} translateY ${transforms.y}px exceeds limit of ±${config.transforms.maxTranslateY}px`);
                isValid = false;
            }
        }
        // Check translateX limit (Requirement 3.2)
        if (transforms.x !== undefined) {
            const absX = Math.abs(transforms.x);
            if (absX > config.transforms.maxTranslateX) {
                console.warn(`[Motion System] ${label} translateX ${transforms.x}px exceeds limit of ±${config.transforms.maxTranslateX}px`);
                isValid = false;
            }
        }
        // Check scale limit (Requirement 3.3)
        if (transforms.scale !== undefined) {
            if (transforms.scale > config.transforms.maxScale) {
                console.warn(`[Motion System] ${label} scale ${transforms.scale} exceeds maximum ${config.transforms.maxScale}`);
                isValid = false;
            }
        }
        // Check opacity minimum (Requirement 3.4)
        if (transforms.opacity !== undefined) {
            if (transforms.opacity < config.transforms.minOpacity) {
                console.warn(`[Motion System] ${label} opacity ${transforms.opacity} is below minimum ${config.transforms.minOpacity}`);
                isValid = false;
            }
        }
    };
    // Validate 'from' transforms (Requirement 3.6)
    validateTransforms(options.from, 'from');
    // Validate 'to' transforms (Requirement 3.6)
    validateTransforms(options.to, 'to');
    return isValid;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Animation Controller
 * 
 * Manages animation lifecycle, timeline registry, and validation.
 * 
 * Requirements:
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up all GSAP timelines on component unmount
 */ __turbopack_context__.s([
    "AnimationController",
    ()=>AnimationController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/validation.ts [app-client] (ecmascript)");
;
class AnimationController {
    timelines;
    config;
    /**
   * Creates a new AnimationController instance
   * 
   * @param config - Motion system configuration for validation
   */ constructor(config){
        this.timelines = new Map();
        this.config = config;
    }
    /**
   * Register an animation timeline for lifecycle management
   * 
   * Validates the animation options before registration.
   * If validation fails, the timeline is not registered.
   * 
   * @param id - Unique identifier for the animation
   * @param timeline - GSAP timeline to register
   * @param options - Animation options to validate (optional)
   * @returns true if registration succeeded, false if validation failed
   * 
   * Requirements:
   * - 17.1: Initialize animations on component mount
   * - Integrates validateAnimation() before registration
   */ register(id, timeline, options) {
        // Validate animation options if provided
        if (options) {
            const isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateAnimation"])(options, this.config);
            if (!isValid) {
                console.warn(`[AnimationController] Animation "${id}" failed validation and will not be registered`);
                return false;
            }
        }
        // Register the timeline
        this.timelines.set(id, timeline);
        return true;
    }
    /**
   * Unregister and cleanup a specific animation
   * 
   * Kills the timeline and removes it from the registry.
   * 
   * @param id - Unique identifier of the animation to unregister
   * 
   * Requirements:
   * - 17.2: Clean up GSAP timelines on component unmount
   */ unregister(id) {
        const timeline = this.timelines.get(id);
        if (timeline) {
            // Kill the timeline to stop and cleanup the animation
            timeline.kill();
            // Remove from registry
            this.timelines.delete(id);
        }
    }
    /**
   * Kill all registered animations
   * 
   * Stops and cleans up all timelines in the registry.
   * Used for performance safeguards and accessibility.
   * 
   * Requirements:
   * - 17.2: Clean up all GSAP timelines
   */ killAll() {
        // Kill each timeline
        this.timelines.forEach((timeline)=>{
            timeline.kill();
        });
        // Clear the registry
        this.timelines.clear();
    }
    /**
   * Get the number of registered animations
   * 
   * @returns Number of active animations in the registry
   */ getCount() {
        return this.timelines.size;
    }
    /**
   * Check if an animation is registered
   * 
   * @param id - Unique identifier of the animation
   * @returns true if the animation is registered, false otherwise
   */ has(id) {
        return this.timelines.has(id);
    }
    /**
   * Get a registered timeline by ID
   * 
   * @param id - Unique identifier of the animation
   * @returns The timeline if found, undefined otherwise
   */ get(id) {
        return this.timelines.get(id);
    }
    /**
   * Update the configuration used for validation
   * 
   * @param config - New motion system configuration
   */ updateConfig(config) {
        this.config = config;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Scroll Manager
 * 
 * Manages ScrollTrigger instances and scroll-based animation coordination.
 * 
 * Requirements:
 * - 16.1: Use GSAP ScrollTrigger library for scroll-based animations
 * - 16.4: Create separate ScrollTrigger instances for each major screen section
 * - 16.7: Clean up ScrollTrigger instances on component unmount
 */ __turbopack_context__.s([
    "ScrollManager",
    ()=>ScrollManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
class ScrollManager {
    triggers;
    /**
   * Creates a new ScrollManager instance
   */ constructor(){
        this.triggers = new Map();
    }
    /**
   * Create a ScrollTrigger instance
   * 
   * Creates and registers a ScrollTrigger with error handling for missing DOM elements.
   * 
   * @param id - Unique identifier for the ScrollTrigger
   * @param element - Target element for the ScrollTrigger
   * @param options - ScrollTrigger configuration options
   * @returns The created ScrollTrigger instance, or null if creation failed
   * 
   * Requirements:
   * - 16.1: Use GSAP ScrollTrigger library
   * - 16.4: Create separate ScrollTrigger instances for each section
   * - Error handling for missing DOM elements
   */ createTrigger(id, element, options) {
        try {
            // Validate element exists in DOM
            if (!element || !document.contains(element)) {
                console.warn(`[ScrollManager] Cannot create ScrollTrigger "${id}": element not found in DOM`);
                return null;
            }
            // Create ScrollTrigger instance
            const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                ...options,
                trigger: element,
                // Add refresh callback to validate element is still in DOM
                onRefreshInit: ()=>{
                    if (!document.contains(element)) {
                        console.warn(`[ScrollManager] ScrollTrigger "${id}" element removed from DOM during refresh`);
                        return false;
                    }
                }
            });
            // Register the trigger
            this.triggers.set(id, trigger);
            return trigger;
        } catch (error) {
            console.error(`[ScrollManager] Failed to create ScrollTrigger "${id}":`, error);
            return null;
        }
    }
    /**
   * Remove a specific ScrollTrigger
   * 
   * Kills the ScrollTrigger and removes it from the registry.
   * 
   * @param id - Unique identifier of the ScrollTrigger to remove
   * 
   * Requirements:
   * - 16.7: Clean up ScrollTrigger instances on component unmount
   */ removeTrigger(id) {
        const trigger = this.triggers.get(id);
        if (trigger) {
            // Kill the ScrollTrigger to stop and cleanup
            trigger.kill();
            // Remove from registry
            this.triggers.delete(id);
        }
    }
    /**
   * Refresh all ScrollTrigger instances
   * 
   * Recalculates ScrollTrigger positions after layout changes.
   * Useful after window resize, content changes, or dynamic loading.
   * 
   * Requirements:
   * - 16.1: Proper ScrollTrigger management
   */ refreshAll() {
        try {
            // Use ScrollTrigger's global refresh method
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh();
        } catch (error) {
            console.error('[ScrollManager] Failed to refresh ScrollTriggers:', error);
        }
    }
    /**
   * Kill all ScrollTrigger instances
   * 
   * Stops and cleans up all ScrollTriggers in the registry.
   * Used for performance safeguards, accessibility, and navigation cleanup.
   * 
   * Requirements:
   * - 16.7: Clean up ScrollTrigger instances
   */ killAll() {
        // Kill each ScrollTrigger
        this.triggers.forEach((trigger)=>{
            trigger.kill();
        });
        // Clear the registry
        this.triggers.clear();
    }
    /**
   * Get the number of registered ScrollTriggers
   * 
   * @returns Number of active ScrollTriggers in the registry
   */ getCount() {
        return this.triggers.size;
    }
    /**
   * Check if a ScrollTrigger is registered
   * 
   * @param id - Unique identifier of the ScrollTrigger
   * @returns true if the ScrollTrigger is registered, false otherwise
   */ has(id) {
        return this.triggers.has(id);
    }
    /**
   * Get a registered ScrollTrigger by ID
   * 
   * @param id - Unique identifier of the ScrollTrigger
   * @returns The ScrollTrigger if found, undefined otherwise
   */ get(id) {
        return this.triggers.get(id);
    }
    /**
   * Get all registered ScrollTrigger IDs
   * 
   * @returns Array of all registered ScrollTrigger IDs
   */ getIds() {
        return Array.from(this.triggers.keys());
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/gsap-setup.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * GSAP Setup and Configuration
 * 
 * This file initializes GSAP and registers plugins.
 * Import this file early in your application to ensure GSAP is properly configured.
 */ __turbopack_context__.s([
    "initializeGSAP",
    ()=>initializeGSAP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
;
// Register ScrollTrigger plugin
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
// Set global GSAP defaults
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].defaults({
    ease: 'power2.out',
    duration: 0.4
});
// Configure ScrollTrigger defaults
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].defaults({
    toggleActions: 'play none none none',
    markers: false
});
function initializeGSAP() {
    // Additional initialization if needed
    console.log('GSAP Motion System initialized');
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Accessibility Utilities for Motion System
 * 
 * Provides static fallback rendering for users with reduced motion preferences.
 * 
 * Requirements:
 * - 4.2: When reduced motion is enabled, apply final animation state immediately using gsap.set()
 * - 4.6: Maintain full functionality when animations are disabled
 */ __turbopack_context__.s([
    "applyStaticState",
    ()=>applyStaticState,
    "createAnimationOrStatic",
    ()=>createAnimationOrStatic,
    "shouldUseStaticRendering",
    ()=>shouldUseStaticRendering
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$gsap$2d$setup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/gsap-setup.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
function applyStaticState(target, finalState) {
    // Use gsap.set() to apply the final state immediately without animation
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(target, finalState);
}
function shouldUseStaticRendering(reducedMotion, enabled) {
    return !enabled || reducedMotion;
}
function createAnimationOrStatic(target, from, to, options, reducedMotion, enabled) {
    // If reduced motion is enabled or motion system is disabled, apply static state
    if (shouldUseStaticRendering(reducedMotion, enabled)) {
        applyStaticState(target, to);
        return null;
    }
    // Create animated timeline
    const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
    if (from) {
        // Use fromTo if initial state is provided
        timeline.fromTo(target, from, {
            ...to,
            duration: options.duration ? options.duration / 1000 : undefined,
            delay: options.delay ? options.delay / 1000 : undefined,
            stagger: options.stagger ? options.stagger / 1000 : undefined,
            ease: options.ease,
            ...options
        });
    } else {
        // Use to if only final state is provided
        timeline.to(target, {
            ...to,
            duration: options.duration ? options.duration / 1000 : undefined,
            delay: options.delay ? options.delay / 1000 : undefined,
            stagger: options.stagger ? options.stagger / 1000 : undefined,
            ease: options.ease,
            ...options
        });
    }
    return timeline;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Animation Hooks
 * 
 * React hooks for declarative animations using GSAP.
 * 
 * Requirements:
 * - 5.1, 5.2, 5.3: Authentication screen animations
 * - 5.4: Hover animations
 * - 6.1, 6.2, 6.3, 6.4: Dashboard scroll animations
 * - 7.5: Profile edit button hover
 * - 10.2: Leave approval button hover
 * - 16.1, 16.2, 16.3: ScrollTrigger integration
 * - 17.1: Initialize animations on component mount
 * - 17.2: Clean up timelines on component unmount
 */ __turbopack_context__.s([
    "useHoverAnimation",
    ()=>useHoverAnimation,
    "useMountAnimation",
    ()=>useMountAnimation,
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
;
;
function useMountAnimation(ref, options) {
    _s();
    const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(`mount-${Math.random().toString(36).substr(2, 9)}`);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMountAnimation.useEffect": ()=>{
            // Initialize controller if not already created
            if (!controllerRef.current) {
                controllerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationController"](config);
            }
            const element = ref.current;
            if (!element) return;
            const animationId = animationIdRef.current;
            // Check if animations are enabled
            if (!isAnimationEnabled()) {
                // Apply final state immediately without animation
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                return;
            }
            // Adapt animation based on device type
            const adaptedOptions = deviceAdapter.adaptAnimation({
                from: options.from,
                to: options.to,
                duration: options.duration,
                delay: options.delay,
                stagger: options.stagger
            });
            // If motion is disabled (mobile), apply final state
            if (adaptedOptions.duration === 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                return;
            }
            // Create GSAP timeline
            const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                delay: (adaptedOptions.delay || 0) / 1000
            });
            // Use fromTo for mount animations
            if (adaptedOptions.stagger) {
                // Stagger animation for multiple elements
                timeline.fromTo(element.children, adaptedOptions.from || {}, {
                    ...adaptedOptions.to,
                    duration: (adaptedOptions.duration || config.timing.minDuration) / 1000,
                    stagger: (adaptedOptions.stagger || config.timing.staggerStep) / 1000,
                    ease: config.easing.primary
                });
            } else {
                // Single element animation
                timeline.fromTo(element, adaptedOptions.from || {}, {
                    ...adaptedOptions.to,
                    duration: (adaptedOptions.duration || config.timing.minDuration) / 1000,
                    ease: config.easing.primary
                });
            }
            // Register timeline with AnimationController
            const animationOptions = {
                duration: adaptedOptions.duration,
                from: adaptedOptions.from,
                to: adaptedOptions.to
            };
            const registered = controllerRef.current.register(animationId, timeline, animationOptions);
            if (registered) {
                // Also register with context for global management
                registerAnimation(animationId, timeline);
            }
            // Cleanup function
            return ({
                "useMountAnimation.useEffect": ()=>{
                    if (controllerRef.current) {
                        controllerRef.current.unregister(animationId);
                    }
                    unregisterAnimation(animationId);
                }
            })["useMountAnimation.useEffect"];
        }
    }["useMountAnimation.useEffect"], [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation
    ]);
}
_s(useMountAnimation, "O/Fv90fWjZJ+g+Gdh/thgL25L1Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"]
    ];
});
function useHoverAnimation(ref, options) {
    _s1();
    const { config, deviceAdapter, isAnimationEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHoverAnimation.useEffect": ()=>{
            const element = ref.current;
            if (!element) return;
            // Check if animations are enabled
            if (!isAnimationEnabled()) {
                // No hover animation when animations are disabled
                return;
            }
            // Adapt animation based on device type
            const adaptedOptions = deviceAdapter.adaptAnimation({
                to: options.to,
                duration: options.duration
            });
            // If motion is disabled (mobile), no hover animation
            if (adaptedOptions.duration === 0) {
                return;
            }
            const duration = (adaptedOptions.duration || 200) / 1000; // Convert ms to seconds
            // Mouse enter handler
            const handleMouseEnter = {
                "useHoverAnimation.useEffect.handleMouseEnter": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        ...adaptedOptions.to,
                        duration,
                        ease: config.easing.secondary,
                        overwrite: 'auto'
                    });
                }
            }["useHoverAnimation.useEffect.handleMouseEnter"];
            // Mouse leave handler - reverse the animation
            const handleMouseLeave = {
                "useHoverAnimation.useEffect.handleMouseLeave": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                        // Reverse to original state
                        scale: 1,
                        x: 0,
                        y: 0,
                        opacity: 1,
                        // Preserve any other properties that might have been set
                        duration,
                        ease: config.easing.secondary,
                        overwrite: 'auto'
                    });
                }
            }["useHoverAnimation.useEffect.handleMouseLeave"];
            // Attach event listeners
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            // Cleanup function
            return ({
                "useHoverAnimation.useEffect": ()=>{
                    element.removeEventListener('mouseenter', handleMouseEnter);
                    element.removeEventListener('mouseleave', handleMouseLeave);
                    // Kill any ongoing animations on this element
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(element);
                }
            })["useHoverAnimation.useEffect"];
        }
    }["useHoverAnimation.useEffect"], [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled
    ]);
}
_s1(useHoverAnimation, "FA3iADBmpUQKa9VO05vY+H+1NL8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"]
    ];
});
function useScrollAnimation(ref, options) {
    _s2();
    const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(`scroll-${Math.random().toString(36).substr(2, 9)}`);
    const scrollManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollAnimation.useEffect": ()=>{
            // Initialize ScrollManager if not already created
            if (!scrollManagerRef.current) {
                scrollManagerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollManager"]();
            }
            const element = ref.current;
            if (!element) return;
            const animationId = animationIdRef.current;
            // Check if animations are enabled
            if (!isAnimationEnabled()) {
                // Apply final state immediately without animation
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                return;
            }
            // Check if ScrollTrigger should be disabled on mobile
            if (!deviceAdapter.shouldEnableScrollTrigger()) {
                // Apply final state on mobile (no scroll animations)
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                return;
            }
            // Adapt animation based on device type
            const adaptedOptions = deviceAdapter.adaptAnimation({
                from: options.from,
                to: options.to
            });
            // Create GSAP timeline for the animation
            // When scrub is enabled, animations are bidirectional (scroll up reverses)
            const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                scrollTrigger: {
                    trigger: options.trigger || element,
                    start: options.start || 'top 80%',
                    end: options.end || 'top 50%',
                    // scrub: true enables smooth scroll-linked animations
                    // scrub: number (e.g., 0.5) adds smoothing/lag to the animation
                    scrub: options.scrub !== undefined ? options.scrub : false,
                    pin: options.pin || false,
                    pinSpacing: options.pin ? true : false,
                    markers: false,
                    // Callbacks for lifecycle events
                    onEnter: {
                        "useScrollAnimation.useEffect.timeline": ()=>{
                        // Animation enters viewport (scrolling down)
                        }
                    }["useScrollAnimation.useEffect.timeline"],
                    onLeave: {
                        "useScrollAnimation.useEffect.timeline": ()=>{
                        // Animation leaves viewport (scrolling down)
                        }
                    }["useScrollAnimation.useEffect.timeline"],
                    onEnterBack: {
                        "useScrollAnimation.useEffect.timeline": ()=>{
                        // Animation re-enters viewport (scrolling up)
                        }
                    }["useScrollAnimation.useEffect.timeline"],
                    onLeaveBack: {
                        "useScrollAnimation.useEffect.timeline": ()=>{
                        // Animation leaves viewport (scrolling up)
                        }
                    }["useScrollAnimation.useEffect.timeline"]
                }
            });
            // Add animation to timeline
            timeline.fromTo(element, adaptedOptions.from || {}, {
                ...adaptedOptions.to,
                // When scrub is enabled, duration is normalized (0-1 represents scroll progress)
                // When scrub is disabled, use configured duration
                duration: options.scrub ? 1 : config.timing.minDuration / 1000,
                // When scrub is enabled, use 'none' easing for linear scroll-linked animation
                // When scrub is disabled, use configured easing for time-based animation
                ease: options.scrub ? 'none' : config.easing.primary
            });
            // Get the ScrollTrigger instance from the timeline
            const scrollTrigger = timeline.scrollTrigger;
            if (scrollTrigger) {
                // Note: We don't need to create a separate ScrollTrigger in ScrollManager
                // because the timeline already has one. We just track it for cleanup.
                // The ScrollTrigger is automatically bidirectional when scrub is enabled.
                // Register timeline with context for global management
                registerAnimation(animationId, timeline);
            }
            // Cleanup function
            return ({
                "useScrollAnimation.useEffect": ()=>{
                    // Unregister from context
                    unregisterAnimation(animationId);
                    // Kill the timeline (which also kills its associated ScrollTrigger)
                    timeline.kill();
                }
            })["useScrollAnimation.useEffect"];
        }
    }["useScrollAnimation.useEffect"], [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation
    ]);
}
_s2(useScrollAnimation, "ufM4M2c41HCDJH2AKNYAoG7BYf0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Motion System Exports
 * 
 * Central export point for the Dayflow HRMS Motion System
 * Built on GSAP with ScrollTrigger integration
 */ // Core providers and hooks
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-client] (ecmascript)");
// Animation hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/hooks.ts [app-client] (ecmascript)");
// Configuration
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/config.ts [app-client] (ecmascript)");
// Validation
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/validation.ts [app-client] (ecmascript)");
// Animation Controller
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-client] (ecmascript)");
// Scroll Manager
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-client] (ecmascript)");
// Device Adapter
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-client] (ecmascript)");
// Performance Monitor
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-client] (ecmascript)");
// Accessibility utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/app/auth/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function AuthLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionSystemProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[hsl(263_37%_27%)] p-10 lg:flex",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-br from-[hsl(248_89%_66%_/_0.15)] via-transparent to-[hsl(193_88%_66%_/_0.1)]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 20,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[hsl(248_89%_66%_/_0.2)] blur-[100px]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 21,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[hsl(193_88%_66%_/_0.15)] blur-[80px]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 22,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 19,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -16
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.5,
                                ease: [
                                    0.25,
                                    0.1,
                                    0.25,
                                    1
                                ]
                            },
                            className: "relative flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 shadow-lg shadow-black/10 backdrop-blur-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-bold text-white",
                                        children: "D"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 32,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-semibold tracking-tight text-white",
                                    children: "Dayflow HRMS"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 35,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 26,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staggerContainer"],
                            initial: "initial",
                            animate: "animate",
                            className: "relative space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].blockquote, {
                                    variants: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staggerItem"],
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-medium leading-relaxed tracking-tight text-white text-balance",
                                            children: '"Every workday, perfectly aligned."'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                            lineNumber: 40,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "max-w-md text-base leading-relaxed text-white/70",
                                            children: "Streamline your HR operations with our comprehensive management system. From attendance tracking to payroll processing, Dayflow has you covered."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                            lineNumber: 43,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 39,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    variants: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staggerItem"],
                                    className: "flex gap-4",
                                    children: [
                                        {
                                            value: "500+",
                                            label: "Companies"
                                        },
                                        {
                                            value: "50K+",
                                            label: "Employees"
                                        },
                                        {
                                            value: "99.9%",
                                            label: "Uptime"
                                        }
                                    ].map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 16
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                duration: 0.4,
                                                delay: 0.4 + index * 0.1
                                            },
                                            className: "rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-white/60",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, stat.label, true, {
                                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 49,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 38,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.6
                            },
                            className: "relative text-sm text-white/40",
                            children: "© 2025 Dayflow HRMS. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 69,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                    lineNumber: 17,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-1 items-center justify-center overflow-hidden bg-[hsl(230_33%_98%)] p-6 lg:p-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-b from-white via-[hsl(248_89%_99.5%)] to-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 83,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(248_89%_66%_/_0.03)_0%,transparent_70%)]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 84,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 82,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fadeInUp"].initial,
                            animate: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fadeInUp"].animate,
                            transition: {
                                duration: 0.5,
                                ease: [
                                    0.25,
                                    0.1,
                                    0.25,
                                    1
                                ]
                            },
                            className: "relative w-full",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                    lineNumber: 80,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = AuthLayout;
var _c;
__turbopack_context__.k.register(_c, "AuthLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Dayflow_4b854410._.js.map