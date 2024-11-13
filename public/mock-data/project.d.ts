interface Project {
  /**
   * 项目名称
   */
  name: string;
  /**
   * 公司
   */
  company: string;
  /**
   * 合同金额
   */
  contractAmount: number;
  /**
   * 开始日期
   */
  startDate: string;
  /**
   * 结束日期
   */
  endDate: string;
  /**
   * 开发者
   */
  developer: string;
  /**
   * 成本列表
   */
  costList: {
    /**
     * 序号
     */
    index: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 金额
     */
    amount: number;
    /**
     * 占比
     */
    proportion: number;
    color?: string;
    textColor?: string;
  }[];
  // 成本列表 列名
  tableColumns: {
    label: string;
    prop: string;
    align: string;
    width?: number;
  }[];

  /**
   * 项目状态
   */
  statusList: { status: string; date: string; icon: string }[];
  overviewDay: {
    data: { value: number; name: string; color: string }[];
    title: string;
  };
  overviewMoney: {
    data: { value: number; name: string; color: string }[];
    title: string;
  };
}
