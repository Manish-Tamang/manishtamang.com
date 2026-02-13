import React from 'react';
import UsesCard from '@/components/uses/UsesCard';
import {
    gearItems,
    systemItems,
    codingItems,
    softwareItems,
} from '@/data/uses';


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

const UsesGrid = () => {
    return (
        <>
            <section className="space-y-6 mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Gear</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-zinc-200 dark:border-zinc-800">
                    {gearItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="imageWithTags" />
                    ))}
                </div>
            </section>
            <section className="space-y-6 mb-12">
                <h2 className="text-3xl font-bold tracking-tight">System</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-zinc-200 dark:border-zinc-800">
                    {systemItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>

            <section className="space-y-6 mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Coding Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-zinc-200 dark:border-zinc-800">
                    {codingItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Software/Applications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-zinc-200 dark:border-zinc-800">
                    {softwareItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>
        </>
    );
};

export default UsesGrid;
