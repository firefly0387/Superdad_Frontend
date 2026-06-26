// src/utils/instagramApi.ts

export interface InstagramPost {
    id: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
    timestamp: string;
    username?: string;
    like_count?: number;
    comments_count?: number;
}

export interface InstagramApiResponse {
    data: InstagramPost[];
    paging?: {
        cursors: {
            before: string;
            after: string;
        };
        next?: string;
    };
}

// Get your access token from environment variables
const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const BUSINESS_ACCOUNT_ID = import.meta.env.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID;

/**
 * Fetch Instagram feed for Business Account
 * Using Instagram Graph API (for business accounts)
 */
export const getInstagramBusinessFeed = async (limit: number = 12): Promise<InstagramPost[]> => {
    if (!INSTAGRAM_ACCESS_TOKEN) {
        console.error('Instagram access token is missing. Please add VITE_INSTAGRAM_ACCESS_TOKEN to your .env file');
        return [];
    }

    try {
        // For Business Account - using Instagram Graph API
        const fields = [
            'id',
            'caption',
            'media_type',
            'media_url',
            'permalink',
            'thumbnail_url',
            'timestamp',
            'username',
            'like_count',
            'comments_count'
        ].join(',');

        const url = `https://graph.facebook.com/v18.0/${BUSINESS_ACCOUNT_ID || 'me'}/media?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`;
        
        console.log('Fetching Instagram feed...');
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Instagram API Error:', errorData);
            throw new Error(errorData.error?.message || 'Failed to fetch Instagram feed');
        }
        
        const data: InstagramApiResponse = await response.json();
        console.log(`Successfully fetched ${data.data?.length || 0} Instagram posts`);
        return data.data || [];
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        throw error;
    }
};

/**
 * Alternative: Using Basic Display API (for personal accounts)
 * Use this if you have a Basic Display token
 */
export const getInstagramBasicFeed = async (limit: number = 12): Promise<InstagramPost[]> => {
    if (!INSTAGRAM_ACCESS_TOKEN) {
        console.error('Instagram access token is missing');
        return [];
    }

    try {
        const fields = ['id', 'caption', 'media_type', 'media_url', 'permalink', 'timestamp'];
        const url = `https://graph.instagram.com/me/media?fields=${fields.join(',')}&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Instagram API error:', error);
            throw new Error(error.error?.message || 'Failed to fetch Instagram feed');
        }
        
        const data: InstagramApiResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        throw error;
    }
};

/**
 * Get Instagram Business Account ID
 * Use this to fetch your business account ID if you don't have it
 */
export const getInstagramBusinessId = async (): Promise<string | null> => {
    if (!INSTAGRAM_ACCESS_TOKEN) return null;
    
    try {
        const url = `https://graph.facebook.com/v18.0/me/accounts?access_token=${INSTAGRAM_ACCESS_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            // Get Instagram Business ID from Facebook Page
            const pageId = data.data[0].id;
            const instagramUrl = `https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
            const instagramResponse = await fetch(instagramUrl);
            const instagramData = await instagramResponse.json();
            
            return instagramData.instagram_business_account?.id || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching business ID:', error);
        return null;
    }
};