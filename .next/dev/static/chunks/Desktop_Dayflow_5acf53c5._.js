(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Dayflow/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster({ ...props }) {
    _s();
    const { resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        className: "toaster group",
        position: "top-right",
        richColors: true,
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(Toaster, "ZFEt0jE4OUgXZiwzKU9YAbCBnGI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
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
"[project]/Desktop/Dayflow/lib/motion/performance-constraints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Performance Constraints Validation
 * 
 * Validates that the motion system adheres to performance best practices:
 * - No CSS shadows in animated elements (Requirement 15.2)
 * - No physics libraries imported (Requirement 15.3)
 * - Texture sizes below threshold (Requirement 15.4)
 * 
 * These constraints ensure the motion system remains performant and doesn't
 * degrade user experience on lower-powered devices.
 */ __turbopack_context__.s([
    "defaultPerformanceConstraints",
    ()=>defaultPerformanceConstraints,
    "validateNoCssShadows",
    ()=>validateNoCssShadows,
    "validateNoPhysicsLibraries",
    ()=>validateNoPhysicsLibraries,
    "validatePerformanceConstraints",
    ()=>validatePerformanceConstraints,
    "validateTextureSize",
    ()=>validateTextureSize
]);
const defaultPerformanceConstraints = {
    // 1MB max texture size for 3D assets
    maxTextureSize: 1024 * 1024,
    // CSS properties that should not be animated for performance
    forbiddenAnimatedProperties: [
        'boxShadow',
        'box-shadow',
        'textShadow',
        'text-shadow',
        'filter',
        'backdrop-filter'
    ],
    // Physics libraries that should not be imported
    forbiddenLibraries: [
        'matter-js',
        'cannon',
        'cannon-es',
        'ammo.js',
        'physijs',
        'planck-js',
        'box2d',
        'rapier',
        'oimo'
    ]
};
function validateNoCssShadows(options, constraints = defaultPerformanceConstraints) {
    let isValid = true;
    // Check 'from' properties
    if (options.from) {
        for (const prop of constraints.forbiddenAnimatedProperties){
            if (prop in options.from) {
                console.warn(`[Motion System] Performance violation: "${prop}" should not be animated. Use CSS transitions for shadows instead.`);
                isValid = false;
            }
        }
    }
    // Check 'to' properties
    if (options.to) {
        for (const prop of constraints.forbiddenAnimatedProperties){
            if (prop in options.to) {
                console.warn(`[Motion System] Performance violation: "${prop}" should not be animated. Use CSS transitions for shadows instead.`);
                isValid = false;
            }
        }
    }
    return isValid;
}
function validateNoPhysicsLibraries(dependencies, constraints = defaultPerformanceConstraints) {
    let isValid = true;
    const foundLibraries = [];
    // Check all dependencies
    for (const dep of Object.keys(dependencies)){
        const depLower = dep.toLowerCase();
        for (const forbidden of constraints.forbiddenLibraries){
            if (depLower.includes(forbidden.toLowerCase())) {
                foundLibraries.push(dep);
                isValid = false;
            }
        }
    }
    if (!isValid) {
        console.error(`[Motion System] Performance violation: Physics libraries detected: ${foundLibraries.join(', ')}. ` + `Remove these dependencies to maintain performance standards.`);
    }
    return isValid;
}
function validateTextureSize(textureSize, textureName, constraints = defaultPerformanceConstraints) {
    if (textureSize > constraints.maxTextureSize) {
        const sizeMB = (textureSize / (1024 * 1024)).toFixed(2);
        const maxMB = (constraints.maxTextureSize / (1024 * 1024)).toFixed(2);
        console.error(`[Motion System] Performance violation: Texture "${textureName}" is ${sizeMB}MB, ` + `which exceeds the maximum allowed size of ${maxMB}MB. ` + `Compress or resize the texture to improve performance.`);
        return false;
    }
    return true;
}
function validatePerformanceConstraints(options, constraints = defaultPerformanceConstraints) {
    const noCssShadows = validateNoCssShadows(options, constraints);
    // Note: Physics library validation should be run separately during build time
    // Texture validation should be run when loading 3D assets
    return noCssShadows;
}
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
 * - 15.2: No CSS shadows in animated elements
 */ __turbopack_context__.s([
    "validateAnimation",
    ()=>validateAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$performance$2d$constraints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/performance-constraints.ts [app-client] (ecmascript)");
;
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
    // Validate performance constraints (Requirement 15.2)
    const performanceValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$performance$2d$constraints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePerformanceConstraints"])(options);
    if (!performanceValid) {
        isValid = false;
    }
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

__turbopack_context__.s([
    "useActionAnimation",
    ()=>useActionAnimation,
    "useHoverAnimation",
    ()=>useHoverAnimation,
    "useMountAnimation",
    ()=>useMountAnimation,
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
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
function useActionAnimation(ref, options) {
    _s3();
    const { config, deviceAdapter, isAnimationEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    const triggerAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useActionAnimation.useCallback[triggerAnimation]": ()=>{
            const element = ref.current;
            if (!element) return;
            // Check if animations are enabled
            if (!isAnimationEnabled()) {
                // If animations are disabled, just apply final state
                if (options.to) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                }
                return;
            }
            // Adapt animation based on device type
            const adaptedOptions = deviceAdapter.adaptAnimation({
                from: options.from,
                to: options.to,
                duration: options.duration
            });
            // If motion is disabled (mobile), apply final state
            if (adaptedOptions.duration === 0) {
                if (options.to) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
                }
                return;
            }
            const duration = (adaptedOptions.duration || 200) / 1000; // Convert ms to seconds
            // Create animation based on whether we have a 'from' state
            if (adaptedOptions.from) {
                // Use fromTo for animations with explicit start state
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(element, adaptedOptions.from, {
                    ...adaptedOptions.to,
                    duration,
                    ease: config.easing.primary,
                    yoyo: options.yoyo || false,
                    repeat: options.repeat || 0,
                    overwrite: 'auto'
                });
            } else {
                // Use to for animations from current state
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                    ...adaptedOptions.to,
                    duration,
                    ease: config.easing.primary,
                    yoyo: options.yoyo || false,
                    repeat: options.repeat || 0,
                    overwrite: 'auto'
                });
            }
        }
    }["useActionAnimation.useCallback[triggerAnimation]"], [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled
    ]);
    return triggerAnimation;
}
_s3(useActionAnimation, "RjEbo/oiDQYvTgPAIhHgGvgxaXs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionSystem"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Dayflow_5acf53c5._.js.map