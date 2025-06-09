'use client';

import React from 'react';
import axios from 'axios';
import { buttonVariants } from './button.tsx';
import type {ScannedFileDTO} from "@/DTO/ScannedFileDTO.ts";

type Props = {
    uploadUrl?: string;
};

const UploadButton: React.FC<Props> = ({ uploadUrl = "https://caibackend.darrenchanyuhao.com/scan/scan_file"}) => {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

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
            <label htmlFor="file-upload" className={buttonVariants({ variant: 'default', className: 'cursor-pointer' })}>
                Upload File
            </label>
        </div>
    );
};

export default UploadButton;