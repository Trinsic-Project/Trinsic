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
import {fetchWeb3,finalizeContractThunk} from '../store';

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

  render(){
    const {classes} = this.props
    console.log(this.props.contract)
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
              src="/FullSizeRender.jpg"
              className={classNames(this.props.classes.avatar, this.props.classes.bigAvatar)}
            />
            <Avatar
              alt="Remy Sharp"
              src="/FullSizeRender.jpg"
              className={classNames(this.props.classes.avatar, this.props.classes.bigAvatar)}
            />
          </div>
          <Typography  variant="headline" component="h3">
            Jacob
          </Typography>
          <Typography gutterBottom component="h2">
            agrees to provide
          </Typography>
          <TextField
            label="Skill to Teach"
            id="margin-none"
            className={classes.textField}
          />
          <Typography gutterBottom component="h2">
            in exchange for
          </Typography>
          <TextField
            label="Skill to Learn"
            id="margin-none"
            className={classes.textField}
          />
          <Typography gutterBottom component="h2">
          from 
          </Typography>
          <Typography  variant="headline" component="h3">
          Kate
          </Typography>
          <div className={classes.row}>
          <Typography component="h2">
          BY
          </Typography> 
          <TextField
            className={classes.textField}
            label="MM-DD-YYYY"
          />
          </div>
          <button name='finalize-contract' onClick={() => this.props.finalize(this.props.contract.address)}>Finalize Contract</button>
        </Card>
        </div>
    )
  }
}

const mapState = state => {
  return {
    contract: state.contract,
  }
}

const mapDispatch = dispatch => {
  return {
    finalize: (address) => dispatch(finalizeContractThunk(address))
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
