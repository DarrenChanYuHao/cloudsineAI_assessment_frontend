import React from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import type { ScannedAnalysisDTO } from '@/DTO/ScannedAnalysisDTO.ts';

interface Props {
    analysisData: ScannedAnalysisDTO;
}

const VirusTotalResults: React.FC<Props> = ({ analysisData }) => {
    if (!analysisData) return null;

    const entries = Object.entries(analysisData.results || {});

    // Engines WITH results (e.g., detections)
    const detectedEngines = entries
        .filter(([_, result]) => result.result)
        .sort(([aEngine], [bEngine]) => aEngine.localeCompare(bEngine));

    // Engines WITHOUT results but scanned (category === 'undetected')
    const undetectedEngines = entries
        .filter(([_, result]) => !result.result && result.category === 'undetected')
        .sort(([aEngine], [bEngine]) => aEngine.localeCompare(bEngine));

    // Engines that did not scan (category !== 'undetected' and no result)
    const notScannedEngines = entries
        .filter(([_, result]) => !result.result && result.category !== 'undetected')
        .sort(([aEngine], [bEngine]) => aEngine.localeCompare(bEngine));

    return (
        <Card>
            <CardContent>
                <p className="text-lg mb-4">
                    <strong>Status:</strong>{' '}
                    {analysisData.scan_status === 'completed' ? 'Completed' : 'Pending'}
                </p>

                {entries.length > 0 ? (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Scan Results:</h2>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {detectedEngines.map(([engine, result]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between"
                                >
                                    <span>{engine}:</span>{' '}
                                    <span
                                        className={`text-right ${
                                            result.result && result.result !== 'undetected'
                                                ? 'text-destructive'
                                                : ''
                                        }`}
                                    >
                    {result.result}
                  </span>
                                </div>
                            ))}

                            {undetectedEngines.map(([engine]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between"
                                >
                                    <span>{engine}:</span>{' '}
                                    <span className="text-right text-emerald-600">Undetected</span>
                                </div>
                            ))}

                            {notScannedEngines.map(([engine]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between"
                                >
                                    <span>{engine}:</span>{' '}
                                    <span className="text-right text-yellow-600">Not Scanned</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg mt-4">No scan results available.</p>
                )}
            </CardContent>

            <CardFooter>
                <CardAction className="flex justify-end">
                    <a
                        href={`https://www.virustotal.com/gui/file/${
                            analysisData.metadata.sha256 || 'NA'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        View on VirusTotal
                    </a>
                </CardAction>
            </CardFooter>
        </Card>
    );
};

export default VirusTotalResults;