import React, { useState } from "react";

const ZoomableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3)); // max 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5)); // min 0.5x

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-full max-w-sm object-cover rounded-lg shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* prevent click đóng khi click vào ảnh */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center"
          >
            <img
              src={src}
              alt={alt}
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.2s",
              }}
              className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg shadow-lg"
            />

            {/* nút + / – */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={zoomIn}
                className="bg-white px-3 py-1 rounded shadow hover:bg-gray-200"
              >
                +
              </button>
              <button
                onClick={zoomOut}
                className="bg-white px-3 py-1 rounded shadow hover:bg-gray-200"
              >
                -
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomableImage;
