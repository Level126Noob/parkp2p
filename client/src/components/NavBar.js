import React, { Component } from 'react';
import { getFromStorage } from '../utils/storage';
import 'whatwg-fetch';
import store from 'store';
import { Redirect } from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

// const key = store.get('park_p2p')

const styles = {

    shadow: {
        boxShadow: "1px 1px 1px black"
    },
    zIndex: {
        zIndex: 1
    },
    zIndexCollapse: {
        zIndex: 2
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            error: '',
            loggedOut: false,
            lat1: 0,
            Lng1: 0,
            address: ''
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.logout = this.logout.bind(this);
    }

    // if token in local storage, set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    logout() {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('park_p2p');
        // console.log("~~~~~~~~~" , obj.token)
        if (obj && obj.token) {
            const { token } = obj;
            console.log("TOKEN", token)
            this.setState({ error: "good1" })

            // Delete token from database, clear local storage
            fetch('/api/account/logout/' + token, {
                method: 'DELETE',
                body: JSON.stringify(token)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        store.remove('park_p2p')
                        this.setState({
                            token: '',
                            isLoading: false,
                            error: "successful logout",
                            loggedOut: true
                        });

                    } else {
                        this.setState({
                            isLoading: false,
                            error: "failed to logout"
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(results => this.setState({lat1: results.lat, Lng1: results.lng}))
        // .then(() => console.log(this.state.lat1))
          .catch(error => console.error('Error', error));
          
      };

    render() {
        // const { token } = this.state
        // const { redirect } = this
        const { loggedOut } = this.state

        if (loggedOut) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-1 pb-2" style={ styles.zIndex }>
                <a className="navbar-brand mr-5" href="/">PARK P2P</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                    <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link text-primary" href="http://localhost:3000/">Share your driveway! <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dash">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/">Help</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/login" onClick={this.logout}>Logout</a>
                            {/* <button onClick={this.logout}><a href="/login">Logout</a></button> */}
                            {/* <button onClick={this.logout}>Logout</button> */}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;