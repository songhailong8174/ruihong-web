export interface TableListItem {
  key: number;
  beforeMoney: string;
  rechargMoney: string;
  rechargDesc: string;
  rechargSms: string;
  oprateTime: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
