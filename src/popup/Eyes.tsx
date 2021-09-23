import React, { FC, useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import gsap from 'gsap';
import Vec2 from 'vec2';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
`;

const UpBrowWrapper = styled.div`
  position: absolute;
  top: -25px;
  left: -18px;
`;

const DownBrowWrapper = styled.div`
  position: absolute;
  top: 5px;
  left: -18px;
`;

/**
 * Upper brow graphics
 */
const BrowUp = forwardRef(
    (props, ref: ForwardedRef<SVGSVGElement>) => {
        return (
            <UpBrowWrapper>
                <svg
                    ref={ref}
                    width="97"
                    height="48"
                    viewBox="0 0 97 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M53.4907 46.6724H14.0316L0.103027 2.25972L96.9668 0.682892L93.3625 47.9885L53.4907 46.6724Z"
                        fill="#2C2C2C"
                    />
                </svg>
            </UpBrowWrapper>
        );
    }
);

/**
 * Lower brow graphics
 */
const BrowDown = forwardRef(
    (props, ref: ForwardedRef<SVGSVGElement>) => {
        return (
            <DownBrowWrapper>
                <svg
                    ref={ref}
                    width="109"
                    height="61"
                    viewBox="0 0 109 61"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M58.8064 6.9828L93.4148 4.87455L108.23 54.0793L3.03157 54.0793L12.4092 6.02565L58.8064 6.9828Z"
                        fill="#2C2C2C"
                    />
                </svg>
            </DownBrowWrapper>
        );
    }
);

/**
 * A container to move both eyebrows together
 */
const BrowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

// eye movement bounds
const boundA = new Vec2(-5, -9);
const boundB = new Vec2(5, 9);

/**
 * A hook to animate an object to follow a cursor in eyeball-like manner
 * Optionnaly accepts browRef, and object, that would only be moved vertically with the eye
 */
const useEyeball = (
    ref: React.MutableRefObject<SVGCircleElement | null>,
    browsRef?: React.MutableRefObject<HTMLDivElement | null>
) => {
    const origin = useRef<Vec2>();
    const offset = useRef<Vec2>();

    // store eyeball origin and screen offset on mount
    useEffect(() => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect();
        console.log(rect);
        origin.current = new Vec2(
            parseFloat(ref.current.getAttribute("cx") || ''),
            parseFloat(ref.current.getAttribute("cy") || '')
        );
        offset.current = new Vec2(
            rect.x + rect.width / 2,
            rect.y + rect.height / 2
        );
    }, [ref]);

    // attach to pointer move event and move eyes accordingly
    useEffect(() => {
        const handler = (e: PointerEvent) => {
            if (!origin.current || !offset.current) return;

            // cursor position
            const cursor = new Vec2(e.clientX, e.clientY);
            // vector pointing in the direction of a cursor
            // it is clamped so the eyes won't fall out
            const direction = cursor.subtract(offset.current).clamp(boundA, boundB);

            // tween current eye position to the new one
            gsap.to(ref.current, {
                attr: {
                    cx: origin.current.x + direction.x,
                    cy: origin.current.y + direction.y
                }
            });

            // tween eyebrow object if any
            if (browsRef && browsRef.current) {
                gsap.to(browsRef.current, {
                    y: direction.y
                });
            }
        };
        document.addEventListener("pointermove", handler);

        return () => {
            document.removeEventListener("pointermove", handler);
        };
    }, [ref, browsRef]);
};

const Eyes: FC = (props) => {
    const leftEye = useRef<SVGCircleElement>(null);
    const rightEye = useRef<SVGCircleElement>(null);
    const browsRef = useRef<HTMLDivElement>(null);
    const upBrowRef = useRef(null);
    const downBrowRef = useRef(null);
    useEyeball(leftEye, browsRef);
    useEyeball(rightEye);

    // animating eyebrow blink
    useEffect(() => {
        // create infinite animation timeline loop

        // initial eye open
        const timeline = gsap.timeline({
            repeat: -1
        });

        const firstOpenDelay = 0.7 + Math.random() / 2

        gsap.to(upBrowRef.current, {
            y: -6,
            duration: 0.3,
            ease: "ease",
            delay: firstOpenDelay
        });
        gsap.to(downBrowRef.current, {
            y: 14,
            duration: 0.3,
            ease: "ease",
            delay: firstOpenDelay
        });

        // blink loop
        // every eye pair receives a random blink interval on mount
        const blinksAt = 3 + Math.random() * 1.5;
        const blinkDuration = 0.2;

        timeline.to(
            upBrowRef.current,
            {
                y: 5,
                duraion: blinkDuration / 2,
                ease: "ease"
            },
            blinksAt
        );
        timeline.to(
            downBrowRef.current,
            {
                y: -5,
                duraion: blinkDuration / 2,
                ease: "ease"
            },
            blinksAt
        );
        timeline.to(
            upBrowRef.current,
            {
                y: -6,
                duraion: blinkDuration / 2,
                ease: "ease"
            },
            blinksAt + blinkDuration
        );
        timeline.to(
            downBrowRef.current,
            {
                y: 14,
                duraion: blinkDuration / 2,
                ease: "ease"
            },
            blinksAt + blinkDuration
        );
    }, [upBrowRef, downBrowRef]);

    return (
        <Wrapper {...props}>
            <svg
                width="71"
                height="37"
                viewBox="0 0 71 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M33.7692 17.9142C35.1902 28.4293 22.97 36.6708 15.5811 36.1024C8.19211 35.534 4.55448 31.2143 1.37156 25.3032C-2.6071 17.9142 4.78184 6.83083 12.1708 1.9996C19.5597 -2.83163 32.3483 7.39921 33.7692 17.9142Z"
                    fill="#FFFFFF"
                />
                <path
                    d="M36.9168 17.9142C35.4959 28.4293 47.716 36.6708 55.105 36.1024C62.4939 35.534 66.1316 31.2143 69.3145 25.3032C73.2931 17.9142 65.9042 6.83083 58.5153 1.9996C51.1263 -2.83163 38.3378 7.39921 36.9168 17.9142Z"
                    fill="#FFFFFF"
                />
                <circle
                    ref={leftEye}
                    cx="17.0698"
                    cy="18.449"
                    r="5.39961"
                    fill="black"
                />
                <circle
                    ref={rightEye}
                    r="5.39961"
                    cx="54.0698"
                    cy="18.449"
                    fill="black"
                />
            </svg>

            <BrowWrapper ref={browsRef}>
                <BrowUp ref={upBrowRef} />
                <BrowDown ref={downBrowRef} />
            </BrowWrapper>
        </Wrapper>
    );
};

export default Eyes;
