import http from '@/api/http';
import { HERO_API } from '@/config/env';

/**
 * @namespace 英雄联盟数据示例模块
 */

/**
 * 获取英雄联盟英雄数据
 * @param {object} config - 其他参数
 * @param {string} config.value - 文本值
 * @param {number} config.x - 水平边距
 * @param {number} config.y - 中线垂直偏移
 * @param {string} config.color - 颜色
 * @param {number} config.fontSize - 字体大小
 * @param {number} config.shadow - 文字阴影透明度
 * @param {number} config.fontType - 字体
 * @returns {Promise<{object}[]>} 拼接商品图文字水印字符串
 */
export const fetchHeroData = () => http.get(`${HERO_API}/act/img/js/heroList/hero_list.js`);

/**
 * 获取英雄联盟英雄详情
 * @param {number|string} id - 角色id
 * @returns {Promise<{object}[]>}
 */
export const fetchHeroItem = id => http.get(`${HERO_API}/act/img/js/hero/${id}.js`);

/**
 * 获取英雄联盟装备数据
 * @returns {Promise<{object}[]>}
 */
export const fetchStackData = () => http.get(`${HERO_API}/act/img/js/items/items.js`);
