/*
 * TrustGraph API Service
 * 
 * Centralizes all API calls to the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface GraphNode {
  id: string;
  label: string;
  role: string;
  skills: string[];
  verified: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
  project?: string;
  company?: string;
  verified: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ProfileDetail extends GraphNode {
  domain: string;
  connections: number;
  trustScore: number;
  verifications: Array<{
    type: string;
    source: string;
    date: string;
  }>;
}

export interface VerificationResult {
  verified: boolean;
  contributions: number;
  repositories: string[];
  message: string;
}

class TrustGraphAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Get the full trust graph data
   */
  async getGraph(): Promise<GraphData> {
    return this.request<GraphData>('/graph');
  }

  /**
   * Get detailed profile information by ID
   */
  async getProfile(profileId: string): Promise<ProfileDetail> {
    return this.request<ProfileDetail>(`/profile/${profileId}`);
  }

  /**
   * Verify GitHub contribution for a user
   */
  async verifyContribution(username: string, repo: string): Promise<VerificationResult> {
    return this.request<VerificationResult>(`/verify/${username}/${repo}`);
  }

  /**
   * Check API health
   */
  async healthCheck(): Promise<{ message: string; status: string }> {
    return this.request('/');
  }
}

// Export singleton instance
export const api = new TrustGraphAPI(API_BASE_URL);

// Export for testing or custom instances
export { TrustGraphAPI };
