import React from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import VirusTotalResults from './VirusTotalResults';
import type { ScannedAnalysisDTO } from '@/DTO/ScannedAnalysisDTO.ts';
import GenAIAnalysis from "@/components/ui/GenAIAnalysis.tsx";

interface Props {
    analysisData: ScannedAnalysisDTO;
}

const AnalysisPageTabs: React.FC<Props> = ({ analysisData }) => {
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
            <TabsContent value="genai" forceMount>
                <GenAIAnalysis analysisData={analysisData} />
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
