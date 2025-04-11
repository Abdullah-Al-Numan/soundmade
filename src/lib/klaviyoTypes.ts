export interface KlaviyoResource {
    id: string
    type: string
    attributes: Record<string, any>
    links?: {
      self: string
    }
    relationships?: Record<
      string,
      {
        data: { id: string; type: string } | Array<{ id: string; type: string }>
        links?: {
          self: string
          related: string
        }
      }
    >
  }
  
  export interface KlaviyoResponse<T extends KlaviyoResource> {
    data: T | T[]
    links?: {
      self: string
      first: string
      last: string
      prev: string | null
      next: string | null
    }
    meta?: {
      total_count: number
      page_count: number
      next_cursor: string | null
    }
  }
  
  export interface KlaviyoCampaign extends KlaviyoResource {
    attributes: {
      name: string
      status: string
      created_at: string
      updated: string
      send_time: string | null
      archived: boolean
      audience: {
        type: string
      }
      send_strategy: {
        method: string
      }
      tracking_options: {
        is_add_utm: boolean
        utm_params: {
          source: string
          medium: string
          campaign: string
        }
        is_tracking_clicks: boolean
        is_tracking_opens: boolean
      }
    }
    relationships: {
      campaign_messages: {
        data: Array<{ id: string; type: string }>
      }
    }
  }
  
  export interface KlaviyoTemplate extends KlaviyoResource {
    attributes: {
      name: string
      created: string
      updated: string
      html: string
      text: string
      editor_type: string
    }
  }
  
  export interface KlaviyoList extends KlaviyoResource {
    attributes: {
      name: string
      created: string
      updated: string
      opt_in_process: string
      list_type: string
    }
  }
  