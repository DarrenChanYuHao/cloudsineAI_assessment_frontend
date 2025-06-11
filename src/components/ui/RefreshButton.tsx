'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

const RefreshButton: React.FC = () => {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <Button variant="ghost" className="px-2 cursor-pointer" onClick={handleClick}>
            <img src="/assets/refresh.png" alt="refresh" className="w-5 h-5" />
        </Button>
    );
};

export default RefreshButton;
