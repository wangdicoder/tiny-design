import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TreeProps } from './types';
import { Node, TreeInstance } from './tree-instance';
import TreeNode from './tree-node';

const EMPTY_KEYS: string[] = [];

type NodeStateMap = Record<string, { checked: boolean; expanded: boolean }>;

function collectNodeState(nodes: Node[], stateMap: NodeStateMap): void {
  nodes.forEach((node) => {
    const stateKey = node.key ?? node.uniqueKey;
    stateMap[stateKey] = {
      checked: node.checked,
      expanded: node.expanded,
    };

    if (node.children) {
      collectNodeState(node.children, stateMap);
    }
  });
}

function applyNodeState(nodes: Node[], stateMap: NodeStateMap): void {
  nodes.forEach((node) => {
    const stateKey = node.key ?? node.uniqueKey;
    const previousState = stateMap[stateKey];
    if (previousState) {
      node.checked = previousState.checked;
      node.expanded = previousState.expanded;
    }

    if (node.children) {
      applyNodeState(node.children, stateMap);
      node.indeterminate = node.children.some((child) => child.indeterminate)
        || (
          node.children.filter((child) => child.checked).length > 0
          && node.children.filter((child) => child.checked).length < node.children.length
        );
    }
  });
}

const Tree = React.forwardRef<HTMLUListElement, TreeProps>(
  (props: TreeProps, ref): JSX.Element => {
    const {
      data = [],
      defaultCheckedKeys = EMPTY_KEYS,
      defaultExpandedKeys = EMPTY_KEYS,
      defaultExpandAll = false,
      indent = 20,
      blockNode = true,
      checkable = false,
      disabled = false,
      onCheck,
      onExpand,
      className,
      prefixCls: customisedCls,
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('tree', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className);
    const treeInstance = useRef(
      new TreeInstance(data, defaultCheckedKeys, defaultExpandedKeys, defaultExpandAll)
    );
    const [treeNodes, setTreeNodes] = useState(treeInstance.current.nodes);

    useEffect(() => {
      const previousStateMap: NodeStateMap = {};
      collectNodeState(treeInstance.current.nodes, previousStateMap);

      const nextTree = new TreeInstance(
        data,
        defaultCheckedKeys,
        defaultExpandedKeys,
        defaultExpandAll
      );
      applyNodeState(nextTree.nodes, previousStateMap);
      treeInstance.current = nextTree;
      setTreeNodes([...nextTree.nodes]);
    }, [data, defaultCheckedKeys, defaultExpandedKeys, defaultExpandAll]);

    const onCheckboxChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const tree = treeInstance.current;
      tree.setNodeChecked(key, e.currentTarget.checked);
      setTreeNodes([...treeInstance.current.nodes]);
      onCheck && onCheck(tree.getCheckedKeys(), e);
    };

    const onExpandChange = (key: string, isExpanded: boolean, e: React.MouseEvent) => {
      const tree = treeInstance.current;
      tree.setNodeExpanded(key, isExpanded);
      setTreeNodes([...treeInstance.current.nodes]);
      onExpand && onExpand(tree.getExpandedKeys(), e);
    };

    return (
      <ul className={cls} ref={ref} role="tree" aria-level={0}>
        {treeNodes.map((item) => (
          <TreeNode
            {...props}
            key={item.uniqueKey}
            node={item}
            level={0}
            indent={indent}
            blockNode={blockNode}
            checkable={checkable}
            disabled={disabled}
            treeClassName={cls}
            onCheckboxChange={onCheckboxChange}
            onExpandChange={onExpandChange}
          />
        ))}
      </ul>
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;
