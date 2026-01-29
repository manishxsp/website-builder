'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Define the props interface to match MapInner
interface MapProps {
    latitude: number;
    longitude: number;
    popupText?: string;
    height?: string;
    className?: string;
}

const Map = dynamic(() => import('./MapInner'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[300px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    ),
});

export default Map;
