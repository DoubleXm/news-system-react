import { request } from '../utils/request';

/**
 * 获取审核列表
 */
export const getAuditListData = username =>
  request('get', `/news?username=${username}&auditState_ne=0&publishState_lte=1&_expand=category`);

/**
 * 撤销审核 auditState 0
 */
export const patchAuditCancel = id => request('patch', `news/${id}`);

/**
 * 发布新闻 publishState 2
 */
export const patchAuditPublish = id => request('patch', `news/${id}`);

/**
 * 获取审核新闻数据
 */
export const getAuditNewsListData = () => request('get', 'news?auditState=1&_expand=category');

/**
 * 审核通过 or 驳回
 * publishState 通过 1 驳回 0
 * auditState 通过 2 驳回 3
 */
export const patchExamine = id => request('patch', `news/${id}`);
