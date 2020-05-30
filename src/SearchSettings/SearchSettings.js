import React from 'react';
import './SearchSettings.css';

class SearchSettings extends React.Component {

  constructor() {
    super()

    this.state = {
      Box1: "none",
      Box2: "none",
      Box3: "none"
    }

    this.setDisplay = this.setDisplay.bind(this)
  }

  changeBox(box, setting) {
    this.props.setBoxesSettings(box, setting)
    this.setDisplay(box)
  }

  setDisplay(box) {
    if (this.state[box] === "none") {
      this.setState({ [box]: "block" })
    } else {
      this.setState({ [box]: "none" })
    }

    if (box[3] === '1') {
      this.setState({ 'Box2': "none" })
      this.setState({ 'Box3': "none" })
    } else if (box[3] === '2') {
      this.setState({ 'Box1': "none" })
      this.setState({ 'Box3': "none" })
    } else {
      this.setState({ 'Box1': "none" })
      this.setState({ 'Box2': "none" })
    }
  }

  render() {
    return <div className="settings">
      <div className="settingsBox">
        <div className="settingsInfoBar">
          <div className="closeTitleBar">
            <p className="settingsTitle">settings</p>
          </div>

          <div className="closeIconBar">
            <img onClick={this.props.changeShowSettings} className="closeIcon" alt="close" src="close-icon-2.png" />
          </div>
        </div>

        <div class="dbgOuter">
          <div className="mainInfoBox">
            <div className="mainInfoTitle">
              <p className="settInfoTitle1">Main info</p>
            </div>
            <div class="dbgContRows">
              <div class="dbgContColumn">
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioGenres} type="checkbox" id="dbgGenre" class="dbgCheck" checked={this.props.searchSettings.showGenres} />
                  <label htmlFor="dbgGenre">Genres</label>
                </div>
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioDate} type="checkbox" id="dbgDate" class="dbgCheck" checked={this.props.searchSettings.showDate} />
                  <label htmlFor="dbgDate">Realise date</label>
                </div>
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioBudget} type="checkbox" id="dbgBudget" class="dbgCheck" checked={this.props.searchSettings.showBudget} />
                  <label htmlFor="dbgBudget">Budget</label>
                </div>
              </div>
              <div class="dbgContColumn">
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioDuration} type="checkbox" id="dbgDuration" class="dbgCheck" checked={this.props.searchSettings.showDuration} />
                  <label htmlFor="dbgDuration">Duration</label>
                </div>
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioBox} type="checkbox" id="dbgBox" class="dbgCheck" checked={this.props.searchSettings.showBox} />
                  <label htmlFor="dbgBox">Box office</label>
                </div>
                <div class="checkBoxes">
                  <input onChange={this.props.changeRadioStatus} type="checkbox" id="dbgStatus" class="dbgCheck" checked={this.props.searchSettings.showStatus} />
                  <label htmlFor="dbgStatus">Status</label>
                </div>
              </div>
            </div>
          </div>

          <div className="castInfoBox">
            <div className="castInfoTitle">
              <p className="settInfoTitle2">Cast bar</p>
            </div>
            <div className="castInfoContent">
              <div className="space"></div>
              <div class="dbgCast">
                <div className="showActors">
                  <input onChange={this.props.changeRadioActors} type="checkbox" id="dbgInfo" class="dbgCheck" checked={this.props.searchSettings.showCast} />
                  <label htmlFor="dbgInfo">Show Actors</label>
                </div>
                <div className="maxActors">
                  <label className="maxActorsLabel">Maximum actors:</label>
                  <input onBlur={this.props.updateMaxActors} onKeyUp={this.props.handleCastKeyPress} onChange={this.props.maxActorsRenderer} className="maxActorsBar" placeholder={this.props.maxActors} />
                </div>
              </div>
            </div>
          </div>

          <div className="boxesContentBox">
            <div className="boxesContentTitle">
              <p className="settInfoTitle3">{
                  window.innerWidth > 800 ?
                    'Boxes Content'
                  : 'Box Content'
                }
              </p>
            </div>
            <div className="boxesContent">
              <div className="space"></div>

              <div className="boxesTitles">
                <p className="boxTitle">Box 1:</p>
                <p className="boxTitle">Box 2:</p>
                <p className="boxTitle2">{
                  window.innerWidth > 800 ?
                    'Box 3:'
                  : 'Box:'
                  }
                </p>
              </div>

              <div className="boxesSettings">
                <div className="dropdownMenu">
                  <button onClick={() => this.setDisplay('Box1')} className="dropbtn"><div style={{ "width": "120px", "margin-left": "0px", "height": "20px" }}>{this.props.boxesSettings.Box1}</div><img alt="arrow" width="10" src="arrow1.png" /></button>
                  <div style={{ display: this.state.Box1 }} className="dropdownContent">
                    <button onClick={() => this.changeBox('Box1', 'Academy Awards')} >Academy Awards</button>
                    <button onClick={() => this.changeBox('Box1', 'Production')}>Production</button>
                    <button onClick={() => this.changeBox('Box1', 'Writer')}>Writer</button>
                    <button onClick={() => this.changeBox('Box1', 'Director')}>Director</button>
                    <button onClick={() => this.changeBox('Box1', 'Composer')}>Composer</button>
                    <hr className="dropLine"></hr>
                    <button onClick={() => this.changeBox('Box1', 'Hide the box')}>Hide the box</button>
                  </div>
                </div>
                <div className="dropdownMenu">
                  <button onClick={() => this.setDisplay('Box2')} className="dropbtn"><div style={{ "width": "120px" }}>{this.props.boxesSettings.Box2}</div><img alt="arrow" width="10" src="arrow1.png" /></button>
                  <div style={{ display: this.state.Box2 }} className="dropdownContent">
                    <button onClick={() => this.changeBox('Box2', 'Academy Awards')} >Academy Awards</button>
                    <button onClick={() => this.changeBox('Box2', 'Production')}>Production</button>
                    <button onClick={() => this.changeBox('Box2', 'Writer')}>Writer</button>
                    <button onClick={() => this.changeBox('Box2', 'Director')}>Director</button>
                    <button onClick={() => this.changeBox('Box2', 'Composer')}>Composer</button>
                    <hr className="dropLine"></hr>
                    <button onClick={() => this.changeBox('Box2', 'Hide the box')}>Hide the box</button>
                  </div>
                </div>
                <div className="dropdownMenu2">
                  <button onClick={() => this.setDisplay('Box3')} className="dropbtn"><div style={{ "width": "120px" }}>{this.props.boxesSettings.Box3}</div><img alt="arrow" width="10" src="arrow1.png" /></button>
                  <div style={{ display: this.state.Box3 }} className="dropdownContent">
                    <button onClick={() => this.changeBox('Box3', 'Academy Awards')} >Academy Awards</button>
                    <button onClick={() => this.changeBox('Box3', 'Production')}>Production</button>
                    <button onClick={() => this.changeBox('Box3', 'Writer')}>Writer</button>
                    <button onClick={() => this.changeBox('Box3', 'Director')}>Director</button>
                    <button onClick={() => this.changeBox('Box3', 'Composer')}>Composer</button>
                    <hr className="dropLine"></hr>
                    <button onClick={() => this.changeBox('Box3', 'Hide the box')}>Hide the box</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default SearchSettings;