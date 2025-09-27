export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          openai_api_key: string | null
          google_api_key: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          openai_api_key?: string | null
          google_api_key?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          openai_api_key?: string | null
          google_api_key?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      comparison_sessions: {
        Row: {
          id: number
          user_id: string
          title: string | null
          system_prompt: string | null
          user_content: string | null
          model_a_provider: string
          model_a_name: string
          model_a_completion: string | null
          model_b_provider: string
          model_b_name: string
          model_b_completion: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string
          title?: string | null
          system_prompt?: string | null
          user_content?: string | null
          model_a_provider: string
          model_a_name: string
          model_a_completion?: string | null
          model_b_provider: string
          model_b_name: string
          model_b_completion?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string | null
          system_prompt?: string | null
          user_content?: string | null
          model_a_provider?: string
          model_a_name?: string
          model_a_completion?: string | null
          model_b_provider?: string
          model_b_name?: string
          model_b_completion?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comparison_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? PublicTableNameOrOptions["schema"]["Tables"] extends never
      ? never
      : keyof PublicTableNameOrOptions["schema"]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? PublicTableNameOrOptions["schema"]["Tables"] extends never
      ? never
      : keyof PublicTableNameOrOptions["schema"]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? PublicTableNameOrOptions["schema"]["Tables"] extends never
      ? never
      : keyof PublicTableNameOrOptions["schema"]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? PublicEnumNameOrOptions["schema"]["Enums"] extends never
      ? never
      : keyof PublicEnumNameOrOptions["schema"]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never