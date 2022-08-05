import { request } from '../utils/request';

/**
 * 获取新闻分类
 */
export const getNewsCategory = () => request('get', 'categories');

/**
 * 添加新闻
 */
export const postNews = data => request('post', 'news', data);

/**
 * 获取草稿箱列表
 */
export const getDraft = username => request('get', `news/?author=${username}&auditState=0&_expand=category`);

/**
 * 根据 id 删除草稿箱
 */
export const delDraftId = id => request('delete', `news/${id}`);

/**
 * 获取草稿详情
 */
export const getDraftDetail = id => request('get', `news/${id}?_expand=category&_expand=role`);

/**
 * 新闻提交审核
 */
export const patchExamine = (id, data) => request('patch', `news/${id}`, data);

/**
 * 根据 id 删除新闻分类
 */
export const deleteNewsCategoryById = id => request('delete', `categories/${id}`);

/**
 * 根据 id 修改新闻分类
 */
export const patchNewsCategoryById = (id, data) => request('patch', `categories/${id}`, data);
