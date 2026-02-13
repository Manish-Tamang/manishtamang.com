import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UsesCardProps {
    item: {
        name: string;
        description: string;
        image?: string;
        icon?: React.ComponentType<any>;
        link?: string;
        tags?: string[];
    };
    displayStyle: 'imageWithTags' | 'iconOnly';
}

const UsesCard: React.FC<UsesCardProps> = ({ item, displayStyle }) => {
    const content = (
        <div className="flex flex-col items-center justify-center h-full min-h-[120px] sm:min-h-[140px] p-4 border-r border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
            {displayStyle === 'imageWithTags' && item.image && (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <Image
                        src={item.image}
                        alt={item.name}
                        className="object-contain"
                        width={80}
                        height={80}
                    />
                </div>
            )}
            {displayStyle === 'iconOnly' && item.icon && (
                <div className="mb-3">
                    <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-foreground" />
                </div>
            )}
            <p className="text-xs sm:text-sm font-medium text-foreground text-center">
                {item.name}
            </p>
            {displayStyle === 'imageWithTags' && item.description && (
                <p className="text-xs text-foreground/60 text-center mt-1">
                    {item.description}
                </p>
            )}
            {displayStyle === 'imageWithTags' && item.tags && item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {item.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-foreground/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );

    if (item.link) {
        return (
            <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {content}
            </Link>
        );
    }

    return content;
};

export default UsesCard;