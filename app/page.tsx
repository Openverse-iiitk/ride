"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

// Pixel dot positions from Figma design (base canvas: 1440 × 900px)
const LEFT_DOTS = [
  { x: 178, y: 307 }, { x: 232, y: 322 }, { x: 205, y: 363 },
  { x: 173, y: 358 }, { x: 210, y: 279 }, { x: 109, y: 335 },
  { x: 163, y: 350 }, { x: 136, y: 391 }, { x: 104, y: 386 },
  { x: 141, y: 307 }, { x: 190, y: 428 }, { x: 50, y: 442 },
  { x: 18, y: 438 }, { x: 82, y: 414 },
];

const RIGHT_DOTS = [
  { x: 1316, y: 279 }, { x: 1370, y: 294 }, { x: 1343, y: 335 },
  { x: 1311, y: 330 }, { x: 1348, y: 251 }, { x: 1208, y: 265 },
  { x: 1262, y: 280 }, { x: 1144, y: 289 }, { x: 1176, y: 261 },
  { x: 1036, y: 275 }, { x: 1090, y: 290 }, { x: 1235, y: 321 },
  { x: 1203, y: 316 }, { x: 1240, y: 237 },
];

const ALL_DOTS = [...LEFT_DOTS, ...RIGHT_DOTS];

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 98 96"
      width="38"
      height="38"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#4b51f1"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

export default function Home() {
  const rideRef = useRef<HTMLHeadingElement>(null);
  const tagline1Ref = useRef<HTMLParagraphElement>(null);
  const tagline2Ref = useRef<HTMLParagraphElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Soft drop-in for "ride." title from above
      tl.fromTo(
        rideRef.current,
        { y: -110, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3 }
      )
        // Nav slides in from top simultaneously
        .fromTo(
          navRef.current,
          { y: -44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=1.1"
        )
        // Car rises in from below
        .fromTo(
          carWrapperRef.current,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
          "-=0.5"
        )
        // Tagline lines drop down with stagger
        .fromTo(
          [tagline1Ref.current, tagline2Ref.current],
          { y: -55, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.13 },
          "-=0.9"
        )
        // Pixel dots pop in with back-ease stagger
        .fromTo(
          dotRefs.current.filter(Boolean),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.38,
            stagger: { each: 0.03, from: "random" },
            ease: "back.out(2.5)",
          },
          "-=1.7"
        );
    });

    return () => ctx.revert();
  }, []);

  const handleCarEnter = () => {
    gsap.to(carWrapperRef.current, {
      scale: 0.836,
      y: -10,
      duration: 0.55,
      ease: "power2.out",
    });
  };

  const handleCarLeave = () => {
    gsap.to(carWrapperRef.current, {
      scale: 0.8,
      y: 0,
      duration: 0.55,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="ride-page">
      {/* ride. — hero title */}
      <h1 ref={rideRef} className="ride-title">
        ride.
      </h1>

      {/* Top-right nav */}
      <nav ref={navRef} className="ride-nav">
        <button className="ride-btn">Login</button>
        <a
          href="https://github.com/Openverse-iiitk/ride"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label="GitHub Repository"
        >
          <GithubIcon />
        </a>
      </nav>

      {/* Blue pixel dots — left & right clusters */}
      {ALL_DOTS.map((dot, i) => (
        <div
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="pixel-dot"
          style={{
            left: `${(dot.x / 1440) * 100}%`,
            top: `${(dot.y / 900) * 100}vh`,
          }}
        />
      ))}

      {/* Car — hover to zoom */}
      <div
        ref={carWrapperRef}
        className="car-wrapper"
        onMouseEnter={handleCarEnter}
        onMouseLeave={handleCarLeave}
      >
        <Image
          src="/images/car.png"
          alt="Porsche 911 GTS"
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* Tagline */}
      <div className="tagline">
        <p ref={tagline1Ref}>
          Like T<span className="pixel-font">r</span>avelling To
          <span className="pixel-font">g</span>ether?
        </p>
        <p ref={tagline2Ref}>
          fi<span className="pixel-font">n</span>d A P
          <span className="font-alt">a</span>rtner N
          <span className="font-alt">o</span>w.
        </p>
      </div>
    </div>
  );
}
