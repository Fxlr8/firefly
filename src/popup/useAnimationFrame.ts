import { useRef, useEffect } from "react";

type RAFCallback = (dt: number) => void;

const useAnimationFrame = (callback: RAFCallback) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const cb = useRef(callback);

    useEffect(() => {
        cb.current = callback;
    }, [callback]);

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current) {
                const deltaTime = time - previousTimeRef.current;
                if (cb.current) cb.current(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []); // Make sure the effect runs only once
};

export default useAnimationFrame;
