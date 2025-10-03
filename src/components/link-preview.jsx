import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const LinkPreview = ({ children, url, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const updatePosition = () => { //yeh sab calculates where your card should appear play with this for adjusting..got it from the link u send..thanks btw
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const previewWidth = 300;
            const windowWidth = window.innerWidth;

            let xPos = rect.left + rect.width / 2;

            if (xPos - previewWidth / 2 < 10) 
            {
                xPos = previewWidth / 2 + 10;
            }
            //this is to prevent getting off screen on right side
            if (xPos + previewWidth / 2 > windowWidth - 10) 
            {
                xPos = windowWidth - previewWidth / 2 - 10;
            }

            setPosition({
                x: xPos + 50,//and bhai isse se x axis pe move kar sakte ho
                y: rect.bottom - 100,//play with this to move up down bhai
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

    const handleMouseEnter = () => {//mouseenter just a usual thing as yk
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
                style={{
                    display: "inline-block",
                }}
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
                            {/* bhai change the design as per your need  below for the card things also box width*/}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2  rounded-xl shadow-2xl overflow-hidden w-[300px] backdrop-blur-sm">
                                <motion.div className="relative h-[160px] overflow-hidden"//change image height here bhai
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={getPreviewImage(url)}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* image gradient here bhai for better text visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                                </motion.div>
                                <motion.div className="p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white animate-pulse"></div>
                                        <p className="text-xs text-gray-300 font-medium">
                                            {getDomain(url)}
                                        </p>
                                    </div>
                                    <p className="text-sm text-white font-semibold">
                                        Click to visit link
                                    </p>
                                </motion.div>
                                {/* <div className="absolute top-0 left-1/2"
                                    style={{transform: "translate(-50%, -50%) rotate(45deg)",}}
                                >
                                    <div className="w-3 h-3 bg-slate-900 border-l border-t border-purple-500"></div>
                                </div> //bhai if u want u can uncomment this for arrow but i dont think it looks good    */}

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};