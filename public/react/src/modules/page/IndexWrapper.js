import React, { Component } from 'react';

import TPIContext from '../../context/TPIContext'
import TPIContextProvider from '../../context/TPIContextProvider'

import Index from './Index.js'
class IndexWrapper extends Component {

	render() {
		return (<TPIContextProvider {...this.props} >
			<TPIContext.Consumer>
				{context=>
					<Index {...context}></Index>
				}
			</TPIContext.Consumer>
		</TPIContextProvider>
		)
	}
}

export default IndexWrapper;