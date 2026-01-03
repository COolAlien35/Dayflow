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
"[project]/Desktop/Dayflow/lib/motion/animations/authAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/dashboardAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Dashboard Screen Animations
 * 
 * Animation definitions for admin and employee dashboard screens.
 * 
 * Requirements:
 * - 6.1: Page title scroll animation (y:20, opacity:0 → y:0, opacity:1)
 * - 6.2: Feature card stagger (y:30, opacity:0.9 → y:0, opacity:1, 120ms stagger)
 * - 6.3: Sidebar animation (x:-20, opacity:0 → x:0, opacity:1)
 */ __turbopack_context__.s([
    "dashboardAnimationOptions",
    ()=>dashboardAnimationOptions,
    "dashboardAnimations",
    ()=>dashboardAnimations,
    "dashboardFeatureCardsAnimation",
    ()=>dashboardFeatureCardsAnimation,
    "dashboardPageTitleAnimation",
    ()=>dashboardPageTitleAnimation,
    "dashboardSidebarAnimation",
    ()=>dashboardSidebarAnimation
]);
const dashboardPageTitleAnimation = {
    id: 'dashboard-page-title',
    type: 'scroll',
    target: '.dashboard-page-title',
    from: {
        y: 20,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.dashboard-page-title',
        start: 'top 80%'
    }
};
const dashboardFeatureCardsAnimation = {
    id: 'dashboard-feature-cards',
    type: 'scroll',
    target: '.dashboard-feature-card',
    from: {
        y: 30,
        opacity: 0.9
    },
    to: {
        y: 0,
        opacity: 1
    },
    stagger: 120,
    scrollTrigger: {
        trigger: '.dashboard-feature-card-grid',
        start: 'top 80%'
    }
};
const dashboardSidebarAnimation = {
    id: 'dashboard-sidebar',
    type: 'mount',
    target: '.dashboard-sidebar',
    from: {
        x: -20,
        opacity: 0
    },
    to: {
        x: 0,
        opacity: 1
    }
};
const dashboardAnimations = {
    pageTitle: dashboardPageTitleAnimation,
    featureCards: dashboardFeatureCardsAnimation,
    sidebar: dashboardSidebarAnimation
};
const dashboardAnimationOptions = {
    pageTitle: {
        from: {
            y: 20,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        },
        start: 'top 80%'
    },
    featureCards: {
        from: {
            y: 30,
            opacity: 0.9
        },
        to: {
            y: 0,
            opacity: 1
        },
        stagger: 120,
        start: 'top 80%'
    },
    sidebar: {
        from: {
            x: -20,
            opacity: 0
        },
        to: {
            x: 0,
            opacity: 1
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/profileAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Profile Page Animations
 * 
 * Animation definitions for user profile screens.
 * 
 * Requirements:
 * - 7.1: Profile avatar animation (scale:0.9, opacity:0 → scale:1, opacity:1)
 * - 7.2: Avatar pin during scroll (15% of scroll duration)
 * - 7.3: Profile info rows stagger (y:20, opacity:0 → y:0, opacity:1, 80ms stagger)
 * - 7.4: Edit button mount animation (scale:0.95 → scale:1)
 * - 7.5: Edit button hover animation (scale:1.04)
 * - 7.6: Note box animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
 */ __turbopack_context__.s([
    "profileAnimationOptions",
    ()=>profileAnimationOptions,
    "profileAnimations",
    ()=>profileAnimations,
    "profileAvatarAnimation",
    ()=>profileAvatarAnimation,
    "profileEditButtonAnimation",
    ()=>profileEditButtonAnimation,
    "profileEditButtonHover",
    ()=>profileEditButtonHover,
    "profileInfoRowsAnimation",
    ()=>profileInfoRowsAnimation,
    "profileNoteBoxAnimation",
    ()=>profileNoteBoxAnimation
]);
const profileAvatarAnimation = {
    id: 'profile-avatar',
    type: 'scroll',
    target: '.profile-avatar',
    from: {
        scale: 0.9,
        opacity: 0
    },
    to: {
        scale: 1,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.profile-avatar',
        start: 'top 80%',
        pin: true,
        pinSpacing: false,
        // Pin duration is 15% of scroll range
        end: '+=15%'
    }
};
const profileInfoRowsAnimation = {
    id: 'profile-info-rows',
    type: 'mount',
    target: '.profile-info-row',
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
const profileEditButtonAnimation = {
    id: 'profile-edit-button',
    type: 'mount',
    target: '.profile-edit-button',
    from: {
        scale: 0.95
    },
    to: {
        scale: 1
    }
};
const profileEditButtonHover = {
    id: 'profile-edit-button-hover',
    type: 'hover',
    target: '.profile-edit-button',
    to: {
        scale: 1.04
    },
    duration: 200
};
const profileNoteBoxAnimation = {
    id: 'profile-note-box',
    type: 'scroll',
    target: '.profile-note-box',
    from: {
        scale: 0.98,
        opacity: 0.9
    },
    to: {
        scale: 1,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.profile-note-box',
        start: 'top 80%'
    }
};
const profileAnimations = {
    avatar: profileAvatarAnimation,
    infoRows: profileInfoRowsAnimation,
    editButton: profileEditButtonAnimation,
    editButtonHover: profileEditButtonHover,
    noteBox: profileNoteBoxAnimation
};
const profileAnimationOptions = {
    avatar: {
        from: {
            scale: 0.9,
            opacity: 0
        },
        to: {
            scale: 1,
            opacity: 1
        },
        scrollTrigger: {
            start: 'top 80%',
            pin: true,
            pinSpacing: false,
            end: '+=15%'
        }
    },
    infoRows: {
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
    editButton: {
        from: {
            scale: 0.95
        },
        to: {
            scale: 1
        }
    },
    editButtonHover: {
        to: {
            scale: 1.04
        },
        duration: 200
    },
    noteBox: {
        from: {
            scale: 0.98,
            opacity: 0.9
        },
        to: {
            scale: 1,
            opacity: 1
        },
        scrollTrigger: {
            start: 'top 80%'
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/attendanceAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Attendance View Animations
 * 
 * Animation definitions for attendance management screens.
 * 
 * Requirements:
 * - 8.1: Page header animation (y:20, opacity:0 → y:0, opacity:1)
 * - 8.2: Filters animation (x:20, opacity:0 → x:0, opacity:1)
 * - 8.3: Status chips animation (opacity:0 → opacity:1)
 * - 8.4: Explicitly exclude table rows, cells, and numerical values from animation
 * 
 * IMPORTANT: Table rows, table cells, and numerical values are NOT animated
 * to ensure data is immediately readable without waiting for animations.
 */ __turbopack_context__.s([
    "attendanceAnimationOptions",
    ()=>attendanceAnimationOptions,
    "attendanceAnimations",
    ()=>attendanceAnimations,
    "attendanceFiltersAnimation",
    ()=>attendanceFiltersAnimation,
    "attendancePageHeaderAnimation",
    ()=>attendancePageHeaderAnimation,
    "attendanceStatusChipsAnimation",
    ()=>attendanceStatusChipsAnimation
]);
const attendancePageHeaderAnimation = {
    id: 'attendance-page-header',
    type: 'scroll',
    target: '.attendance-page-header',
    from: {
        y: 20,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.attendance-page-header',
        start: 'top 80%'
    }
};
const attendanceFiltersAnimation = {
    id: 'attendance-filters',
    type: 'mount',
    target: '.attendance-filters',
    from: {
        x: 20,
        opacity: 0
    },
    to: {
        x: 0,
        opacity: 1
    }
};
const attendanceStatusChipsAnimation = {
    id: 'attendance-status-chips',
    type: 'mount',
    target: '.attendance-status-chips',
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
};
const attendanceAnimations = {
    pageHeader: attendancePageHeaderAnimation,
    filters: attendanceFiltersAnimation,
    statusChips: attendanceStatusChipsAnimation
};
const attendanceAnimationOptions = {
    pageHeader: {
        from: {
            y: 20,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        },
        start: 'top 80%'
    },
    filters: {
        from: {
            x: 20,
            opacity: 0
        },
        to: {
            x: 0,
            opacity: 1
        }
    },
    statusChips: {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}; /**
 * Elements that should NOT be animated:
 * - Table rows (.attendance-table-row)
 * - Table cells (.attendance-table-cell)
 * - Numerical values (check-in times, check-out times, work hours)
 * - Employee names and department text
 * 
 * These elements should be immediately visible to ensure data readability.
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/leaveApplicationAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Leave Application Animations
 * 
 * Animation definitions for leave application screens.
 * 
 * Requirements:
 * - 9.1: Leave form animation (y:20, opacity:0 → y:0, opacity:1)
 * - 9.2: Info panel parallax (y:-30, speedRatio:0.6, scrub:true)
 * - 9.3: Maintain normal scroll flow for the leave form
 * - 9.4: Synchronize parallax motion with scroll progress
 */ __turbopack_context__.s([
    "leaveApplicationAnimationOptions",
    ()=>leaveApplicationAnimationOptions,
    "leaveApplicationAnimations",
    ()=>leaveApplicationAnimations,
    "leaveFormAnimation",
    ()=>leaveFormAnimation,
    "leaveInfoPanelParallaxAnimation",
    ()=>leaveInfoPanelParallaxAnimation
]);
const leaveFormAnimation = {
    id: 'leave-form',
    type: 'scroll',
    target: '.leave-form',
    from: {
        y: 20,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.leave-form',
        start: 'top 80%'
    }
};
const leaveInfoPanelParallaxAnimation = {
    id: 'leave-info-panel-parallax',
    type: 'scroll',
    target: '.leave-info-panel',
    from: {
        y: -30
    },
    to: {
        y: 0
    },
    scrollTrigger: {
        trigger: '.leave-info-panel',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
};
const leaveApplicationAnimations = {
    form: leaveFormAnimation,
    infoPanelParallax: leaveInfoPanelParallaxAnimation
};
const leaveApplicationAnimationOptions = {
    form: {
        from: {
            y: 20,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        },
        scrollTrigger: {
            start: 'top 80%'
        }
    },
    infoPanelParallax: {
        from: {
            y: -30
        },
        to: {
            y: 0
        },
        scrollTrigger: {
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    }
}; /**
 * Notes:
 * - The form animation uses standard scroll-triggered entry animation
 * - The info panel uses parallax with scrub:true for smooth scroll synchronization
 * - The speedRatio of 0.6 is achieved through the y:-30 to y:0 range combined with scrub
 * - Normal scroll flow is maintained as these are non-blocking scroll animations
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/leaveApprovalAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Leave Approval Screen Animations
 * 
 * Animation definitions for the leave approval admin screen.
 * 
 * Requirements:
 * - 10.1: Approval table animation (opacity:0 → opacity:1)
 * - 10.2: Button hover (scale:1.04)
 * - 10.3: Row action animations (background flash)
 * - 10.4: Status cell animation (scale:1.08 with color transition)
 * - 10.5: Toast enter animation (y:-20, opacity:0 → visible)
 * - 10.6: Toast exit animation (y:-20, opacity:0)
 * - 10.7: Toast auto-dismiss (2000ms)
 */ __turbopack_context__.s([
    "leaveApprovalAnimationOptions",
    ()=>leaveApprovalAnimationOptions,
    "leaveApprovalAnimations",
    ()=>leaveApprovalAnimations,
    "leaveApprovalApproveButtonHover",
    ()=>leaveApprovalApproveButtonHover,
    "leaveApprovalRejectButtonHover",
    ()=>leaveApprovalRejectButtonHover,
    "leaveApprovalRowFlashAnimation",
    ()=>leaveApprovalRowFlashAnimation,
    "leaveApprovalStatusCellAnimation",
    ()=>leaveApprovalStatusCellAnimation,
    "leaveApprovalTableAnimation",
    ()=>leaveApprovalTableAnimation,
    "leaveApprovalToastEnterAnimation",
    ()=>leaveApprovalToastEnterAnimation,
    "leaveApprovalToastExitAnimation",
    ()=>leaveApprovalToastExitAnimation
]);
const leaveApprovalTableAnimation = {
    id: 'leave-approval-table',
    type: 'scroll',
    target: '.leave-approval-table',
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.leave-approval-table',
        start: 'top 80%'
    }
};
const leaveApprovalApproveButtonHover = {
    id: 'leave-approval-approve-button-hover',
    type: 'hover',
    target: '.leave-approval-approve-button',
    to: {
        scale: 1.04
    },
    duration: 200
};
const leaveApprovalRejectButtonHover = {
    id: 'leave-approval-reject-button-hover',
    type: 'hover',
    target: '.leave-approval-reject-button',
    to: {
        scale: 1.04
    },
    duration: 200
};
const leaveApprovalRowFlashAnimation = {
    id: 'leave-approval-row-flash',
    type: 'action',
    target: '.leave-approval-row',
    to: {
        backgroundColor: '#f0f0f0'
    },
    duration: 300
};
const leaveApprovalStatusCellAnimation = {
    id: 'leave-approval-status-cell',
    type: 'action',
    target: '.leave-approval-status-cell',
    to: {
        scale: 1.08
    },
    duration: 200
};
const leaveApprovalToastEnterAnimation = {
    id: 'leave-approval-toast-enter',
    type: 'action',
    target: '.leave-approval-toast',
    from: {
        y: -20,
        opacity: 0
    },
    to: {
        y: 0,
        opacity: 1
    },
    duration: 300
};
const leaveApprovalToastExitAnimation = {
    id: 'leave-approval-toast-exit',
    type: 'action',
    target: '.leave-approval-toast',
    to: {
        y: -20,
        opacity: 0
    },
    duration: 300
};
const leaveApprovalAnimations = {
    table: leaveApprovalTableAnimation,
    approveButtonHover: leaveApprovalApproveButtonHover,
    rejectButtonHover: leaveApprovalRejectButtonHover,
    rowFlash: leaveApprovalRowFlashAnimation,
    statusCell: leaveApprovalStatusCellAnimation,
    toastEnter: leaveApprovalToastEnterAnimation,
    toastExit: leaveApprovalToastExitAnimation
};
const leaveApprovalAnimationOptions = {
    table: {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        },
        scrollTrigger: {
            start: 'top 80%'
        }
    },
    approveButtonHover: {
        to: {
            scale: 1.04
        },
        duration: 200
    },
    rejectButtonHover: {
        to: {
            scale: 1.04
        },
        duration: 200
    },
    rowFlash: {
        to: {
            backgroundColor: '#f0f0f0'
        },
        duration: 300,
        yoyo: true,
        repeat: 1
    },
    statusCell: {
        to: {
            scale: 1.08
        },
        duration: 200
    },
    toast: {
        enter: {
            from: {
                y: -20,
                opacity: 0
            },
            to: {
                y: 0,
                opacity: 1
            },
            duration: 300
        },
        exit: {
            to: {
                y: -20,
                opacity: 0
            },
            duration: 300
        },
        autoDismiss: 2000
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/payrollAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Payroll View Animations
 * 
 * Animation definitions for payroll management screens.
 * 
 * Requirements:
 * - 11.1: Page header animation (opacity:0 → opacity:1)
 * - 11.2: Note box animation (scale:0.97, opacity:0.9 → scale:1, opacity:1)
 * - 11.3: Explicitly exclude payroll table from animation
 * 
 * IMPORTANT: Payroll tables are NOT animated to ensure financial data
 * is immediately visible without waiting for animations. This prioritizes
 * data visibility over animation effects.
 */ __turbopack_context__.s([
    "payrollAnimationOptions",
    ()=>payrollAnimationOptions,
    "payrollAnimations",
    ()=>payrollAnimations,
    "payrollNoteBoxAnimation",
    ()=>payrollNoteBoxAnimation,
    "payrollPageHeaderAnimation",
    ()=>payrollPageHeaderAnimation
]);
const payrollPageHeaderAnimation = {
    id: 'payroll-page-header',
    type: 'scroll',
    target: '.payroll-page-header',
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.payroll-page-header',
        start: 'top 80%'
    }
};
const payrollNoteBoxAnimation = {
    id: 'payroll-note-box',
    type: 'scroll',
    target: '.payroll-note-box',
    from: {
        scale: 0.97,
        opacity: 0.9
    },
    to: {
        scale: 1,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.payroll-note-box',
        start: 'top 80%'
    }
};
const payrollAnimations = {
    pageHeader: payrollPageHeaderAnimation,
    noteBox: payrollNoteBoxAnimation
};
const payrollAnimationOptions = {
    pageHeader: {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        },
        start: 'top 80%'
    },
    noteBox: {
        from: {
            scale: 0.97,
            opacity: 0.9
        },
        to: {
            scale: 1,
            opacity: 1
        },
        start: 'top 80%'
    }
}; /**
 * Elements that should NOT be animated:
 * - Payroll table (.payroll-table)
 * - Table rows and cells
 * - Salary amounts and numerical values
 * - Employee names and department information
 * - Status badges within the table
 * 
 * These elements should be immediately visible to ensure financial data
 * readability and to prioritize data visibility over animation effects.
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/globalNoteAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Global Note Block Animations
 * 
 * Animation definitions for note and info blocks used across all pages.
 * These animations ensure consistency for informational elements throughout the application.
 * 
 * Requirements:
 * - 12.1: Note block animation (scale:0.98, opacity:0.9 → scale:1, opacity:1)
 * - 12.2: Note block animation consistency across all pages
 * - 12.3: Hover effect (increase box-shadow depth)
 * 
 * IMPORTANT: These animations should be applied consistently to all note blocks,
 * info panels, and alert boxes across the application to maintain visual coherence.
 */ __turbopack_context__.s([
    "globalNoteAnimationOptions",
    ()=>globalNoteAnimationOptions,
    "globalNoteAnimations",
    ()=>globalNoteAnimations,
    "noteBlockAnimation",
    ()=>noteBlockAnimation,
    "noteBlockHoverAnimation",
    ()=>noteBlockHoverAnimation
]);
const noteBlockAnimation = {
    id: 'global-note-block',
    type: 'scroll',
    target: '.note-block',
    from: {
        scale: 0.98,
        opacity: 0.9
    },
    to: {
        scale: 1,
        opacity: 1
    },
    scrollTrigger: {
        trigger: '.note-block',
        start: 'top 80%'
    }
};
const noteBlockHoverAnimation = {
    id: 'global-note-block-hover',
    type: 'hover',
    target: '.note-block',
    to: {
        // Box-shadow is handled via CSS for performance
        // This definition is for documentation purposes
        scale: 1.0
    },
    duration: 200
};
const globalNoteAnimations = {
    noteBlock: noteBlockAnimation,
    noteBlockHover: noteBlockHoverAnimation
};
const globalNoteAnimationOptions = {
    noteBlock: {
        from: {
            scale: 0.98,
            opacity: 0.9
        },
        to: {
            scale: 1,
            opacity: 1
        },
        start: 'top 80%'
    },
    noteBlockHover: {
        to: {
            scale: 1.0
        },
        duration: 200
    }
}; /**
 * CSS classes for note blocks:
 * 
 * Base class: .note-block
 * - Should be applied to all note blocks, info panels, and alert boxes
 * - Enables consistent animation behavior
 * 
 * Hover effect (add to your CSS):
 * ```css
 * .note-block {
 *   transition: box-shadow 200ms ease-out;
 *   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 * }
 * 
 * .note-block:hover {
 *   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
 * }
 * ```
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Dayflow/lib/motion/animations/heroAnimations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 3D Hero Section Animations (Landing Page Only)
 * 
 * Animation definitions for the optional 3D hero section on the landing page.
 * This section uses scroll-driven camera and object animations to create
 * an engaging 3D effect synchronized with scroll progress.
 * 
 * Requirements:
 * - 13.1: Enable 3D effects only on landing page
 * - 13.2: Camera Z animation (6 → 3.5)
 * - 13.3: Camera Y animation (0 → -0.4)
 * - 13.4: Object separation on X axis
 * - 13.5: Object rotation (15 degrees on Y axis)
 * - 13.6: Synchronize 3D camera motion with scroll progress
 * - 13.7: Use single canvas element maximum
 */ __turbopack_context__.s([
    "heroAnimationOptions",
    ()=>heroAnimationOptions,
    "heroAnimations",
    ()=>heroAnimations,
    "heroCameraAnimation",
    ()=>heroCameraAnimation,
    "heroConfig",
    ()=>heroConfig,
    "heroObjectRotationAnimation",
    ()=>heroObjectRotationAnimation,
    "heroObjectSeparationAnimation",
    ()=>heroObjectSeparationAnimation
]);
const heroCameraAnimation = {
    id: 'hero-camera',
    type: 'scroll',
    target: '.hero-camera',
    from: {
        z: 6,
        y: 0
    },
    to: {
        z: 3.5,
        y: -0.4
    },
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
};
const heroObjectSeparationAnimation = {
    id: 'hero-object-separation',
    type: 'scroll',
    target: '.hero-object',
    from: {
        x: 0
    },
    to: {
        // Separation will be applied differently to each object
        // Left objects: negative X, right objects: positive X
        // This will be handled in the component implementation
        x: 0
    },
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
};
const heroObjectRotationAnimation = {
    id: 'hero-object-rotation',
    type: 'scroll',
    target: '.hero-object',
    from: {
        rotationY: 0
    },
    to: {
        rotationY: 15
    },
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
};
const heroAnimations = {
    camera: heroCameraAnimation,
    objectSeparation: heroObjectSeparationAnimation,
    objectRotation: heroObjectRotationAnimation
};
const heroAnimationOptions = {
    camera: {
        from: {
            z: 6,
            y: 0
        },
        to: {
            z: 3.5,
            y: -0.4
        },
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    },
    objectSeparation: {
        from: {
            x: 0
        },
        to: {
            x: 0
        },
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    },
    objectRotation: {
        from: {
            rotationY: 0
        },
        to: {
            rotationY: 15
        },
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    }
};
const heroConfig = {
    // Restrict to landing page only
    enabledPages: [
        '/'
    ],
    // Camera settings
    camera: {
        initialZ: 6,
        finalZ: 3.5,
        initialY: 0,
        finalY: -0.4
    },
    // Object settings
    objects: {
        rotationY: 15,
        separationMultiplier: 1.5
    },
    // Canvas settings
    canvas: {
        maxCount: 1
    }
};
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
// Performance constraints
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$performance$2d$constraints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/performance-constraints.ts [app-client] (ecmascript)");
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
// Animation configurations
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$authAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/authAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$dashboardAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/dashboardAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$profileAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/profileAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$attendanceAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/attendanceAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$leaveApplicationAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/leaveApplicationAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$leaveApprovalAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/leaveApprovalAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$payrollAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/payrollAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$globalNoteAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/globalNoteAnimations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$lib$2f$motion$2f$animations$2f$heroAnimations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Dayflow/lib/motion/animations/heroAnimations.ts [app-client] (ecmascript)");
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
                    className: "relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[hsl(174_70%_17%)] p-10 lg:flex",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-br from-[hsl(168_76%_40%_/_0.15)] via-transparent to-[hsl(161_94%_40%_/_0.1)]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[hsl(168_76%_40%_/_0.2)] blur-[100px]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[hsl(161_94%_40%_/_0.15)] blur-[80px]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 19,
                            columnNumber: 11
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
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-semibold tracking-tight text-white",
                                    children: "Dayflow HRMS"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 26,
                            columnNumber: 11
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
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "max-w-md text-base leading-relaxed text-white/70",
                                            children: "Streamline your HR operations with our comprehensive management system. From attendance tracking to payroll processing, Dayflow has you covered."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
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
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-white/60",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, stat.label, true, {
                                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 38,
                            columnNumber: 11
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
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-1 items-center justify-center overflow-hidden bg-background p-6 lg:p-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-b from-background via-[hsl(168_76%_99.5%)] to-background dark:via-[hsl(168_30%_12%)]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Dayflow$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(168_76%_40%_/_0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,hsl(168_76%_40%_/_0.08)_0%,transparent_70%)]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                            lineNumber: 82,
                            columnNumber: 11
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
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Dayflow/app/auth/layout.tsx",
                    lineNumber: 80,
                    columnNumber: 9
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

//# sourceMappingURL=Desktop_Dayflow_3849cfe4._.js.map