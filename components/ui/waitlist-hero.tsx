"use client"

import Image from "next/image"
import { useState, useRef } from "react"
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

export const WaitlistHero = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // 'idle' | 'loading' | 'success'

const canvasRef = useRef<HTMLCanvasElement | null>(null)
const sliderRef = useRef<HTMLDivElement | null>(null)
const buttonRef = useRef<HTMLDivElement | null>(null)

const [dragX, setDragX] = useState(0)
const [dragging, setDragging] = useState(false)

const onDragStart = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
  setDragging(true)
}

const onDragMove = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
  if (!dragging) return

  const slider = sliderRef.current
  const button = buttonRef.current
  if (!slider || !button) return

  const sliderRect = slider.getBoundingClientRect()
  const buttonRect = button.getBoundingClientRect()

  const clientX =
    "touches" in e ? e.touches[0].clientX : e.clientX

  const newX =
    sliderRect.right - clientX - buttonRect.width / 2

  const maxDrag = sliderRect.width - buttonRect.width - 12
  const clamped = Math.max(0, Math.min(newX, maxDrag))

  setDragX(clamped)
}

const onDragEnd = () => {
  const slider = sliderRef.current
  const button = buttonRef.current
  if (!slider || !button) return

  const maxDrag = slider.offsetWidth - button.offsetWidth - 12
  const successThreshold = maxDrag * 0.7

  setDragging(false)

  if (dragX > successThreshold) {
    // ✅ SUCCESS
    setDragX(maxDrag)

    setTimeout(() => {
      window.location.href = "https://op.salamat.gov.ir"
    }, 300)
  } else {
    // ❌ Reset
    setDragX(0)
  }
}


 

  // --- Confetti Logic ---
  const fireConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

const context = canvas.getContext("2d")
if (!context) return

const particles: Particle[] = []
const colors = {
  textMain: "#0f172a",        // slate-900 (almost black)
  textSecondary: "#475569",   // slate-600
  bluePrimary: "#0079da",
  success: "#10b981",
  inputBg: "#ffffff",
  baseBg: "#ffffff",
  inputShadow: "rgba(0, 0, 0, 0.12)",
}

const colorValues = Object.values(colors)

const createParticle = (): Particle => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: (Math.random() - 0.5) * 12,
  vy: (Math.random() - 2) * 10,
  life: 100,
  color: colorValues[Math.floor(Math.random() * colorValues.length)],
  size: Math.random() * 4 + 2,
})

    // Resize canvas to cover the button area mostly
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

   

    // Create batch of particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      if (particles.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5 // Gravity
        p.life -= 2

        context.fillStyle = p.color
        context.globalAlpha = Math.max(0, p.life / 100)
        context.beginPath()
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        context.fill()

        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }

  // Color tokens
  const colors = {
    textMain: "#ffffff",
    textSecondary: "#94a3b8",
    bluePrimary: "#0079da",
    success: "#10b981", // emerald-500
    inputBg: "#27272a",
    baseBg: "#d3d2d8",
    inputShadow: "rgba(255, 255, 255, 0.1)",
  }

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      {/* Animation Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
      `}</style>

      {/* Main Container */}
      <div
        className="relative w-full h-screen overflow-hidden shadow-2xl"
        style={{
          backgroundColor: colors.baseBg,
        }}
      >
        {/* Background Decorative Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px) rotateX(15deg)",
            transformOrigin: "center bottom",
            opacity: 1,
          }}
        >
          {/* Image 3 (Back) - spins clockwise */}
          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "2000px",
                height: "2000px",
                transform: "translate(-50%, -50%) rotate(279.05deg)",
                zIndex: 0,
              }}
            >
              <Image
                src="/v1.png"
                height={1000}
                width={1000}
                alt=""
                className="w-full h-full object-cover opacity-50 blur-md"
              />
            </div>
          </div>

          {/* Image 2 (Middle) - spins counter-clockwise */}
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "1000px",
                height: "1000px",
                transform: "translate(-50%, -50%) rotate(304.42deg)",
                zIndex: 1,
              }}
            >
              <Image
              height={1000}
              width={1000}
                src="/v2.png"
                alt=""
                className="w-full h-full object-cover opacity-60 blur-sm"
              />
            </div>
          </div>

          {/* Image 1 (Front) - spins clockwise */}
          <div className="absolute inset-0 animate-spin-slow">
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: "800px",
                height: "800px",
                transform: "translate(-50%, -50%) rotate(48.33deg)",
                zIndex: 2,
              }}
            >
              <Image
                src="/ccnn.png"
                alt="App Icon"
                width={1000} height={1000}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(
  to top,
  rgba(255,255,255,1) 10%,
  rgba(255,255,255,0.85) 40%,
  rgba(255,255,255,0) 100%
)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6">
          <div className="w-50 h-50  rounded-2xl  overflow-hidden mb-2 ring-1 ring-white/10">
<Image src="/logohubz.png" width={1000} height={1000} alt="salm" />
          </div>

          <h1 className="text-3xl md:text-6xl text-black font-bold text-center tracking-tight relative">
            سکوی ملی سلامت
                       <Image src="/najilo.png" alt="sals" width={100} height={100} className=" absolute -top-5 md:-left-15 -left-10 md:w-15 md:h-20 w-10 h-15"  />

          </h1>

          <p className="text-sm md:text-lg font-medium text-center text-black/50  ">
           سرعت بالاتر و مانیتوریگ لحظه ای خدمات عبوری از اپراتوری  هوشمند سلامت ناجی 
          </p>

          {/* Form / Success Container */}
          <div className="w-full max-w-md px-4 mt-4 h-[60px] relative perspective-1000">
            {/* Confetti Canvas - overlays everything but ignores clicks */}
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-50"
            />

            {/* SUCCESS STATE */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-100 scale-100 rotate-x-0 animate-success-pulse animate-success-glow"
                  : "opacity-0 scale-95 -rotate-x-90 pointer-events-none"
              }`}
              style={{ backgroundColor: colors.success }}
            >
              {/* Celebration rings */}
              {status === "success" && (
                <>
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-400 animate-ring"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-300 animate-ring"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-200 animate-ring"
                    style={{ animationDelay: "0.3s" }}
                  />
                </>
              )}
              <div
                className={`flex items-center gap-2 text-white font-semibold text-lg ${status === "success" ? "animate-bounce-in" : ""}`}
              >
                <div className="bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      className={status === "success" ? "animate-checkmark" : ""}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>You're on the list!</span>
              </div>
            </div>

            {/* FORM STATE */}
            <div
  ref={sliderRef}
  className="relative h-full bg-[#27272a] rounded-full overflow-hidden"
  onMouseMove={onDragMove}
  onMouseUp={onDragEnd}
  onMouseLeave={onDragEnd}
  onTouchMove={onDragMove}
  onTouchEnd={onDragEnd}
>
  {/* Label */}
  <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[15px] text-white/60 pointer-events-none">
    احراز هویت و نسخه نویسی
  </div>

  {/* Draggable Button */}
  <div
    ref={buttonRef}
    onMouseDown={onDragStart}
    onTouchStart={onDragStart}
    className="select-none absolute top-[6px] bottom-[6px] right-[6px] flex items-center justify-center px-6 min-w-[130px] rounded-full text-white font-medium cursor-grab active:cursor-grabbing transition-[transform] duration-300"
    style={{
      backgroundColor: colors.bluePrimary,
      transform: `translateX(-${dragX}px)`,
    }}
  >
    ورود به پنل
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}