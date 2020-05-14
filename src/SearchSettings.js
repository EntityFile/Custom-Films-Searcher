import React from 'react';
import './SearchSettings.css';

class SearchSettings extends React.Component {
  render() {
    return <div class="dbgOuter">
      <p className="radioSettings">Settings:</p>
      <div class="dbgContRows">
        <div class="dbgContColumn">
          <div class="checkBoxes">
            <input onChange={this.props.changeRadioGenres} type="checkbox" id="dbgGenre" class="dbgCheck" checked={this.props.searchSettings.showGenres} />
            <label for="dbgGenre">Genres</label>
          </div>
          <div class="checkBoxes">
            <input onChange={this.props.changeRadioDate} type="checkbox" id="dbgDate" class="dbgCheck" checked={this.props.searchSettings.showDate} />
            <label for="dbgDate">Realise date</label>
          </div>
        </div>
        <div class="dbgContColumn">
          <div class="checkBoxes">
            <input onChange={this.props.changeRadioBudget} type="checkbox" id="dbgBudget" class="dbgCheck" checked={this.props.searchSettings.showBudget} />
            <label for="dbgBudget">Budget</label>
          </div>
          <div class="checkBoxes">
            <input onChange={this.props.changeRadioBox} type="checkbox" id="dbgBox" class="dbgCheck" checked={this.props.searchSettings.showBox} />
            <label for="dbgBox">Box office</label>
          </div>
        </div>
      </div>

      <div class="line">

      </div>

      <div class="dbgCast">
        <div className="showActors">
          <input onChange={this.props.changeRadioActors} type="checkbox" id="dbgInfo" class="dbgCheck" checked={this.props.searchSettings.showCast} />
          <label for="dbgInfo">Show Actors</label>
        </div>
        <div className="maxActors">
          <label className="maxActorsLabel">Maximum actors:</label>
          <input className="maxActorsBar" placeholder="In progress" />
        </div>
      </div>
    </div>
  }
}

export default SearchSettings;