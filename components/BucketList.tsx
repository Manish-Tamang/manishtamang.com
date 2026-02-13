"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox";

interface BucketListItem {
    id: number;
    title: string;
    date?: string;
    description?: string;
    completed: boolean;
    images?: string[];
}

interface BucketListProps {
    bucketList: BucketListItem[];
    setBucketList: React.Dispatch<React.SetStateAction<BucketListItem[]>>;
}

const BucketList: React.FC<BucketListProps> = ({ bucketList, setBucketList }) => {
    const [hoveredImage, setHoveredImage] = useState<{ index: number; image: string | null; posY?: number; posX?: number; }>({ index: -1, image: null });
    const imageRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const completedCount = bucketList.filter((item) => item.completed).length;

    return (
        <div>
            <div className="space-y-2 mt-6">
                {bucketList.map((item, index) => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 dark:border-gray-700 pb-2 gap-4 sm:gap-0">
                        <div className="flex items-start sm:items-center">
                            <Checkbox
                                className="mr-2 h-4 w-4 border-gray-300 dark:border-gray-600 text-[#38A662] dark:text-[#38A662] focus:ring-[#38A662] dark:focus:ring-[#38A662]"
                                checked={item.completed}
                                onCheckedChange={() => { }}
                            />
                            <div className="text-gray-700 dark:text-gray-300">
                                <span className="font-medium font-mono"> {item.title} </span>
                                {item.date && <div className="text-gray-500 text-sm">{item.date}</div>}
                                {item.description && <div className="text-gray-500 text-sm w-max">{item.description}</div>}
                            </div>
                        </div>
                        {item.images && (
                            <div className={`flex relative ml-auto ${isMobile ? 'justify-end' : ''}`} onMouseLeave={() => setHoveredImage({ index: -1, image: null })} ref={imageRef}>
                                {item.images.slice(0, 4).map((image, imageIndex) => (
                                    <img
                                        key={imageIndex}
                                        src={image}
                                        alt={item.title}
                                        className="h-10 w-10 rounded-[4px] ml-1 object-cover transform transition-transform duration-300 hover:scale-110"
                                        onMouseEnter={(e) => {
                                            if (!isMobile) {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setHoveredImage({
                                                    index: imageIndex,
                                                    image,
                                                    posX: e.clientX + 20,
                                                    posY: rect.top
                                                });
                                            }
                                        }}
                                    />
                                ))}
                                {hoveredImage.index !== -1 && hoveredImage.image && !isMobile && (
                                    <div className={`fixed z-10 flex items-center justify-center rounded-[4px]`} style={{ top: hoveredImage.posY, left: hoveredImage.posX }}>
                                        <Image src={hoveredImage.image} alt={item.title} width={200} height={200} className="rounded-[4px] object-cover" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div className="mt-4 text-right text-gray-500 dark:text-gray-400 text-sm">
                    {completedCount} out of {bucketList.length} completed.
                </div>
            </div>
        </div>
    );
};

export default BucketList;
