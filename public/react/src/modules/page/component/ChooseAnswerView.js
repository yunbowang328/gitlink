import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { markdownToHTML } from 'educoder'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3 + 'px !important',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 300,
    width: '200px !important',
    margin: '0 auto',
  },
});

const ChooseAnswerView = ({ gameAnswer, classes }) => {
	if (!gameAnswer) {
		return ''
	}
	return (
		<div>
              {gameAnswer.map( (n, index) => {
                return (
                  <div key={index} className="mb20">
                    <p>第{index+1}题</p>
                    <p dangerouslySetInnerHTML={{__html: markdownToHTML(n.answer)}}></p>
                  </div>
                );
              })}
	    </div>
		)
}

export default withStyles(styles)( ChooseAnswerView );
