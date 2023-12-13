export interface CaptionResponse {
	data: {
	  result_list: string[];
	};
  }

export interface EmbedResponse {
	data: {
	  result: number[];
	};
  }

export interface CacheData {
	results: {
	  [key: string]: string; 
	};
	record_count?: number; 
  }