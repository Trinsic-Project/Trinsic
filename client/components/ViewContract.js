import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MessageEntry} from './'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import {finalizeContractThunk, fetchSingleTutor, me} from '../store';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  card: {
    maxWidth: 375,
    margin: 'auto',
  },
});



class ViewContract extends Component{

  componentDidMount(){
    const id = this.props.user.id //currently hardcoding a tutor, need to update/fix
    this.props.fetchTutor(localStorage.tutorId);
    this.props.fetchUser();
  }

  render(){
    const {classes, user, tutor, fetchContract} = this.props
    if (user.id && tutor.id) {  
      const currentContract = fetchContract(user, tutor);
      console.log("contract", currentContract)
      const currentContractAddress = currentContract.contractAddress;
    return (
        <div className='view-contract'>
        <Card className={classes.card}>
        <div style={{margin: 'auto', display:'inline-block', width: "33%", verticalAlign: 'middle'}}>
          <Link to='../chatroom/1'>
            <img src='/left-arrow.svg' style={{width: "30%", height:'30%'}}/>
          </Link>
          </div>
          <div className={classes.row}>
            <Avatar
              alt="Remy Sharp"
              src={user.imageUrl}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <Avatar
              alt="Remy Sharp"
              src={tutor.imageUrl}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
          </div>
          <Typography  variant="headline" component="h3">
            {user.fullName}
          </Typography>
          <Typography gutterBottom component="h2">
            agrees to provide
          </Typography>
          <Typography gutterBottom component="h2">
            {user.skills[0].name}
          </Typography>
          <Typography gutterBottom component="h2">
            in exchange for
          </Typography>
          <Typography gutterBottom component="h2">
            {tutor.skills[0].name}
          </Typography>
          <Typography gutterBottom component="h2">
          from 
          </Typography>
          <Typography  variant="headline" component="h3">
          {tutor.fullName}
          </Typography>
          <div className={classes.row}>
          </div>
          {currentContract.isStatusOpen 
          ?
          <button name='finalize-contract' onClick={() => {
            this.props.finalize(currentContractAddress)}} >Finalize Contract
          </button>
          : 
          `Your Contract is finalized! Refer to the following Contract Address ${currentContractAddress}`
        }
        </Card>
        </div>
    )} else {
      return null
    }
  }
}

const mapState = state => {
  return {
    tutor: state.tutor, 
    user: state.user,
    contract: state.contract,
  }
}

const mapDispatch = dispatch => {
  return {
    finalize: (address) => dispatch(finalizeContractThunk(address)),
    fetchTutor: tutorId => dispatch(fetchSingleTutor(tutorId)),
    fetchUser: () => dispatch(me()),
    fetchContract: (user, tutor) => {
      return user.contracts.filter(contract => {
        console.log(contract)
        return contract.users[0].id === tutor.id || contract.users[1].id === tutor.id
      })[0];
    }
  }
}

ViewContract.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'ViewContract',
  }),
  connect(mapState, mapDispatch),
)(ViewContract);
