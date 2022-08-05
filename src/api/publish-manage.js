import { request } from '../utils/request';

/**
 * 待发布列表
 */
export const getUnPublishData = username => request('get', `/news?author=${username}&publishState=1&_expand=category`);

/**
 * 已发布列表
 */
export const getPublishedData = username => request('get', `/news?author=${username}&publishState=2&_expand=category`);

/**
 * 下线列表
 */
export const getOfflineData = username => request('get', `/news?author=${username}&publishState=3&_expand=category`);

/**
 * 下线 3
 * 发布 2
 */
export const patchPublishData = (id, data) => request('patch', `/news/${id}`, data);

/**
 * 删除
 */
export const deletePublishData = id => request('delete', `/news/${id}`);
