import { useState } from "react";

interface ImageSliderProps {
    images: string[];
    className?: string;
}

function ImageSlider({ images, className = "" }: ImageSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Return null if there are no images
    if (images.length === 0) {
        return null;
    }

    function handleNextSlide() {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    }

    function handlePrevSlide() {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }

    return (
        <div className={`overflow-hidden rounded-lg shadow-lg relative w-full h-[40vh] mb-8 mx-auto ${className}`}>
            {/* Slide container */}
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    width: `${images.length * 100}%`, // Dynamic width based on the number of images
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[40vh] object-cover"
                        style={{ flex: "0 0 100%" }}
                    />
                ))}
            </div>

            {/* Previous button */}
            <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full focus:outline-none"
                onClick={handlePrevSlide}
            >
                ‹
            </button>

            {/* Next button */}
            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full focus:outline-none"
                onClick={handleNextSlide}
            >
                ›
            </button>
        </div>
    );
}

export default ImageSlider;
