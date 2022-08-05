import { request } from '../utils/request';

/**
 * 登录
 * 如果能查询到数据则表示登录成功
 */
export function loginForm(form) {
  const { username, password } = form;
  return request('get', `/users?username=${username}&password=${password}&roleState=${true}&_expand=role`);
}

/**
 *  获取侧边栏列表
 */
export function getMenuData() {
  return request('get', '/rights?_embed=children');
}

/**
 *  获取权限列表
 */
export function getAuthListData() {
  return request('get', '/rights?_embed=children');
}

/**
 *  根据 id 删除权限列表
 */
export function delAuthListDataById(id) {
  return request('delete', `rights/${id}`);
}

/**
 * 根据 id 更改主菜单的访问权限
 */
export function patchMasterAuthListById(id, data) {
  return request('patch', `rights/${id}`, data);
}

/**
 * 根据 id 更改菜单的访问权限
 */
export function patchAuthListById(id, data) {
  return request('patch', `children/${id}`, data);
}

/**
 * 获取角色列表
 */
export function getRoleData() {
  return request('get', `roles`);
}

/**
 *  获取编辑角色时的树
 */
export function getRoleTreeData() {
  return request('get', '/rights?_embed=children');
}

/**
 * 根据 id 更改角色权限
 */
export function patchRoleAuthById(id, data) {
  return request('patch', `roles/${id}`, data);
}

/**
 * 获取用户列表
 */
export function getUserData() {
  return request('get', 'users/?_expand=role');
}

/**
 * 更改用户状态
 */
export function patchUserState(id, data) {
  return request('patch', `users/${id}`, data);
}

/**
 * 获取用户区域列表
 */
export function getUserRegionList() {
  return request('get', 'regions');
}

/**
 * 获取用户角色列表
 */
export function getUserRoleList() {
  return request('get', 'roles');
}

/**
 * 添加用户
 */
export function postUser(data) {
  return request('post', 'users', data);
}

/**
 * 根据 id 删除用户
 */
export function deleteUserById(id) {
  return request('delete', `users/${id}`);
}

/**
 * 根据 id 修改用户
 */
export function patchUserById(id, data) {
  return request('patch', `users/${id}`, data);
}
