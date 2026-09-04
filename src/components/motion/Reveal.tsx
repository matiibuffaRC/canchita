"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
    delay?: number;
};

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={ reduceMotion ? undefined : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } } {...props} >
        {children}
            </motion.div>
        );
}
