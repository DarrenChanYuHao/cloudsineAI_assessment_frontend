import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UploadButton from "@/components/ui/UploadButton.tsx";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/analysis/${searchQuery}`;
        }
    };

    return (
        <div className="flex w-full gap-2">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 mb-4">
                <Input
                    type="search"
                    placeholder="Search using SHA256 file hash"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /><Button type="submit" variant="outline" className="cursor-pointer">
                Search
            </Button>

            </form>
            <div>
                <UploadButton uploadUrl="https://caibackend.darrenchanyuhao.com/scan/scan_file"
                              buttonText="Upload Another File" variant="outline"/>
            </div>
        </div>
    );
};

export default SearchBar;