module.exports = [
"[project]/Desktop/Dayflow/lib/motion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Desktop/Dayflow/app/auth/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/Desktop/Dayflow/app/auth/layout.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=Desktop_Dayflow_544701e0._.js.map