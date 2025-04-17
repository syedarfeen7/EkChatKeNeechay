export interface AppConfigState {
  serverUrl: string;
  deviceToken: string | undefined;
  failure: boolean;
  isFetching: boolean;
  errorMessage: string;
  isAnalyticsSend: boolean;
  topicNames: string[];
  data: {};
}
