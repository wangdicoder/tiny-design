import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu-context';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useTheme } from '../_utils/use-theme';
import { MenuItemGroupProps, MenuItemProps, MenuProps, MenuSelectInfo, SubMenuProps } from './types';

const getInitialSelectedKeys = (props: MenuProps): string[] => {
  if (props.defaultSelectedKeys?.length) {
    return props.defaultSelectedKeys;
  }

  if (props.defaultIndex) {
    return [props.defaultIndex];
  }

  return ['0'];
};

const collectParentMap = (
  children: React.ReactNode,
  ancestors: string[] = [],
  parentIndex?: string
): Map<string, string[]> => {
  const parentMap = new Map<string, string[]>();

  React.Children.forEach(children, (child, idx) => {
    if (!React.isValidElement(child)) {
      return;
    }

    const childElement = child as React.FunctionComponentElement<
      MenuItemProps | MenuItemGroupProps | SubMenuProps
    >;
    const displayName = childElement.type.displayName;

    if (
      displayName !== 'MenuItem' &&
      displayName !== 'SubMenu' &&
      displayName !== 'MenuItemGroup' &&
      displayName !== 'MenuDivider'
    ) {
      return;
    }

    const fallbackIndex = parentIndex === undefined ? `${idx}` : `${parentIndex}-${idx}`;
    const resolvedIndex = childElement.props.index ?? fallbackIndex;

    if (displayName === 'MenuItem' || displayName === 'SubMenu') {
      parentMap.set(resolvedIndex, ancestors);
    }

    if (displayName === 'SubMenu') {
      const subMenuMap = collectParentMap(childElement.props.children, [...ancestors, resolvedIndex], resolvedIndex);
      subMenuMap.forEach((value, key) => {
        parentMap.set(key, value);
      });
    }

    if (displayName === 'MenuItemGroup') {
      const groupMap = collectParentMap(childElement.props.children, ancestors, resolvedIndex);
      groupMap.forEach((value, key) => {
        parentMap.set(key, value);
      });
    }
  });

  return parentMap;
};

