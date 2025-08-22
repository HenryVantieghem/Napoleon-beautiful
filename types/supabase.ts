// Supabase database type definitions

export interface Database {
  public: {
    Tables: {
      executive_waitlist: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
      }
      executive_analytics: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
      }
      ab_test_results: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_executive_waitlist_stats: {
        Args: Record<string, never>
        Returns: any[]
      }
      get_executive_analytics_dashboard: {
        Args: { timeframe: string }
        Returns: any[]
      }
      get_ab_test_results: {
        Args: { test_name: string }
        Returns: any[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}