export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bids: {
        Row: {
          bid_price_per_quintal: number
          bidder_id: string
          created_at: string
          id: string
          listing_id: string
          message: string | null
          quantity_quintals: number
          status: Database["public"]["Enums"]["bid_status"] | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          bid_price_per_quintal: number
          bidder_id: string
          created_at?: string
          id?: string
          listing_id: string
          message?: string | null
          quantity_quintals: number
          status?: Database["public"]["Enums"]["bid_status"] | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          bid_price_per_quintal?: number
          bidder_id?: string
          created_at?: string
          id?: string
          listing_id?: string
          message?: string | null
          quantity_quintals?: number
          status?: Database["public"]["Enums"]["bid_status"] | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "produce_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_categories: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      crop_varieties: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          typical_harvest_seasons: string[] | null
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          typical_harvest_seasons?: string[] | null
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          typical_harvest_seasons?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_varieties_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "crop_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      farmer_details: {
        Row: {
          created_at: string
          crops_grown: string[] | null
          farming_type: string | null
          has_storage: boolean | null
          has_transport: boolean | null
          land_area_acres: number | null
          land_location: string | null
          primary_mandi: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          crops_grown?: string[] | null
          farming_type?: string | null
          has_storage?: boolean | null
          has_transport?: boolean | null
          land_area_acres?: number | null
          land_location?: string | null
          primary_mandi?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          crops_grown?: string[] | null
          farming_type?: string | null
          has_storage?: boolean | null
          has_transport?: boolean | null
          land_area_acres?: number | null
          land_location?: string | null
          primary_mandi?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "farmer_details_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fpo_details: {
        Row: {
          created_at: string
          member_count: number | null
          operating_districts: string[] | null
          operational_since: string | null
          organization_name: string
          primary_crops: string[] | null
          profile_id: string
          registration_number: string | null
          updated_at: string
          warehouse_address: string | null
          warehouse_capacity: number | null
        }
        Insert: {
          created_at?: string
          member_count?: number | null
          operating_districts?: string[] | null
          operational_since?: string | null
          organization_name: string
          primary_crops?: string[] | null
          profile_id: string
          registration_number?: string | null
          updated_at?: string
          warehouse_address?: string | null
          warehouse_capacity?: number | null
        }
        Update: {
          created_at?: string
          member_count?: number | null
          operating_districts?: string[] | null
          operational_since?: string | null
          organization_name?: string
          primary_crops?: string[] | null
          profile_id?: string
          registration_number?: string | null
          updated_at?: string
          warehouse_address?: string | null
          warehouse_capacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fpo_details_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          district: string
          geo_coordinates: unknown | null
          id: string
          location_type: string
          name: string
          pincode: string | null
          state: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          district: string
          geo_coordinates?: unknown | null
          id?: string
          location_type: string
          name: string
          pincode?: string | null
          state: string
        }
        Update: {
          address?: string | null
          created_at?: string
          district?: string
          geo_coordinates?: unknown | null
          id?: string
          location_type?: string
          name?: string
          pincode?: string | null
          state?: string
        }
        Relationships: []
      }
      logistics_bookings: {
        Row: {
          actual_delivery_date: string | null
          created_at: string
          delivery_address: string
          driver_contact: string | null
          driver_name: string | null
          expected_delivery_date: string | null
          id: string
          pickup_address: string
          pickup_date: string | null
          price: number | null
          provider_id: string
          status: string | null
          tracking_url: string | null
          transaction_id: string
          updated_at: string
          vehicle_number: string | null
          vehicle_type: string | null
        }
        Insert: {
          actual_delivery_date?: string | null
          created_at?: string
          delivery_address: string
          driver_contact?: string | null
          driver_name?: string | null
          expected_delivery_date?: string | null
          id?: string
          pickup_address: string
          pickup_date?: string | null
          price?: number | null
          provider_id: string
          status?: string | null
          tracking_url?: string | null
          transaction_id: string
          updated_at?: string
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Update: {
          actual_delivery_date?: string | null
          created_at?: string
          delivery_address?: string
          driver_contact?: string | null
          driver_name?: string | null
          expected_delivery_date?: string | null
          id?: string
          pickup_address?: string
          pickup_date?: string | null
          price?: number | null
          provider_id?: string
          status?: string | null
          tracking_url?: string | null
          transaction_id?: string
          updated_at?: string
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logistics_bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "logistics_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logistics_bookings_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_providers: {
        Row: {
          average_rate_per_km: number | null
          company_name: string
          created_at: string
          fleet_size: number | null
          has_refrigerated: boolean | null
          id: string
          operating_states: string[] | null
          profile_id: string | null
          transport_types: string[] | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          average_rate_per_km?: number | null
          company_name: string
          created_at?: string
          fleet_size?: number | null
          has_refrigerated?: boolean | null
          id?: string
          operating_states?: string[] | null
          profile_id?: string | null
          transport_types?: string[] | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          average_rate_per_km?: number | null
          company_name?: string
          created_at?: string
          fleet_size?: number | null
          has_refrigerated?: boolean | null
          id?: string
          operating_states?: string[] | null
          profile_id?: string | null
          transport_types?: string[] | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "logistics_providers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_prices: {
        Row: {
          created_at: string
          crop_category_id: string
          crop_variety_id: string | null
          date: string
          id: string
          location_id: string
          max_price: number
          min_price: number
          modal_price: number
          source: string | null
        }
        Insert: {
          created_at?: string
          crop_category_id: string
          crop_variety_id?: string | null
          date: string
          id?: string
          location_id: string
          max_price: number
          min_price: number
          modal_price: number
          source?: string | null
        }
        Update: {
          created_at?: string
          crop_category_id?: string
          crop_variety_id?: string | null
          date?: string
          id?: string
          location_id?: string
          max_price?: number
          min_price?: number
          modal_price?: number
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "market_prices_crop_category_id_fkey"
            columns: ["crop_category_id"]
            isOneToOne: false
            referencedRelation: "crop_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_prices_crop_variety_id_fkey"
            columns: ["crop_variety_id"]
            isOneToOne: false
            referencedRelation: "crop_varieties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_prices_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      produce_listings: {
        Row: {
          created_at: string
          crop_category_id: string
          crop_variety_id: string
          description: string | null
          expected_price_per_quintal: number
          expiry_date: string | null
          harvest_date: string | null
          id: string
          images: string[] | null
          location_id: string | null
          pickup_address: string | null
          pickup_district: string
          pickup_state: string
          quality_certificate_url: string | null
          quality_grade: Database["public"]["Enums"]["quality_grade"] | null
          quality_verified_at: string | null
          quality_verified_by: string | null
          quantity_quintals: number
          seller_id: string
          status: Database["public"]["Enums"]["listing_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          crop_category_id: string
          crop_variety_id: string
          description?: string | null
          expected_price_per_quintal: number
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: string[] | null
          location_id?: string | null
          pickup_address?: string | null
          pickup_district: string
          pickup_state: string
          quality_certificate_url?: string | null
          quality_grade?: Database["public"]["Enums"]["quality_grade"] | null
          quality_verified_at?: string | null
          quality_verified_by?: string | null
          quantity_quintals: number
          seller_id: string
          status?: Database["public"]["Enums"]["listing_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          crop_category_id?: string
          crop_variety_id?: string
          description?: string | null
          expected_price_per_quintal?: number
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: string[] | null
          location_id?: string | null
          pickup_address?: string | null
          pickup_district?: string
          pickup_state?: string
          quality_certificate_url?: string | null
          quality_grade?: Database["public"]["Enums"]["quality_grade"] | null
          quality_verified_at?: string | null
          quality_verified_by?: string | null
          quantity_quintals?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["listing_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produce_listings_crop_category_id_fkey"
            columns: ["crop_category_id"]
            isOneToOne: false
            referencedRelation: "crop_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produce_listings_crop_variety_id_fkey"
            columns: ["crop_variety_id"]
            isOneToOne: false
            referencedRelation: "crop_varieties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produce_listings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produce_listings_quality_verified_by_fkey"
            columns: ["quality_verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produce_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aadhaar_number: string | null
          address: string | null
          bank_account_number: string | null
          bank_branch: string | null
          bank_ifsc: string | null
          bank_name: string | null
          created_at: string
          district: string | null
          email: string | null
          full_name: string | null
          id: string
          kyc_verified: boolean | null
          phone_number: string | null
          pincode: string | null
          role: Database["public"]["Enums"]["user_role"]
          state: string | null
          updated_at: string
        }
        Insert: {
          aadhaar_number?: string | null
          address?: string | null
          bank_account_number?: string | null
          bank_branch?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          kyc_verified?: boolean | null
          phone_number?: string | null
          pincode?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string
        }
        Update: {
          aadhaar_number?: string | null
          address?: string | null
          bank_account_number?: string | null
          bank_branch?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          kyc_verified?: boolean | null
          phone_number?: string | null
          pincode?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          bid_id: string | null
          buyer_id: string
          created_at: string
          delivery_confirmed: boolean | null
          delivery_confirmed_at: string | null
          delivery_date: string | null
          id: string
          listing_id: string
          logistics_id: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          price_per_quintal: number
          quantity_quintals: number
          seller_id: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          transaction_ref: string | null
          updated_at: string
        }
        Insert: {
          bid_id?: string | null
          buyer_id: string
          created_at?: string
          delivery_confirmed?: boolean | null
          delivery_confirmed_at?: string | null
          delivery_date?: string | null
          id?: string
          listing_id: string
          logistics_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          price_per_quintal: number
          quantity_quintals: number
          seller_id: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          transaction_ref?: string | null
          updated_at?: string
        }
        Update: {
          bid_id?: string | null
          buyer_id?: string
          created_at?: string
          delivery_confirmed?: boolean | null
          delivery_confirmed_at?: string | null
          delivery_date?: string | null
          id?: string
          listing_id?: string
          logistics_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          price_per_quintal?: number
          quantity_quintals?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount?: number
          transaction_ref?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "produce_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
      bid_status: "pending" | "accepted" | "rejected" | "expired"
      listing_status:
        | "draft"
        | "active"
        | "pending_verification"
        | "verified"
        | "sold"
        | "cancelled"
      payment_method: "upi" | "neft" | "rtgs" | "wallet" | "escrow"
      quality_grade: "premium" | "standard" | "basic"
      transaction_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      user_role: "farmer" | "fpo" | "trader" | "buyer" | "assayer" | "logistics"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
