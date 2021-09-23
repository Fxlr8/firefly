import Vec2 from 'vec2'
import Color from 'color'

const WIDTH = 200
const HEIGHT = 270
const PADDING_X = 40
const PADDING_Y = 60

const CORE = 2
const RADIUS = 25
const SPEED = 30 // px/s

const bounds = {
    from: new Vec2(PADDING_X, PADDING_Y),
    to: new Vec2(WIDTH - PADDING_X, HEIGHT - PADDING_Y)
}

// linear interpolation function
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Describes a single firefly entity for the visualisation
 */
export default class Fly {
    pos: Vec2
    vel: Vec2
    deviation = 0.7 + Math.random() * 0.6
    size = RADIUS * this.deviation
    glow: Color
    halo: Color
    t = 0
    brightness = 0.3
    constructor(x: number, y: number) {
        const angle = 5 + (Math.random() * 2 - 1) * 10

        // make their colors slightly different
        this.glow = Color("#b5c800bb").rotate(angle)
        this.halo = Color("#ccd60599").rotate(angle)

        this.pos = new Vec2(x, y)
        // giving a random direction to move
        this.vel = new Vec2(SPEED, 0).rotate(Math.random() * Math.PI * 2)
    }

    public update(dt: number) {
        // movement is screen refresh rate independent
        // deviation: every firefly moves at slightly different speed
        const time = (dt / 1000) * this.deviation

        this.brightness = lerp(this.brightness, 1, 0.3 * time * 10) // slowly blinks between 0.5 and 1

        // pick a random angle to steer
        const angle = (Math.random() * 2 - 1) * Math.PI * 4 * time

        // steering the firefly
        this.vel.rotate(angle)

        // moving it
        this.pos.add(this.vel.multiply(time, true))

        // keep firefly in bounds
        this.pos.clamp(bounds.from, bounds.to)

        // wall collision
        // changing move direction on wall contact
        if (this.pos.x === bounds.from.x || this.pos.x === bounds.to.x) {
            this.vel.set(-this.vel.x, this.vel.y, false)
        }
        if (this.pos.y === bounds.from.y || this.pos.y === bounds.to.y) {
            this.vel.set(this.vel.x, -this.vel.y, false)
        }


    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Create gradient to render firefly
        var grd = ctx.createRadialGradient(
            this.pos.x,
            this.pos.y,
            CORE,
            this.pos.x,
            this.pos.y,
            this.size
        )

        grd.addColorStop(0, "#fffefd")
        grd.addColorStop(0.05, "#fffefd")
        grd.addColorStop(0.08, this.glow.darken(1 - this.brightness).toString())
        grd.addColorStop(0.2, this.halo.darken(1 - this.brightness).toString())
        grd.addColorStop(1, "#2C2C2C00")

        // Fill with gradient
        ctx.fillStyle = grd
        ctx.fillRect(
            Math.max(this.pos.x - this.size, 0),
            Math.max(this.pos.y - this.size, 0),
            Math.max(this.pos.x + this.size, 0),
            Math.max(this.pos.y + this.size, 0)
        )
    }
}

export {
    WIDTH,
    HEIGHT
}