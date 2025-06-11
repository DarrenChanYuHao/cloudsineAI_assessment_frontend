import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UploadButton from "@/components/ui/UploadButton.tsx";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/analysis/${searchQuery}`;
        }
    };

    return (
        <div className="flex w-full">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 mb-4">
                <Input
                    type="search"
                    placeholder="Search by SHA256 hash"
                    value={searchQuery}
                    className="text-xs"
                    onChange={(e) => setSearchQuery(e.target.value)}
                /><Button type="submit" variant="outline" className="cursor-pointer">
                    <img src="/assets/search.png" alt="search" className="w-3 h-3" />
            </Button>
            </form>
        </div>
    );
};

export default Search;