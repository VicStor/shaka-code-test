import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunc } from '../utils/lib'

class Pagination extends Component {
	state = {
		page: 1
	}
	setPage = page => _ => {
		if(page > 0) {
			this.setState({ page }, () => {
				const {onChange} = this.props
				const {page} = this.state

				isFunc(onChange) && onChange(page)
			})
		}
	}
	render() {
		const {disabled} = this.props
		const {page} = this.state
		return (
			<div className="d-flex flex-row justify-content-center align-items-center">
				<button 
					className="btn btn-light" 
					disabled={disabled} 
					onClick={this.setPage(page - 1)}
					children="Prev"
				/>
				<div className="mx-4">{`Page: ${page}`}</div>
				<button 
					className="btn btn-light" 
					disabled={disabled} 
					onClick={this.setPage(page + 1)}
					children="Next"
				/>
			</div>
		)
	}
}

Pagination.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
}

export default  Pagination