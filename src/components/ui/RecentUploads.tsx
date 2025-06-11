'use client';

import { useEffect, useState } from 'react';

export default function RecentUploads() {
    const [uploads, setUploads] = useState<{ virus_total_id: string, time: number }[]>([]);

    useEffect(() => {
        const recent = JSON.parse(localStorage.getItem('recentUploads') || '[]');
        setUploads(recent);
    }, []);

    if (uploads.length === 0) return null;

    return (
        <div className="md:w-full md:pl-5 text-left">
            <h2 className="text-lg font-bold mb-2">Recent Uploads</h2>
            <table className="table-auto w-full text-sm text-muted-foreground border-collapse">
                <thead>
                <tr className="border-b">
                    <th className="text-left px-2 py-1">Upload ID</th>
                    <th className="text-right px-2 py-1">Time</th>
                </tr>
                </thead>
                <tbody>
                {uploads.map((item, index) => (
                    <tr key={index} className="align-top border-b cursor-pointer hover:bg-primary-foreground" onClick={() => window.location.href = `/analysis/${item.virus_total_id}`}>
                        <td className="break-all px-2 py-1 w-[70%] trucate line-clamp-1">{item.virus_total_id}</td>
                        <td className="whitespace-nowrap text-right text-xs px-2 py-1">{new Date(item.time).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}
