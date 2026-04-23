export const INPUT_GROUP_CONTROL_MARK = Symbol('tiny-design.input-group-control');
export const SELECT_MARK = Symbol('tiny-design.select');
export const SELECT_OPTION_MARK = Symbol('tiny-design.select-option');
export const SELECT_OPT_GROUP_MARK = Symbol('tiny-design.select-opt-group');
export const MENU_MARK = Symbol('tiny-design.menu');
export const MENU_ITEM_MARK = Symbol('tiny-design.menu-item');
export const SUB_MENU_MARK = Symbol('tiny-design.sub-menu');
export const MENU_ITEM_GROUP_MARK = Symbol('tiny-design.menu-item-group');
export const MENU_DIVIDER_MARK = Symbol('tiny-design.menu-divider');
export const ANCHOR_LINK_MARK = Symbol('tiny-design.anchor-link');
export const STEPS_ITEM_MARK = Symbol('tiny-design.steps-item');
export const TIMELINE_ITEM_MARK = Symbol('tiny-design.timeline-item');
export const CARD_CONTENT_MARK = Symbol('tiny-design.card-content');
export const FLIP_ITEM_MARK = Symbol('tiny-design.flip-item');
export const AVATAR_MARK = Symbol('tiny-design.avatar');

type Marker = symbol;
type Markable = Record<PropertyKey, unknown>;

export function markComponent<T extends object>(component: T, marker: Marker): T {
  (component as T & Markable)[marker] = true;
  return component;
}

export function hasMarker(type: unknown, marker: Marker): boolean {
  if (!type || (typeof type !== 'function' && typeof type !== 'object')) {
    return false;
  }

  return Boolean((type as Markable)[marker]);
}
