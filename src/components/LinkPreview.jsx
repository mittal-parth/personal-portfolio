import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const LinkPreview = ({ children, url, className }) => {
  const [isOpen, setIsOpen] = useState(false); // tooltip hidden or not
  const [position, setPosition] = useState({ x: 0, y: 0 }); // tracks position of tooltip
  const [metadata, setMetadata] = useState(null); // shows fetched metadata
  const [loading, setLoading] = useState(false); // tracks api status
  const ref = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const updatePosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const previewWidth = 250; // Adjust this value to change preview card width
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let xPos = rect.left + rect.width / 2;
      let yPos = rect.bottom + 10;

      if (xPos - previewWidth / 2 < 10) {
        // Preview width configuration (adjust this value to change preview width)
        xPos = previewWidth / 2 + 10;
      }

      if (xPos + previewWidth / 2 > windowWidth - 10) {
        xPos = windowWidth - previewWidth / 2 - 10;
      }

      if (yPos + 180 > windowHeight) {
        yPos = rect.top - 190;
      }

      setPosition({
        x: xPos,
        y: yPos,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, url]);

  useEffect(() => {
    if (isOpen && !metadata && !loading) {
      fetchMetadata();
    }
  }, [isOpen]);

  const fetchMetadata = async () => {
    setLoading(true);
    try {
      // Fetch metadata from microlink API
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();

      if (data.status === "success") {
        // Set metadata with API response or fallbacks
        setMetadata({
          // Use image URL from API, fallback to logo, or use domain-specific fallback
          image:
            data.data.image?.url ||
            data.data.logo?.url ||
            getFallbackImage(url),
          // Use title from API or fallback to domain name
          title: data.data.title || getDomain(url),
          // Use description from API or default text
          description: data.data.description || "Click to visit",
        });
      } else {
        // If API request fails, use fallback values
        setMetadata({
          image: getFallbackImage(url),
          title: getDomain(url),
          description: "Click to visit",
        });
      }
    } catch (error) {
      setMetadata({
        image: getFallbackImage(url),
        title: getDomain(url),
        description: "Click to visit link",
      });
    }
    setLoading(false);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const getDomain = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getFallbackImage = (url) => {
    // until it loads from API or if API fails it shows default images based on domain
    const domain = getDomain(url);

    if (domain.includes("github")) {
      return "https://avatars.githubusercontent.com/u/76661350?v=4";
    } else if (domain.includes("youtube") || domain.includes("youtu.be")) {
      return "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png";
    } else if (domain.includes("twitter") || domain.includes("x.com")) {
      return "https://abs.twimg.com/icons/apple-touch-icon-192x192.png";
    } else if (
      domain.includes("medium") ||
      domain.includes("dev.to") ||
      domain.includes("blog")
    ) {
      return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop";
    } else if (domain.includes("linkedin")) {
      return "https://cdn-icons-png.flaticon.com/512/174/174857.png";
    } else {
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop";
    }
  };

  return (
    <>
      <span
        ref={ref}
        style={{ display: "inline-block" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </span>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                //Animation config for smooth entrance/exit
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  position: "fixed",
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: "translateX(-50%)",
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-teal-700 rounded-xl shadow-xl shadow-teal-700/50 overflow-hidden w-[250px] backdrop-blur-md">
                  {" "}
                  {/* Adjust w-[250px] to match previewWidth */}
                  <motion.div
                    className="relative h-[100px] overflow-hidden"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={metadata?.image || getFallbackImage(url)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  </motion.div>
                  <motion.div
                    className="p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-200 to-teal-400 animate-pulse" />
                      <p className="text-xs text-gray-300 font-medium">
                        {getDomain(url)}
                      </p>
                    </div>
                    <p className="text-sm text-white font-semibold line-clamp-2">
                      {metadata?.title || "Click to visit"}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