const Menu = (props: MenuProps): JSX.Element => {
  const {
    defaultIndex = '0',
    mode = 'horizontal',
    theme,
    appearance = 'navigation',
    variant = 'outline',
    selectionStyle = 'background',
    size = 'md',
    inlineIndent = 20,
    selectedKeys,
    defaultSelectedKeys,
    openKeys,
    defaultOpenKeys = [],
    multiple = false,
    onSelect,
    onOpenChange,
    className,
    overlayClassName,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const { resolvedTheme: globalResolvedTheme } = useTheme();
  const resolvedTheme =
    theme ??
    (configContext.theme === 'dark'
      ? 'dark'
      : configContext.theme === 'light'
        ? 'light'
        : globalResolvedTheme);
  const prefixCls = getPrefixCls('menu', configContext.prefixCls, customisedCls);
  const cls = classNames(
    prefixCls,
    className,
    `${prefixCls}_root`,
    `${prefixCls}_${resolvedTheme}`,
    `${prefixCls}_appearance-${appearance}`,
    `${prefixCls}_${mode}`,
    `${prefixCls}_variant-${variant}`,
    `${prefixCls}_selection-${selectionStyle}`,
    `${prefixCls}_size-${size}`
  );

  const isControlledSelected = selectedKeys !== undefined;
  const isControlledOpen = openKeys !== undefined;
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = useState<string[]>(
    getInitialSelectedKeys({ ...props, defaultIndex, defaultSelectedKeys })
  );
  const [uncontrolledOpenKeys, setUncontrolledOpenKeys] = useState<string[]>(defaultOpenKeys);

  const mergedSelectedKeys = isControlledSelected ? selectedKeys ?? [] : uncontrolledSelectedKeys;
  const mergedOpenKeys = isControlledOpen ? openKeys ?? [] : uncontrolledOpenKeys;
  const derivedParentMap = useMemo(() => collectParentMap(children), [children]);

  // Track parent-child relationships via component tree registration
  const parentMapRef = useRef(new Map<string, string[]>());
  const getAncestors = useCallback(
    (key: string): string[] => parentMapRef.current.get(key) ?? derivedParentMap.get(key) ?? [],
    [derivedParentMap]
  );

  const registerKey = useCallback((key: string, ancestorKeys: string[]) => {
    parentMapRef.current.set(key, ancestorKeys);
  }, []);

  const unregisterKey = useCallback((key: string) => {
    parentMapRef.current.delete(key);
  }, []);

  const handleSelect = useCallback((index: string): void => {
    const nextSelectedKeys = multiple
      ? mergedSelectedKeys.includes(index)
        ? mergedSelectedKeys.filter((key) => key !== index)
        : [...mergedSelectedKeys, index]
      : [index];

    if (!isControlledSelected) {
      setUncontrolledSelectedKeys(nextSelectedKeys);
    }

    const info: MenuSelectInfo = {
      key: index,
      selectedKeys: nextSelectedKeys,
    };
    onSelect?.(index, info);
  }, [multiple, mergedSelectedKeys, isControlledSelected, onSelect]);

  const setOpen = useCallback((key: string, open: boolean): void => {
    let nextOpenKeys: string[];

    if (mode === 'inline') {
      nextOpenKeys = open
        ? Array.from(new Set([...mergedOpenKeys, key]))
        : mergedOpenKeys.filter((itemKey) => itemKey !== key && !itemKey.startsWith(`${key}-`));
    } else if (open) {
      // Use registered ancestor keys to determine the branch path
      const ancestors = getAncestors(key);
      const branchPath = [...ancestors, key];
      nextOpenKeys = mergedOpenKeys.filter((itemKey) =>
        branchPath.includes(itemKey)
      );
      branchPath.forEach((branchKey) => {
        if (!nextOpenKeys.includes(branchKey)) {
          nextOpenKeys.push(branchKey);
        }
      });
    } else {
      // Close key and its descendants
      nextOpenKeys = mergedOpenKeys.filter((itemKey) => {
        if (itemKey === key) return false;
        const itemAncestors = getAncestors(itemKey);
        return !itemAncestors.includes(key);
      });
    }

    if (!isControlledOpen) {
      setUncontrolledOpenKeys(nextOpenKeys);
    }

    onOpenChange?.(nextOpenKeys);
  }, [mode, mergedOpenKeys, isControlledOpen, onOpenChange, getAncestors]);

  const isSubMenuSelected = useCallback((subMenuKey?: string): boolean => {
    if (!subMenuKey) return false;
    return mergedSelectedKeys.some((selectedKey) => {
      if (selectedKey === subMenuKey) return true;
      const ancestors = getAncestors(selectedKey);
      return ancestors.includes(subMenuKey);
    });
  }, [mergedSelectedKeys, getAncestors]);

  const contextValue = useMemo(() => ({
    mode,
    theme: resolvedTheme,
    appearance,
    variant,
    selectionStyle,
    size,
    multiple,
    inlineIndent,
    selectedKeys: mergedSelectedKeys,
    openKeys: mergedOpenKeys,
    isSelected: (key?: string): boolean => Boolean(key) && mergedSelectedKeys.includes(key as string),
    isSubMenuSelected,
    isOpen: (key?: string): boolean => Boolean(key) && mergedOpenKeys.includes(key as string),
    handleSelect,
    onSelectChange: onSelect,
    setOpen,
    registerKey,
    unregisterKey,
  }), [
    mode,
    resolvedTheme,
    appearance,
    variant,
    selectionStyle,
    size,
    multiple,
    inlineIndent,
    mergedSelectedKeys,
    mergedOpenKeys,
    isSubMenuSelected,
    handleSelect,
    setOpen,
    registerKey,
    unregisterKey,
    onSelect,
  ]);

  return (
    <ul {...otherProps} role="menu" aria-orientation={mode === 'horizontal' ? 'horizontal' : 'vertical'} className={cls} style={style}>
      <MenuContext.Provider value={contextValue}>
        {React.Children.map(children, (child, index) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          const { displayName } = childElement.type;
          if (
            displayName === 'MenuItem' ||
            displayName === 'SubMenu' ||
            displayName === 'MenuItemGroup' ||
            (displayName === 'MenuDivider' && mode !== 'horizontal')
          ) {
            const resolvedIndex = childElement.props.index ?? `${index}`;
            const childProps = displayName === 'SubMenu' && overlayClassName
              ? { index: resolvedIndex, overlayClassName }
              : { index: resolvedIndex };
            return React.cloneElement(childElement, childProps);
          } else {
            console.warn('Menu has a child that is not a MenuItem component.');
            return null;
          }
        })}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.displayName = 'Menu';

export default Menu;
