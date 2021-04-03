import './App.css';
import React, { Component } from 'react';
import XMLData1 from './xmlviewer/MenuConfiguration.xml';
import XMLData2 from './xmlviewer/MenuConfigurationEdited.xml';
import axios from 'axios';
import { diffArrays } from 'diff';
import { formatXMLModified } from './xmlviewer/utils';
import Line from './components/Line';

let xml1 = null;
let xml2 = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { xml1: xml1, xml2: xml2 };
  }

  componentDidMount() {
    if (!this.state.xml1) {
      axios
        .get(XMLData1, {
          'Content-Type': 'application/xml; charset=utf-8',
        })
        .then((response) => {
          this.setState({ xml1: response.data });
        });
    }
    if (!this.state.xml2) {
      axios
        .get(XMLData2, {
          'Content-Type': 'application/xml; charset=utf-8',
        })
        .then((response) => {
          this.setState({ xml2: response.data });
        });
    }
  }

  render() {
    if (!this.state.xml1 || !this.state.xml2) {
      return 'nothing';
    }
    let original = formatXMLModified(this.state.xml1);
    let modified = formatXMLModified(this.state.xml2);
    let changes = diffArrays(original, modified);
    let counter = 1;
    changes = changes.map((part, index) => {
      // green for additions, red for deletions
      // white for common parts
      const color = part.added ? '#eaf2c2' : part.removed ? '#fadad7' : 'white';
      return part.length === 1 ? (
        <Line count={part.removed ? false : counter++} bgColor={color}>
          {part.value[0]}
        </Line>
      ) : (
        part.value.map((value, i) => (
          <Line count={part.removed ? false : counter++} bgColor={color}>
            {value}
          </Line>
        ))
      );
    });
    changes = changes.flat();
    return (
      <div>
        <p>Original</p>
        <div className="container">
          <div
            id="side1"
            className="side bg-blue"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {original.map((element, index) => (
              <Line count={index + 1}>{element}</Line>
            ))}
          </div>
          <div
            id="side2"
            className="side bg-red"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {changes}
          </div>
        </div>
      </div>
    );
  }
}
