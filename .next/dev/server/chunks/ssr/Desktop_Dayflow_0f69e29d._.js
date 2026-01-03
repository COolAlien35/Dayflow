module.exports = [
"[project]/Desktop/Dayflow/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Desktop/Dayflow/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/Dayflow/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/Dayflow/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/Dayflow/components/ui/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/Desktop/Dayflow/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Dayflow/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/Dayflow/lib/motion/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        if ("TURBOPACK compile-time truthy", 1) {
            return 'desktop'; // Default for SSR
        }
        //TURBOPACK unreachable
        ;
        const width = undefined;
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
}),
"[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionSystemProvider",
    ()=>MotionSystemProvider,
    "useMotionSystem",
    ()=>useMotionSystem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const MotionSystemContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function MotionSystemProvider({ children, config: userConfig }) {
    // Initialize DeviceAdapter
    const [deviceAdapter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeviceAdapter"]());
    // Merge user config with defaults and device detection
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMotionConfig"],
            ...userConfig,
            deviceType: deviceAdapter.getDeviceType(),
            timing: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMotionConfig"].timing,
                ...userConfig?.timing
            },
            transforms: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMotionConfig"].transforms,
                ...userConfig?.transforms
            },
            easing: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMotionConfig"].easing,
                ...userConfig?.easing
            },
            performance: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultMotionConfig"].performance,
                ...userConfig?.performance
            }
        }));
    // Animation registry for lifecycle management
    const [animationRegistry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Performance monitor reference
    const performanceMonitorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Detect prefers-reduced-motion on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Set initial state
        setConfig((prev)=>({
                ...prev,
                reducedMotion: mediaQuery.matches
            }));
        // Listen for changes
        const handleChange = (e)=>{
            setConfig((prev)=>({
                    ...prev,
                    reducedMotion: e.matches
                }));
            // Kill all animations if reduced motion is enabled
            if (e.matches) {
                killAllAnimations();
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>{
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);
    // Handle window resize to update device type
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleResize = ()=>{
            deviceAdapter.updateDeviceType();
            const newDeviceType = deviceAdapter.getDeviceType();
            setConfig((prev)=>{
                if (prev.deviceType !== newDeviceType) {
                    return {
                        ...prev,
                        deviceType: newDeviceType
                    };
                }
                return prev;
            });
        };
        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('resize', handleResize);
        };
    }, [
        deviceAdapter
    ]);
    /**
   * Check if animations should be enabled
   * Animations are disabled if:
   * - Global enabled flag is false
   * - User has reduced motion preference
   * - Device type is mobile (for scroll animations)
   */ const isAnimationEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return config.enabled && !config.reducedMotion;
    }, [
        config.enabled,
        config.reducedMotion
    ]);
    /**
   * Register an animation timeline for lifecycle management
   */ const registerAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, timeline)=>{
        animationRegistry.set(id, timeline);
    }, [
        animationRegistry
    ]);
    /**
   * Unregister and cleanup a specific animation
   */ const unregisterAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        const timeline = animationRegistry.get(id);
        if (timeline) {
            // Kill the timeline if it has a kill method (GSAP timeline)
            if (typeof timeline.kill === 'function') {
                timeline.kill();
            }
            animationRegistry.delete(id);
        }
    }, [
        animationRegistry
    ]);
    /**
   * Kill all registered animations
   * Used for performance safeguards and accessibility
   */ const killAllAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        animationRegistry.forEach((timeline)=>{
            if (timeline && typeof timeline.kill === 'function') {
                timeline.kill();
            }
        });
        animationRegistry.clear();
    }, [
        animationRegistry
    ]);
    // Cleanup all animations on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            killAllAnimations();
        };
    }, [
        killAllAnimations
    ]);
    // Initialize and manage performance monitoring
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only start monitoring if enabled in config
        if (!config.performance.monitoringEnabled || !config.enabled) {
            return;
        }
        // Create performance monitor with threshold breach callback
        const monitor = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerformanceMonitor"](config.performance.fpsThreshold, ()=>{
            console.warn(`Performance threshold breached (FPS < ${config.performance.fpsThreshold}). Disabling motion system.`);
            // Kill all animations
            killAllAnimations();
            // Disable motion system
            setConfig((prev)=>({
                    ...prev,
                    enabled: false
                }));
        });
        performanceMonitorRef.current = monitor;
        monitor.start();
        // Cleanup on unmount or when monitoring is disabled
        return ()=>{
            if (performanceMonitorRef.current) {
                performanceMonitorRef.current.stop();
                performanceMonitorRef.current = null;
            }
        };
    }, [
        config.performance.monitoringEnabled,
        config.performance.fpsThreshold,
        config.enabled,
        killAllAnimations
    ]);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            config,
            deviceAdapter,
            isAnimationEnabled,
            registerAnimation,
            unregisterAnimation,
            killAllAnimations
        }), [
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation,
        killAllAnimations
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionSystemContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
function useMotionSystem() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MotionSystemContext);
    if (context === undefined) {
        throw new Error('useMotionSystem must be used within a MotionSystemProvider');
    }
    return context;
}
}),
"[project]/Desktop/Dayflow/lib/motion/validation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/validation.ts [app-ssr] (ecmascript)");
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
            const isValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateAnimation"])(options, this.config);
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
}),
"[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
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
            const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh();
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
}),
"[project]/Desktop/Dayflow/lib/motion/gsap-setup.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
;
;
// Register ScrollTrigger plugin
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
// Set global GSAP defaults
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].defaults({
    ease: 'power2.out',
    duration: 0.4
});
// Configure ScrollTrigger defaults
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].defaults({
    toggleActions: 'play none none none',
    markers: false
});
function initializeGSAP() {
    // Additional initialization if needed
    console.log('GSAP Motion System initialized');
}
;
}),
"[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$gsap$2d$setup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/gsap-setup.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
;
function applyStaticState(target, finalState) {
    // Use gsap.set() to apply the final state immediately without animation
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(target, finalState);
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
    const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
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
}),
"[project]/Desktop/Dayflow/lib/motion/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useMountAnimation(ref, options) {
    const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(`mount-${Math.random().toString(36).substr(2, 9)}`);
    const controllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize controller if not already created
        if (!controllerRef.current) {
            controllerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationController"](config);
        }
        const element = ref.current;
        if (!element) return;
        const animationId = animationIdRef.current;
        // Check if animations are enabled
        if (!isAnimationEnabled()) {
            // Apply final state immediately without animation
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
            return;
        }
        // Create GSAP timeline
        const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
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
        return ()=>{
            if (controllerRef.current) {
                controllerRef.current.unregister(animationId);
            }
            unregisterAnimation(animationId);
        };
    }, [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation
    ]);
}
function useHoverAnimation(ref, options) {
    const { config, deviceAdapter, isAnimationEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        const handleMouseEnter = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
                ...adaptedOptions.to,
                duration,
                ease: config.easing.secondary,
                overwrite: 'auto'
            });
        };
        // Mouse leave handler - reverse the animation
        const handleMouseLeave = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(element, {
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
        };
        // Attach event listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        // Cleanup function
        return ()=>{
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            // Kill any ongoing animations on this element
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(element);
        };
    }, [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled
    ]);
}
function useScrollAnimation(ref, options) {
    const { config, deviceAdapter, isAnimationEnabled, registerAnimation, unregisterAnimation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionSystem"])();
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(`scroll-${Math.random().toString(36).substr(2, 9)}`);
    const scrollManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize ScrollManager if not already created
        if (!scrollManagerRef.current) {
            scrollManagerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollManager"]();
        }
        const element = ref.current;
        if (!element) return;
        const animationId = animationIdRef.current;
        // Check if animations are enabled
        if (!isAnimationEnabled()) {
            // Apply final state immediately without animation
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
            return;
        }
        // Check if ScrollTrigger should be disabled on mobile
        if (!deviceAdapter.shouldEnableScrollTrigger()) {
            // Apply final state on mobile (no scroll animations)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyStaticState"])(element, options.to);
            return;
        }
        // Adapt animation based on device type
        const adaptedOptions = deviceAdapter.adaptAnimation({
            from: options.from,
            to: options.to
        });
        // Create GSAP timeline for the animation
        // When scrub is enabled, animations are bidirectional (scroll up reverses)
        const timeline = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
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
                onEnter: ()=>{
                // Animation enters viewport (scrolling down)
                },
                onLeave: ()=>{
                // Animation leaves viewport (scrolling down)
                },
                onEnterBack: ()=>{
                // Animation re-enters viewport (scrolling up)
                },
                onLeaveBack: ()=>{
                // Animation leaves viewport (scrolling up)
                }
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
        return ()=>{
            // Unregister from context
            unregisterAnimation(animationId);
            // Kill the timeline (which also kills its associated ScrollTrigger)
            timeline.kill();
        };
    }, [
        ref,
        options,
        config,
        deviceAdapter,
        isAnimationEnabled,
        registerAnimation,
        unregisterAnimation
    ]);
}
}),
"[project]/Desktop/Dayflow/lib/motion/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Motion System Exports
 * 
 * Central export point for the Dayflow HRMS Motion System
 * Built on GSAP with ScrollTrigger integration
 */ // Core providers and hooks
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$MotionSystemProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/MotionSystemProvider.tsx [app-ssr] (ecmascript)");
// Animation hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/hooks.ts [app-ssr] (ecmascript)");
// Configuration
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/config.ts [app-ssr] (ecmascript)");
// Validation
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/validation.ts [app-ssr] (ecmascript)");
// Animation Controller
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$AnimationController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/AnimationController.ts [app-ssr] (ecmascript)");
// Scroll Manager
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$ScrollManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/ScrollManager.ts [app-ssr] (ecmascript)");
// Device Adapter
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$DeviceAdapter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/DeviceAdapter.ts [app-ssr] (ecmascript)");
// Performance Monitor
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$PerformanceMonitor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/PerformanceMonitor.ts [app-ssr] (ecmascript)");
// Accessibility utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/accessibility.ts [app-ssr] (ecmascript)");
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
}),
"[project]/Desktop/Dayflow/lib/motion/animations/authAnimations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Authentication Screen Animations
 * 
 * Animation definitions for login and signup screens.
 * 
 * Requirements:
 * - 5.1: Auth card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
 * - 5.2: Input stagger animation (y:20, opacity:0 → y:0, opacity:1, 80ms stagger)
 * - 5.3: CTA button animation (scale:0.96, opacity:0 → scale:1, opacity:1, 200ms delay)
 * - 5.4: Switch link hover (underline width animation, 200ms)
 */ __turbopack_context__.s([
    "authAnimationOptions",
    ()=>authAnimationOptions,
    "authAnimations",
    ()=>authAnimations,
    "authCardAnimation",
    ()=>authCardAnimation,
    "authCtaAnimation",
    ()=>authCtaAnimation,
    "authInputsAnimation",
    ()=>authInputsAnimation,
    "authSwitchLinkHover",
    ()=>authSwitchLinkHover
]);
const authCardAnimation = {
    id: 'auth-card',
    type: 'mount',
    target: '.auth-card',
    from: {
        y: 40,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    duration: 500
};
const authInputsAnimation = {
    id: 'auth-inputs',
    type: 'mount',
    target: '.auth-input',
    from: {
        y: 20,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    stagger: 80
};
const authCtaAnimation = {
    id: 'auth-cta',
    type: 'mount',
    target: '.auth-cta',
    from: {
        scale: 0.96,
        opacity: 0
    },
    to: {
        scale: 1,
        opacity: 1
    },
    delay: 200
};
const authSwitchLinkHover = {
    id: 'auth-switch-link-hover',
    type: 'hover',
    target: '.auth-switch-link',
    to: {
        // For underline animation, we'll use a pseudo-element approach
        // The hook will handle the scale/opacity of the element itself
        scale: 1.0
    },
    duration: 200
};
const authAnimations = {
    card: authCardAnimation,
    inputs: authInputsAnimation,
    cta: authCtaAnimation,
    switchLinkHover: authSwitchLinkHover
};
const authAnimationOptions = {
    card: {
        from: {
            y: 40,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        },
        duration: 500
    },
    inputs: {
        from: {
            y: 20,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        },
        stagger: 80
    },
    cta: {
        from: {
            scale: 0.96,
            opacity: 0
        },
        to: {
            scale: 1,
            opacity: 1
        },
        delay: 200
    },
    switchLinkHover: {
        to: {
            scale: 1.0
        },
        duration: 200
    }
};
}),
"[project]/Desktop/Dayflow/app/auth/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/authAnimations.ts [app-ssr] (ecmascript)");
"use client";
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
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rememberMe, setRememberMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Refs for GSAP animations
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const switchLinkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Apply GSAP animations
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMountAnimation"])(cardRef, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAnimationOptions"].card);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMountAnimation"])(inputsRef, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAnimationOptions"].inputs);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMountAnimation"])(ctaRef, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAnimationOptions"].cta);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHoverAnimation"])(switchLinkRef, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAnimationOptions"].switchLinkHover);
    const validate = ()=>{
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((resolve)=>setTimeout(resolve, 1500));
        if (email.includes("admin")) {
            router.push("/admin/dashboard");
        } else {
            router.push("/employee/dashboard");
        }
        setIsLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: "auth-card w-full max-w-md space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-3 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(263_37%_27%)] shadow-lg shadow-[hsl(263_37%_27%_/_0.2)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg font-bold text-white",
                            children: "D"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl font-semibold tracking-tight",
                        children: "Dayflow HRMS"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 text-center lg:text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight text-foreground",
                        children: "Welcome back"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Enter your credentials to access your account"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                ref: inputsRef,
                onSubmit: handleSubmit,
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-input space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "email",
                                className: "text-sm font-medium",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "email",
                                type: "email",
                                placeholder: "name@company.com",
                                value: email,
                                onChange: (e)=>{
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors((prev)=>({
                                            ...prev,
                                            email: ""
                                        }));
                                },
                                className: `h-11 border-border/50 bg-white transition-all focus:border-[hsl(248_89%_66%_/_0.5)] focus:ring-2 focus:ring-[hsl(248_89%_66%_/_0.1)] ${errors.email ? "border-rose-500" : ""}`,
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                    initial: {
                                        opacity: 0,
                                        y: -4
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -4
                                    },
                                    className: "text-sm text-rose-500",
                                    children: errors.email
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-input space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "password",
                                        className: "text-sm font-medium",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#",
                                        className: "text-sm text-[hsl(248_89%_66%)] transition-colors hover:text-[hsl(248_89%_55%)]",
                                        children: "Forgot password?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "password",
                                        type: showPassword ? "text" : "password",
                                        placeholder: "Enter your password",
                                        value: password,
                                        onChange: (e)=>{
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors((prev)=>({
                                                    ...prev,
                                                    password: ""
                                                }));
                                        },
                                        className: `h-11 border-border/50 bg-white pr-11 transition-all focus:border-[hsl(248_89%_66%_/_0.5)] focus:ring-2 focus:ring-[hsl(248_89%_66%_/_0.1)] ${errors.password ? "border-rose-500" : ""}`,
                                        disabled: isLoading
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "ghost",
                                        size: "icon",
                                        className: "absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground",
                                        onClick: ()=>setShowPassword(!showPassword),
                                        children: [
                                            showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 31
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                                lineNumber: 146,
                                                columnNumber: 64
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: showPassword ? "Hide password" : "Show password"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                    initial: {
                                        opacity: 0,
                                        y: -4
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -4
                                    },
                                    className: "text-sm text-rose-500",
                                    children: errors.password
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-input flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                id: "remember",
                                checked: rememberMe,
                                onCheckedChange: (checked)=>setRememberMe(checked),
                                className: "border-border/50 data-[state=checked]:border-[hsl(248_89%_66%)] data-[state=checked]:bg-[hsl(248_89%_66%)]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "remember",
                                className: "text-sm font-normal text-muted-foreground",
                                children: "Remember me for 30 days"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: ctaRef,
                        className: "auth-cta",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            className: "h-11 w-full bg-[hsl(263_37%_27%)] text-white shadow-lg shadow-[hsl(263_37%_27%_/_0.2)] transition-all hover:bg-[hsl(263_37%_32%)] hover:shadow-xl hover:shadow-[hsl(263_37%_27%_/_0.25)]",
                            disabled: isLoading,
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Sign in",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "ml-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-sm text-muted-foreground",
                children: [
                    "Don't have an account?",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        ref: switchLinkRef,
                        href: "/auth/signup",
                        className: "auth-switch-link font-medium text-[hsl(248_89%_66%)] transition-colors hover:text-[hsl(248_89%_55%)]",
                        children: "Sign up"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border/50 bg-white/50 p-4 text-center backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-muted-foreground",
                        children: "Demo Credentials"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1 text-xs text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Employee: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-foreground",
                                        children: "employee@dayflow.com"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Admin: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-foreground",
                                        children: "admin@dayflow.com"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Password: any 6+ characters"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Dayflow/app/auth/login/page.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_Dayflow_0f69e29d._.js.map