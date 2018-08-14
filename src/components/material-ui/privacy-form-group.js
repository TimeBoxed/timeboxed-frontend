import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class CheckboxesGroup extends React.Component {
  state = {
    privacy: false,
  };

  handleChange = name => (e) => {
    this.setState({ [name]: e.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { privacy } = this.state;
    const error = Object.values(this.state).filter(v => v).length !== 2;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Privacy Policy</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={privacy} onChange={this.handleChange('privacy')} value="privacy" />
              }
              label="Privacy Check"
            />
          </FormGroup>
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={privacy} onChange={this.handleChange('privacy')} value="privacy" />
              }
              label="Privacy Check"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxesGroup);
