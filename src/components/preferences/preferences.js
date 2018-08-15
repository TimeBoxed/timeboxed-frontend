import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import * as preferencesActions from '../../actions/preferences';

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchUserPreferences();
        })
        .then(() => {
          const updatedCalendars = [];
          this.props.profile.calendars.forEach(cal => (
            updatedCalendars.push({ name: cal.name, id: cal.id })));
          this.setState({ calendars: updatedCalendars });
        });
    }
    return undefined;
  }

  render() {
    const { calendars } = this.state;
    const calendarDropdownJSX = <form>
      <select>
        {
          calendars.map((cal, i) => <option key={i} id={cal.id}>{cal.name}</option>)
        }
      </select>
    </form>;

    return (
      <div>
        {}
        Select the calendar that you would like to use:
        {
          this.state.calendars.length > 0 ? calendarDropdownJSX : 'You have no calendars'
        }
      </div>
    );
  }
}

Preferences.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  preferences: PropTypes.object,
  pFetchUserPreferences: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
