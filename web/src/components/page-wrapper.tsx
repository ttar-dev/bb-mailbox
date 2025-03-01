import {motion} from "framer-motion";

export default function PageWrapper({
    children,
    animate = {opacity: 1, x: 0, y: 0},
    initial = {opacity: 1, x: 0, y: 100},
    exit = {opacity: 0, x: 0, y: 0}
}: {
    children: React.ReactNode;
    animate?: {opacity: number; y: number; x: number};
    initial?: {opacity: number; y: number; x: number};
    exit?: {opacity: number; y: number; x: number};
}) {
    return (
        <div className="w-full mx-auto">
            <motion.div initial={initial} animate={animate} exit={exit}>
                {children}
            </motion.div>
        </div>
    );
}
