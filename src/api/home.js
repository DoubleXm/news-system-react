import { request } from '../utils/request';

/**
 * 最多浏览
 */
export const maxPreview = () => request('get', `/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`);

/**
 * 最多点赞
 */
export const maxStar = () => request('get', `/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`);

/**
 * 获取所有新闻信息
 */
export const allNews = () => request('get', '/news?publishState=2&_expand=category');
