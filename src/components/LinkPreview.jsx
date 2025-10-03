import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const LinkPreview = ({ children, url, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const updatePosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const previewWidth = 300;
            const windowWidth = window.innerWidth;
            let xPos = rect.left + rect.width / 2;

            if (xPos - previewWidth / 2 < 10) {
                xPos = previewWidth / 2 + 10;
            }

            if (xPos + previewWidth / 2 > windowWidth - 10) {
                xPos = windowWidth - previewWidth / 2 - 10;
            }

            setPosition({
                x: xPos + 50,
                y: rect.bottom - 100,
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen, url]);

    const handleMouseEnter = () => {
        setIsOpen(true);
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
    
    const getPreviewImage = (url) => {
        const domain = getDomain(url);

        if (domain.includes("github")) {
            return "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop";
        } else if (domain.includes("youtube") || domain.includes("youtu.be")) {
            return "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop";
        } else if (domain.includes("medium") || domain.includes("dev.to") || domain.includes("blog")) {
            return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop";
        } else if (domain.includes("linkedin")) {
            return "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop";
        } else {
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop";
        }
    };

    return (
        <>
            <span
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={className}
                style={{ display: "inline-block" }}
            >
                {children}
            </span>
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 0.8
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
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 rounded-xl shadow-2xl overflow-hidden w-[300px] backdrop-blur-sm">
                                <motion.div
                                    className="relative h-[160px] overflow-hidden"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={getPreviewImage(url)}
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
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white animate-pulse" />
                                        <p className="text-xs text-gray-300 font-medium">
                                            {getDomain(url)}
                                        </p>
                                    </div>
                                    <p className="text-sm text-white font-semibold">
                                        Click to visit link
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