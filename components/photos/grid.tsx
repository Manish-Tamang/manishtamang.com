"use client";

import { BlurImage } from "@/components/shared";
import { ImageModal, GalleryImage } from "@/components/shared/image-modal";
import { useEffect, useState } from "react";

interface PhotosGridProps {
  images: GalleryImage[];
}

export function PhotosGrid({ images }: PhotosGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  useEffect(() => {
    const updateGridCols = () => {
      if (window.innerWidth >= 768) {
        setGridCols(4);
      } else if (window.innerWidth >= 640) {
        setGridCols(3);
      } else {
        setGridCols(2);
      }
    };

    updateGridCols();
    window.addEventListener("resize", updateGridCols);
    return () => window.removeEventListener("resize", updateGridCols);
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const getResponsiveColSpan = (originalCols: number) => {
    if (gridCols === 2) {
      return Math.min(originalCols, 2);
    } else if (gridCols === 3) {
      return Math.min(originalCols, 3);
    } else {
      return originalCols;
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-foreground/60 py-12">
        No images found in gallery.
      </div>
    );
  }

  return (
    <>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridAutoRows: "minmax(100px, auto)",
          gridAutoFlow: "dense",
        }}
      >
        {images.map((image) => {
          const [c, r] = (image.format || "1x1").split("x").map(Number);
          const responsiveCols = getResponsiveColSpan(c);

          return (
            <div
              key={image._id}
              className="relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                gridColumn: `span ${responsiveCols}`,
                gridRow: `span ${r}`,
              }}
              onClick={() => handleImageClick(image)}
            >
              <BlurImage
                src={image.imageURL}
                alt={image.alt || image.caption || "Gallery image"}
                width={670}
                height={670}
                className="w-full h-full object-cover"
                lazy={true}
              />
            </div>
          );
        })}
      </div>

      <ImageModal
        image={selectedImage}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
