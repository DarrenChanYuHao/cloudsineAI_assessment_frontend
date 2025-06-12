import React from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import type { ScannedAnalysisDTO } from '@/DTO/ScannedAnalysisDTO.ts';
import {Badge} from "@/components/ui/badge.tsx";
import { Button } from '@/components/ui/button.tsx';

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
        <Card className="pt-0">
            <CardContent>
                <p className="text-xl mb-4 pt-4 font-semibold">
                    {analysisData.scan_status === 'completed' ?
                        null
                        : analysisData.last_analysis_date == 0 ? 'Pending Analysis' : 'Showing Old Results...'}
                </p>
                {entries.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Scan Results:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {detectedEngines.map(([engine, result]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between items-start gap-2"
                                >
                                    <span className="text-sm">{engine}</span>
                                    <Badge
                                        variant="default"
                                        className="destructive font-semibold max-w-1/2">
                                        <div className="truncate">
                                            {result.result}
                                        </div>
                                    </Badge>

                                </div>
                            ))}

                            {undetectedEngines.map(([engine]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between"
                                >
                                    <span>{engine}</span>{' '}
                                    <Badge variant="default" className="bg-emerald-600 font-semibold">
                                        No Detections
                                    </Badge>
                                </div>
                            ))}

                            {notScannedEngines.map(([engine]) => (
                                <div
                                    key={engine}
                                    className="text-muted-foreground flex justify-between"
                                >
                                    <span>{engine}</span>{' '}
                                    <Badge variant="default" className="bg-amber-500 font-semibold">
                                        Not Scanned
                                    </Badge>
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
                        href={`https://www.virustotal.com/gui/file/${analysisData.metadata.sha256}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="default" className="cursor-pointer font-semibold" size="sm">
                            View on VirusTotal
                        </Button>
                    </a>
                </CardAction>
            </CardFooter>
        </Card>
    );
};

export default VirusTotalResults;