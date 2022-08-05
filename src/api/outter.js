import { request } from '../utils/request';

/**
 * 新闻列表
 */
export const newsList = () => request('get', '/news?publishState=2&_expand=category');
