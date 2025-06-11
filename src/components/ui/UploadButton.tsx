'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { buttonVariants } from './button.tsx';
import type {ScannedFileDTO} from "@/DTO/ScannedFileDTO.ts";

type Props = {
    uploadUrl?: string;
    buttonText?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'link';
};

const UploadButton: React.FC<Props> = ({ uploadUrl = "https://caibackend.darrenchanyuhao.com/scan/scan_file", buttonText = "Upload File", variant="default"}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);

        try {
            const response = await axios.post<ScannedFileDTO>(uploadUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Upload success:', response.data);

            if (response.status == 200 && response.data.virus_total_id) {
                // Redirect to the scan result page
                // alert('File uploaded successfully!');
                localStorage.setItem("scannedFileData", JSON.stringify(response.data));
                window.location.href = `/analysis/${response.data.virus_total_id}`;
            }
            else {
                // Handle the case where the response does not contain a virus_total_id
                console.error('No virus_total_id in response:', response.data);
                alert('File uploaded but no scan result available.');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed!');
        }
    };

    return (
        <div className="relative inline-block">
            <input
                type="file"
                id="file-upload"
                name="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className={buttonVariants({ variant: variant, className: 'cursor-pointer' })}>
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        Uploading...
                    </>
                ) : (
                    buttonText
                )}
            </label>
        </div>
    );
};

export default UploadButton;