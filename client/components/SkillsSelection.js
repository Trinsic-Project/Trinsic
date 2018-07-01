import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {putUser, fetchNegotiationsThunk} from '../store'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
//import cooking from '../../public/skills_photos/cooking.jpg'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

 const tileData = [
     {
         img: '/skills_photos/cooking.jpeg',
         title: 'Cooking'
     },
     {
        img: '/skills_photos/art.jpeg',
        title: 'Art'
    },
    {
        img: '/skills_photos/athletics.jpeg',
        title: 'Athletics'
    },
    {
        img: '/skills_photos/computerProgramming.jpeg',
        title: 'Computer Programming'
    },
    {
        img: '/skills_photos/Language.jpeg',
        title: 'Second Language'
    },
    {
        img: '/skills_photos/math.jpeg',
        title: 'Math'
    },
    {
        img: '/skills_photos/science.jpeg',
        title: 'Science'
    },
 ]

const Skills = (props)  => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            //   subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      user: state.user,
      error: state.user.error
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {}
  }

/**
 * PROP TYPES
 */
Skills.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  }

export default compose(
    withStyles(styles, {
      name: 'Skills'
    }),
    connect(mapStateToProps, mapDispatchToProps)
  )(Skills)