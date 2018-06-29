import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MessageEntry} from './'
import {fetchMessages} from '../store'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import {InitiateContract} from './'

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
  card: {
    maxWidth: 375,
    margin: 'auto',
  },
});


class ChatRoom extends Component {
  componentDidMount() {
    this.props.fetchMessages(1)
  }

  render() {
    const {classes} = this.props
    return (
      <div>
      <Card className={classes.card}>
      <nav className="chatNavBar">
        <div style={{width: '100%', borderBottom: '1px #e8e8e8 solid'}}>
          <div style={{margin: 'auto', display:'inline-block', width: "33%", verticalAlign: 'middle'}}>
          <Link to='../tutors'>
            <img src='/left-arrow.svg' style={{width: "30%", height:'30%'}}/>
          </Link>
          </div>
          <div className="chatNavBar__avatarFrame" style={{margin: 'auto', display:'inline-block', width: "33%", verticalAlign: 'middle'}}>        
            <Link to='../tutors/1'>
              <Avatar
                alt="Remy Sharp"
                src="/FullSizeRender.jpg"
                className={classNames(this.props.classes.avatar, this.props.classes.bigAvatar)}
              />
            </Link>
          </div>
          <div  style={{margin: 'auto',  display:'inline-block', width: "33%", height: '100%', verticalAlign: 'middle'}}>
            <Link to='/contract'>
            <span className="Mstart(10px) Va(m)">View Contract</span>
            </Link>
          </div>
        </div>
      </nav>
      <InitiateContract/>
      <div>
        <span style={{fontSize:'12px', color:"#9b9b9b"}}>You matched with Jacob on 6/28/2018</span>
      </div>
      <div>
        {this.props.messages.map(message => (
          <div className='message' key={message.id} style={{width: '100%'}}>
              <SnackbarContent className={classes.snackbar} message={message.content} style={{backgroundColor:'rgba(0,0,0,.09)', color:'black', boxShadow:'none'}}/>
          </div>
        ))}
        <MessageEntry />
      </div>
      </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    chatroomId: state.currentDirectMessageChat.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: negotiationId => dispatch(fetchMessages(negotiationId))
  }
}

ChatRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'ChatRoom',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ChatRoom);
