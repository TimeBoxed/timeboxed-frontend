import React from 'react';
import superagent from 'superagent';

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
    };
  }

  componentDidMount() {
    return superagent.get('http://localhost:3000/calendars')
      .then((response) => {
        const updatedCalendars = [];
        response.body.forEach(cal => updatedCalendars.push({ name: cal.name, id: cal.id }));
        this.setState({ calendars: updatedCalendars });
      });
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
        Select the calendar that you would like to use:
        {
          this.state.calendars.length > 0 ? calendarDropdownJSX : 'You have no calendars'
        }
      </div>
    );
  }
}

export default Preferences;
