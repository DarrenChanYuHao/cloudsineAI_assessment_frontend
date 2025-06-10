import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import type {ScannedAnalysisDTO} from "@/DTO/ScannedAnalysisDTO.ts";
import {Button} from "@/components/ui/button.tsx";

interface GenAIAnalysisPageProps {
    analysisData: ScannedAnalysisDTO
}

const GenAIAnalysisPage: React.FC<GenAIAnalysisPageProps> = ({ analysisData }) => {
    const [loading, setLoading] = useState(false);
    const [genaiResult, setGenaiResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenAIAnalysis = async () => {
        try {
            setLoading(true);
            setError(null);
            setGenaiResult(null);

            const response = await axios.post(
                'https://caibackend.darrenchanyuhao.com/genai/summarize_result',
                analysisData
            );

            setGenaiResult(response.data?.summary || 'No summary returned.');
        } catch (err: any) {
            console.error('GenAI request failed:', err);
            setError('Failed to fetch GenAI analysis.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">GenAI Analysis</h2>

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
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Summary:</h3>
                    <div className="border-2 border-muted-foreground prose prose-lg max-w-none p-4 rounded-lg">
                        <ReactMarkdown>
                            {genaiResult}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenAIAnalysisPage;