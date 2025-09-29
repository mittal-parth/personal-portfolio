import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const LinkPreview = ({ children, url, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const updatePosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const newPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      };
      console.log("🎯 Position updated:", newPosition);
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    if (isOpen) {
      console.log("✅ Preview opened for URL:", url);
      updatePosition();
    } else {
      console.log("❌ Preview closed");
    }
  }, [isOpen, url]);

  const handleMouseEnter = () => {
    console.log("🖱️ Mouse entered!");
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    console.log("🖱️ Mouse left!");
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
    return "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop";
  };

  const previewContent = isOpen ? (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500 rounded-xl shadow-2xl overflow-hidden w-[300px]">
        <div className="relative h-[160px] overflow-hidden">
          <img
            src={getPreviewImage(url)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <p className="text-xs text-gray-400 font-medium">
              {getDomain(url)}
            </p>
          </div>
          <p className="text-sm text-white font-semibold">
            Click to visit link
          </p>
        </div>
        <div
          className="absolute bottom-0 left-1/2"
          style={{ 
            transform: "translate(-50%, 50%)",
          }}
        >
          <div className="w-3 h-3 bg-slate-900 border-r border-b border-purple-500 rotate-45"></div>
        </div>
      </div>
    </div>
  ) : null;

  console.log("🔄 Render - isOpen:", isOpen);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{ 
          display: "inline-block",
          padding: "5px",
          border: "2px solid red",
          cursor: "pointer"
        }}
      >
        {children}
      </span>
      {typeof document !== 'undefined' && previewContent && createPortal(
        previewContent, 
        document.body
      )}
    </>
  );
};

// Main Test Component
export default function TestLinkPreview() {
  const [testCount, setTestCount] = useState(0);
  
  console.log("🧪 Test component rendered, count:", testCount);
  
  return (
    <div className="min-h-screen bg-slate-950 p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-white mb-10">Link Preview Test</h1>
        
        <div className="bg-slate-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl text-white mb-4">Test 1: Simple Text</h2>
          <p className="text-gray-400 mb-4">
            Hover over this link: {" "}
            <LinkPreview url="https://github.com" className="text-purple-400 font-bold">
              GitHub Link
            </LinkPreview>
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl text-white mb-4">Test 2: Icon Button</h2>
          <LinkPreview url="https://youtube.com">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                console.log("Button clicked!");
              }}
            >
              YouTube Button
            </button>
          </LinkPreview>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl text-white mb-4">Test 3: Multiple Links</h2>
          <div className="flex gap-4">
            <LinkPreview url="https://github.com">
              <div className="bg-slate-800 p-4 rounded hover:bg-slate-700 cursor-pointer">
                <span className="text-white">GitHub</span>
              </div>
            </LinkPreview>
            
            <LinkPreview url="https://twitter.com">
              <div className="bg-slate-800 p-4 rounded hover:bg-slate-700 cursor-pointer">
                <span className="text-white">Twitter</span>
              </div>
            </LinkPreview>
            
            <LinkPreview url="https://linkedin.com">
              <div className="bg-slate-800 p-4 rounded hover:bg-slate-700 cursor-pointer">
                <span className="text-white">LinkedIn</span>
              </div>
            </LinkPreview>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg">
          <h2 className="text-2xl text-white mb-4">Debug Info</h2>
          <button 
            onClick={() => {
              setTestCount(c => c + 1);
              console.log("Force re-render triggered");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
          >
            Force Re-render (Count: {testCount})
          </button>
          <p className="text-gray-400 text-sm">
            Open browser console (F12) to see debug logs
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Red borders show hoverable areas
          </p>
        </div>
      </div>
    </div>
  );
}