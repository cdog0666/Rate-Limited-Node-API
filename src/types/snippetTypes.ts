export interface Snippet{
    user_id: number|null;
    title: string;
    content: string;
    language: string;
    is_public: boolean;
    created_at: string;
}