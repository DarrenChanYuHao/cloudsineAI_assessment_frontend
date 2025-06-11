import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import type { ScannedAnalysisDTO } from "@/DTO/ScannedAnalysisDTO.ts";
import { Button } from "@/components/ui/button.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface GenAIAnalysisProps {
    analysisData: ScannedAnalysisDTO;
    genaiResult: string | null;
    setGenaiResult: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GenAIAnalysis: React.FC<GenAIAnalysisProps> = ({
                                                         analysisData,
                                                         genaiResult,
                                                         setGenaiResult,
                                                         loading,
                                                         setLoading,
                                                         error,
                                                         setError
                                                     }) => {

    const [promptType, setPromptType] = useState<string>('base');

    const handleGenAIAnalysis = async () => {
        try {
            setLoading(true);
            setError(null);
            setGenaiResult(null);

            const response = await axios.post(
                'https://caibackend.darrenchanyuhao.com/genai/summarize_result',
                analysisData,
                {
                    params: {
                        system_prompt_type: promptType,
                    },
                }
            );
            console.log(genaiResult);

            setGenaiResult(response.data.summary || 'No summary returned.');
        } catch (err: any) {
            console.error('GenAI request failed:', err);
            setError('Failed to fetch GenAI analysis.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-full mx-auto space-y-4">
            <h2 className="text-xl font-semibold mb-4">GenAI Analysis</h2>

            <Select onValueChange={(value) => setPromptType(value) } defaultValue={promptType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="base">Simple</SelectItem>
                    <SelectItem value="cybersecurity_professional">Professional</SelectItem>
                    <SelectItem value="singaporean_singlish">Singapura</SelectItem>
                </SelectContent>
            </Select>
            <Button
                onClick={handleGenAIAnalysis}
                disabled={loading}
                className="mb-4"
            >
                {loading ? 'Analyzing...' : genaiResult ? 'Re-run GenAI Analysis' : 'Run GenAI Analysis'}
            </Button>

            {error && (
                <p className="mt-4 text-red-500 font-medium">{error}</p>
            )}

            {genaiResult && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Summary:</h3>
                    <div className="prose border-2 border-muted-foreground max-w-none p-4 rounded-lg">
                        <ReactMarkdown>{genaiResult}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenAIAnalysis;
