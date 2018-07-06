import React from 'react'
import {connect} from 'react-redux'
import { fetchContract, finalizeContractThunk} from '../store';
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
// import {Link} from 'react-router-dom'
import {FileDocument} from 'mdi-material-ui'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
})


const InitiateContract = ({classes, fetch, user, tutor, contract}) => {
    return (
      <div>
      {/* <div className='contract-buttons'> */}
          {/* <button type='submit' name='initiate-contract' disabled={props.contract.id} onClick={() => props.fetch(props.user, props.tutor)}>Initiate Contract</button> */}
        
      <Button
      type='submit' name='initiate-contract' disabled={contract.id} onClick={() => fetch(user, tutor)}
      >
      <span className="Mstart(10px) Va(m)">Initiate Contract</span>
        <FileDocument className={classes.rightIcon} />
      </Button>
        
        
        </div>
      
     
    )
}

InitiateContract.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => {
  return {
    user: state.user,
    tutor: state.tutor, 
    contract: state.contract
  }
}

const mapDispatch = dispatch => {
	return {
    fetch: (user, tutor) => dispatch(fetchContract(user, tutor)),
    finalize: (address) => dispatch(finalizeContractThunk(address))
	}
}

// export default connect(mapState, mapDispatch)(InitiateContract)

export default compose(
  withStyles(styles, {
    name: 'InitiateContract'
  }),
  connect(mapState, mapDispatch)
)(InitiateContract)
