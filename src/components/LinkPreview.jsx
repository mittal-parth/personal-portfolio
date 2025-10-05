import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const LinkPreview = ({ children, url, className }) => {
    const [isOpen, setIsOpen] = useState(false); //tooltip hidden or not
    const [position, setPosition] = useState({ x: 0, y: 0 }); //tracks position of tooltip
    const [metadata, setMetadata] = useState(null);//shows fetched metadata
    const [loading, setLoading] = useState(false);//tracks api status
    const ref = useRef(null);

    const updatePosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const previewWidth = 250; // Adjust this value to change preview card width
            const windowWidth = window.innerWidth;
            let xPos = rect.left + rect.width / 2;

            if (xPos - previewWidth / 2 < 10) { //Line 19: Preview width configuration (adjust this value to change preview width)
                xPos = previewWidth / 2 + 10;
            }

            if (xPos + previewWidth / 2 > windowWidth - 10) {
                xPos = windowWidth - previewWidth / 2 - 10;
            }

            setPosition({
                x: xPos + 50, // Adjust x axis for the box
                y: rect.bottom - 5, // Adjust y axis for the box
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

    useEffect(() => {
        if (isOpen && !metadata && !loading) {
            fetchMetadata();
        }
    }, [isOpen]);

    const fetchMetadata = async () => {
        setLoading(true);
        try {
            // Fetch metadata from microlink API
            const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.status === 'success') {
                // Set metadata with API response or fallbacks
                setMetadata({
                    // Use image URL from API, fallback to logo, or use domain-specific fallback
                    image: data.data.image?.url || data.data.logo?.url || getFallbackImage(url),
                    // Use title from API or fallback to domain name
                    title: data.data.title || getDomain(url),
                    // Use description from API or default text
                    description: data.data.description || 'Click to visit'
                });
            } else {
                // If API request fails, use fallback values
                setMetadata({
                    image: getFallbackImage(url),
                    title: getDomain(url),
                    description: 'Click to visit'
                });
            }
        } catch (error) {
            setMetadata({
                image: getFallbackImage(url),
                title: getDomain(url),
                description: 'Click to visit link'
            });
        }
        setLoading(false);
    };

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

    const getFallbackImage = (url) => { //until it loads from API or if API fails it shows default images based on domain
        const domain = getDomain(url);

        if (domain.includes("github")) {
            return "https://avatars.githubusercontent.com/u/76661350?v=4";
        } else if (domain.includes("youtube") || domain.includes("youtu.be")) {
            return "data:image/png;base64,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";
        } else if (domain.includes("medium") || domain.includes("dev.to") || domain.includes("blog")) {
            return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop";
        } else if (domain.includes("linkedin")) {
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAeFBMVEX///8AZsgAUcPm6vcAY8cAYMb7+/4ATsIbY8gAVsRmitP7/v+vwuft9PsAW8URbMoxeM6at+OgtuNKhdJSidPd6Pbn7/j09/x4odvA0OxynNnT4POXseA+fM4AScGmvuVqkdZtltfJ2vCKp921y+pfk9cxcMsrasr/9KMwAAAEOklEQVR4nO2ca3eqOhBABTPaiARUHobHUfH1///hxXraAg10nTqTBevO7uoXqnU3nbyTmc0YhmEYhmEYhmGYIbz4stlfd2HgvP0aJwh31/3mkni2pOc6E0spFYBwXkEAgJLuUmR6bkE+L25SvWbc/QOUDIucWNsvQolq/de9Vk8pvePyxfDoV4cypvPWf4i039X/aCJt7yDptB/IA0kd9daCsLwfCLGmMM/vxN61+Z2gcVkEQO3tOBAs0MUzRe/tOCrD9s6JK+YHEjtYjhYC5QEccb2rG3nNfCJuFap4YanA6ygvML2TlTVxWCWI4lVgKVLqWAkwY+ViqU15oC543l5hpRH/K17g9fvpyab4CW9k7kdDdRN57AWRjyde9rqBVO/fiOIlnnjS1/2IZXTJ87zKFF5zKW547WHimMVB6GdF8pIdWqELgSc+N1tBOP96zRXNXM37Tf5V3NiMi3uzq0h3WNEiqcWhPXbWWI2Liyjumj7grd03o41nyMXvnVedJyIuws6rsIa+1sU3ExGfbKg4or3Y52NNS8nFJ9sctue1/hGr6yQXd2DXCJY9WpdPL14PVj7KPEGcalgQd4SKdLpY5Ps3xFUAG+J1obvL+gt1U8iOOAEs/j8Xf2zHPvi5NtCLC9Xko10xPQMlytXqdDqudjf4qSbT95zhtsnpaQnF16PD/v0ZyPJ8yf3HvDpNqsM+GG7z6ccqq9aL1s/5nWyuQ1UPRXlbx81VtTQ+L4cK3YJ4a5HvQ7y5nFOLC1l825DyqttAoY9DvGenO933d7WjEHePPRZe0btyPQZxHfavSmV95mMQrwZW03oXJMcgPojuKfLRiyc9k9TRi88O5lgZv3hs3i8Yv/jsZIyV8Ygnel+GZaa//eTyNmZxf+24CgQo96Y7nX88ZnE/+zzvB7DtmN/HK75o7u0K6Bx0C021cxziVWva0N0KHK/4orOn5bZ3McYr7nfG3bJ9GmW84tWy857rRMS7h0NhNxHxDYuzOIuzOIuzOIuzOItbEI9YnMVZnMWnLG4+okokjnm21rgrSSWOeJo5MR4dIBLHPD+eGK8BwWrRwPsUbzycbTr/K4i85o+N4gGeeN8diaDJ5+eang6/py0eIl7u6DnULlqYHv7wHtMvhR2e+GTvAXlnm+JnxBvXa4t33STiXbdZ1XOfhgDhYN4uTAbvjKECEeZ9zpm9IFdnTO+ZNm7sURAgZ6Cwdfe3c0LtdbSlWFHoKT8iO5kQop9N/pGEIpNNFyFRm5QnGjdzkNEbP1BqvC15/YQtSWaYlLoxV2eiBEjpYfBM7IuI5YEucdMF8W5yB8BMJPAd/+RQJJwS4Jzwpg9m9DFQuO4CVHCkSjXVYKG3kXDfU8G96C8EgFKuiLaaNC3ZF36si+xaBiDd5a9xJQRllBU6pg6SLs2Fhl9iK2MgwzAMwzAMwzDMpPkPUmpq8yTKWowAAAAASUVORK5CYII=";
        } else {
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop";
        }
    };

    return (
        <>
            <span ref={ref}
                style={{ display: "inline-block" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={className}
            >
                {children}
            </span>
            {typeof document !== 'undefined' && createPortal(
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
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-teal-200 rounded-xl shadow-2xl shadow-teal-200/50 overflow-hidden w-[250px] backdrop-blur-sm"> {/* Adjust w-[250px] to match previewWidth */}
                                <motion.div
                                    className="relative h-[100px] overflow-hidden"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={metadata?.image || getFallbackImage(url)}
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
                                        {metadata?.title || 'Click to visit'}
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