import React, { useState, useEffect, useContext, useRef, memo } from 'react';

// import { Tree } from 'antd';
// const { TreeNode } = Tree;
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

const $ = window.$;
export default function RepoTree(props) {
    const { fileTreeData, onLoadData, fileTreeSelectedKeys, loadRepoFiles } = props;
    const [expandedKeys, setExpandedKeys] = useState([])
    useEffect(() => {
        loadRepoFiles()
    }, [])

    if (!fileTreeData || fileTreeData.length === 0) {
        return ""
    }

    const onExpand = (expandedKeys) => {
        // console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeys)
    }

    const loop = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return (
                <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />
            );
        });
    };
    const treeNodes = loop(fileTreeData);
    
    function onTreeSelect(selectedKeys, info) {
        if (!info.node.isLeaf()) {
            const _expandedKeys = expandedKeys.slice(0)
            const _index = _expandedKeys.indexOf(selectedKeys[0]);
            if (_index == -1) {
                _expandedKeys.push(selectedKeys[0])    
            } else {
                _expandedKeys.splice( _index, 1)
            }
            setExpandedKeys( _expandedKeys )
        }
        props.onTreeSelect(selectedKeys, info)
    }
    // selectable={false}
    return (
        <Tree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            // autoExpandParent={this.state.autoExpandParent}
            loadData={onLoadData}
            
            selectedKeys={fileTreeSelectedKeys}
            onSelect={onTreeSelect}
        >
            {treeNodes}
        </Tree>
    )
}
