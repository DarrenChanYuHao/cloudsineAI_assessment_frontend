import React, { useState } from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import VirusTotalResults from './VirusTotalResults';
import GenAIAnalysis from "@/components/ui/GenAIAnalysis.tsx";
import type { ScannedAnalysisDTO } from '@/DTO/ScannedAnalysisDTO.ts';

interface Props {
    analysisData: ScannedAnalysisDTO;
}

const AnalysisPageTabs: React.FC<Props> = ({ analysisData }) => {
    const [genaiResult, setGenaiResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <Tabs defaultValue="virustotal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 gap-4">
                <TabsTrigger value="virustotal">VirusTotal</TabsTrigger>
                <TabsTrigger value="genai">GenAI Analysis</TabsTrigger>
                <TabsTrigger value="other">Other Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="virustotal">
                <VirusTotalResults analysisData={analysisData} />
            </TabsContent>
            <TabsContent value="genai">
                <GenAIAnalysis
                    analysisData={analysisData}
                    genaiResult={genaiResult}
                    setGenaiResult={setGenaiResult}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                />
            </TabsContent>
            <TabsContent value="other">
                <p className="text-muted-foreground text-center p-4">
                    Other analysis features will be added soon.
                </p>
            </TabsContent>
        </Tabs>
    );
};

export default AnalysisPageTabs;
