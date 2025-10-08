import React from 'react';

export default function ProjectCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative
        block
        p-8
        rounded-3xl
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950
        shadow-[0_15px_35px_rgba(0,0,0,0.7)]
        overflow-hidden
        transform transition-all duration-500
        hover:scale-105 hover:rotate-1 hover:shadow-[0_25px_50px_rgba(255,200,50,0.5)]
        group
      "
    >
      {/* Glint: diagonal streak contained within card */}
      <span className="
        absolute top-0 left-0 w-1/3 h-full bg-white/15 rotate-12
        -translate-x-full
        animate-[glintMove_2s_linear_infinite]
        pointer-events-none
      "></span>

      {/* Floating sparkles */}
      <span className="
        absolute top-1/4 left-1/3 w-1 h-1 bg-yellow-400 rounded-full opacity-50
        animate-[sparkle1_3s_linear_infinite]
        pointer-events-none
      "></span>
      <span className="
        absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full opacity-40
        animate-[sparkle2_4s_linear_infinite]
        pointer-events-none
      "></span>
      <span className="
        absolute top-1/3 left-2/4 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-60
        animate-[sparkle3_4.5s_linear_infinite]
        pointer-events-none
      "></span>

      {/* Title */}
      <h3 className="relative text-3xl md:text-4xl font-playfair text-white mb-3 tracking-wide group-hover:text-yellow-400 transition-colors duration-500">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-gray-300 group-hover:text-gray-100 transition-colors duration-500 text-lg">
        {description}
      </p>
    </a>
  );
}
