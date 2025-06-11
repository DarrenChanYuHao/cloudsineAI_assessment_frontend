import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UploadButton from "@/components/ui/UploadButton.tsx";
import Search from "@/components/ui/Search.tsx";

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
            <Button onClick={() => window.location.href = '/'} variant="ghost" className="px-2 cursor-pointer">
                <img src="/assets/home.png" alt="home" className="w-5 h-5" />
            </Button>
            <Search />
            <div className="not-md:hidden">
                <UploadButton uploadUrl="https://caibackend.darrenchanyuhao.com/scan/scan_file"
                              buttonText="Upload Another File" variant="outline"/>
            </div>
        </div>
    );
};

export default SearchBar;