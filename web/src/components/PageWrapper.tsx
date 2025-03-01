import {motion} from "framer-motion";

export default function PageWrapper({
    children,
    animate = {opacity: 1, x: 0, y: 0},
    initial = {opacity: 0, x: 0, y: -40},
    exit = {opacity: 0, x: 0, y: 0},
    duration = 0.2, // default duration
    onAnimationComplete // callback function
}: {
    children: React.ReactNode;
    animate?: {opacity: number; y: number; x: number};
    initial?: {opacity: number; y: number; x: number};
    exit?: {opacity: number; y: number; x: number};
    duration?: number;
    onAnimationComplete?: () => void;
}) {
    return (
        <div className="w-full mx-auto">
            <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{duration}}
                onAnimationComplete={onAnimationComplete} // call the callback function when animation completes
            >
                {children}
            </motion.div>
        </div>
    );
}
