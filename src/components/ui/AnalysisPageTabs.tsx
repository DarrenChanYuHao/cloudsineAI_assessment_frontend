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
            <TabsList className="grid w-full grid-cols-2 gap-4">
                <TabsTrigger value="virustotal" className="font-semibold cursor-pointer">VirusTotal</TabsTrigger>
                <TabsTrigger value="genai" className="font-semibold cursor-pointer">GenAI Analysis</TabsTrigger>
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
        </Tabs>
    );
};

export default AnalysisPageTabs;
