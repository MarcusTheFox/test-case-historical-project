export interface TimelineEvent {
    year: number;
    description: string;
}

export interface TimeInterval {
    id: number;
    label: string;
    startYear: number;
    endYear: number;
    events: TimelineEvent[];
}
