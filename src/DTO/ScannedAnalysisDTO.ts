export interface HashedFileName {
    sha256: string;
    md5: string;
    sha1: string;
}

interface ScanEngineResult {
    method: string;
    engine_name: string;
    engine_version: string;
    engine_update: string;
    category: string;
    result: string | null;
}

export interface ScannedAnalysisDTO {
    meaningful_name: string; // e.g., "example.txt"
    type_extension: string; // e.g., "bat"
    size: number; // e.g., 1234
    virus_total_id: string;
    scan_status: string; // "completed" | "queued"
    results: Record<string, ScanEngineResult>;
    stats: Record<string, unknown>;
    last_analysis_date: number; // UNIX timestamp
    metadata: HashedFileName;
}