import React, { FC, useRef, useEffect, useState, RefObject } from 'react'
import useAnimationFrame from './useAnimationFrame'
import Fly, { WIDTH, HEIGHT } from './entities/Fly'

function useFirefly(
    canvas: RefObject<HTMLCanvasElement | null>,
    amount: number
) {
    const fireflies = useRef<Fly[]>([])

    useEffect(() => {
        const flies = fireflies.current

        if (flies.length > amount) {
            flies.length = amount
        }

        if (flies.length < amount) {
            for (let i = flies.length; i < amount; i++) {
                flies.push(new Fly(Math.random() * WIDTH, Math.random() * HEIGHT))
            }
        }
    }, [amount])

    useAnimationFrame((dt: number) => {
        if (!canvas.current) return
        const ctx = canvas.current.getContext('2d')
        if (!ctx) return

        // ctx.fillStyle = 'black'
        // ctx.globalCompositeOperation = 'source-over'
        // ctx.fillRect(0, 0, WIDTH, HEIGHT)
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        ctx.globalCompositeOperation = 'screen'
        fireflies.current.forEach((f) => {
            f.update(dt)
            f.draw(ctx)
        })
    })
}

interface FireflyProps {
    count: number
}

const Firefly: FC<FireflyProps> = ({ count, ...otherProps }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useFirefly(canvasRef, count)

    return (
        <canvas width={WIDTH + 'px'} height={HEIGHT + 'px'} ref={canvasRef} {...otherProps} />
    )
}

export default Firefly
