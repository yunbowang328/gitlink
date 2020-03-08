import React, { Component } from 'react';

import TPIMonaco from '../../page/component/monaco/TPIMonaco'
class MonacoTest extends Component {
    state = {
        loading: false,
    };

    render() {
        console.log('monacoTest render')
        return (
            <TPIMonaco repositoryCode={'asdfasdf'}></TPIMonaco>
        );
    }
}

export default MonacoTest;
