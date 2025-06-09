export interface HashedFileName {
    sha256: string;
    md5: string;
    sha1: string;
}

export interface ScannedAnalysisDTO {
    meaningful_name: string; // e.g., "example.txt"
    type_extension: string; // e.g., "bat"
    size: number; // e.g., 1234
    virus_total_id: string;
    scan_status: string; // "completed" | "queued"
    results: Record<string, unknown>;
    stats: Record<string, unknown>;
    last_analysis_date: number; // UNIX timestamp
    metadata: HashedFileName;
}