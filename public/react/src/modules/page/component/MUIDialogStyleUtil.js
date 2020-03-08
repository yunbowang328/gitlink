const MUIDialogStyleUtil = {
	getTwoButtonStyle: (otherStyles) => {
		const styles = theme => ({
		  	button: {
			    // border: '1px solid #CCCCCC',

			    margin: '0px',
			    flex: 'auto',
    			height: '50px',
			    
		  	},
			borderRadiusNone: {
				borderRaduis: '0px'
			},
		  	buttonGray: {
		  		color: '#FFFFFF',
			    background: '#CCCCCC',
		  		'&:hover': {
			    	color: '#FFFFFF',
			    	background: '#AAAAAA',
			    	// border: '1px solid #4CACFF'
			    }
		  	},
		  	buttonProgress: {
			    // color: green[500],
			    position: 'absolute',
			    top: '50%',
			    left: '50%',
			    marginTop: -12,
			    marginLeft: -12,
		  	},
			...(otherStyles ? otherStyles(theme) : {})
		});
		return styles;
	}
}

module.exports = MUIDialogStyleUtil;