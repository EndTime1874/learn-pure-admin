import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: any;
};

/**
 * 获取玩家【胜/负计数】
 * https://docs.opendota.com/#tag/players/operation/get_players_by_account_id_select_wl
 */
export const getPublicMatchesApi = (account_id: string, params: any) => {
  return http.request<Result>("get", `/opendota-api/players/${account_id}/wl`, params);
};
