import React, {Component} from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {fetchSkillsThunk, postSkillThunk} from '../store'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

//import cooking from '../../public/skills_photos/cooking.jpg'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '75%',
    height: 'auto'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})

class Skills extends Component {
  componentDidMount() {
    this.props.fetchSkills()
  }

  render() {
    const {classes, allSkills, setSkill} = this.props
    console.log(allSkills)
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">
              Choose a Skill You're Want to Teach
            </ListSubheader>
          </GridListTile>
          {allSkills.map(skill => (
            <GridListTile key={skill.id} onClick={() => setSkill(skill.id)}>
              <Link to={`/tutors`}>
                <img src={skill.imagePath} alt={skill.name} />
              </Link>
              <GridListTileBar
                title={skill.name}
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
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allSkills: state.skills,
    selectedSkill: state.userSkill
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSkills: () => dispatch(fetchSkillsThunk()),
    setSkill: skillId => dispatch(postSkillThunk(skillId))
  }
}

/**
 * PROP TYPES
 */
Skills.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, {
    name: 'Skills'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Skills)
