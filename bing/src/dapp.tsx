import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
import { RouterProps } from 'react-router';

export const Dapp: React.SFC<RouterProps> = (props) => {
  const contactAddress: string = '63f6d026d137d7e65b9e34aeb9f3d38489ec8c56';
  // const publicKey: string = '02d8c6864b40cafe07157e7f741fb6107003ad8025a6eb6ba67517d54a8baddc13';

  async function ScReportIncident(values: any) {
    const scriptHash: string = contactAddress; // contract address
    const operation: string = 'ReportIncident'; // function name
    const gasPrice: number = Number(500); // gas price
    const gasLimit: number = Number(100000); // gas limit
    const requireIdentity: boolean = false; // hard coded
    const parametersRaw: any[] = [{ type: 'Long', value: 2.0 },
                                  { type: 'Long', value: 2.0 },
                                  { type: 'String', value: 'cpr' }]; // function paramers

    const args = parametersRaw.map((raw) => ({ type: raw.type, value: convertValue(raw.value, raw.type) }));
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit,
        requireIdentity
      });
      // tslint:disable-next-line:no-console
      console.log('onScCall finished, result:' + JSON.stringify(result));
    } catch (e) {
      alert('onScCall canceled');
      // tslint:disable-next-line:no-console
      console.log('onScCall error:', e);
    }
  }

  function convertValue(value: string, type: ParameterType) {
    switch (type) {
      case 'Boolean':
        return Boolean(value);
      case 'Integer':
        return Number(value);
      case 'ByteArray':
        return value;
      case 'String':
        return client.api.utils.strToHex(value);
    }
  }

  function notifyMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const message = 'Emergency Alert at ' + lat + ', ' + lon + '.';

        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
          alert('This browser does not support desktop notification');
        } else if (Notification.permission === 'granted') {
          // Let's check whether notification permissions have already been granted
          // If it's okay let's create a notification
          return new Notification(message);
        } else if (Notification.permission !== 'denied') {
          // Otherwise, we need to ask the user for permission
          Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              return new Notification(message);
            }
          });
        }
      });
    }
    // else {
    //  x.innerHTML = "Geolocation is not supported by this browser.";
    // }
  }

  function alertSent() {
    // Animate progress bar
    const prog = document.querySelectorAll('.two');
    for (const e of prog) {
      e.classList.toggle('active');
    }

    // Add location to the location <p>
    const loc = document.querySelector('p.location');
    if (loc !== null && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        loc.innerHTML = '(' + lat + ', ' + lon + ')';
      });
    }

    // Animate card switch
    const toggles = document.querySelectorAll('.alarm, .send-alert, .confirm, .fa-bell');
    for (const t of toggles) {
      t.classList.toggle('hide');
    }
  }

  function confirmSent() {
    const prog = document.querySelectorAll('.three');
    for (const e of prog) {
      e.classList.toggle('active');
    }

    const toggles = document.querySelectorAll('.confirm, .type');
    for (const t of toggles) {
      t.classList.toggle('hide');
    }
    ScReportIncident({});
    notifyMe();
  }

  function confirmNotSent() {
    const activeProg = document.querySelectorAll('.one');
    const inactiveProg = document.querySelectorAll('.two, .three');
    for (const a of activeProg) {
      a.classList.add('active');
    }
    for (const i of inactiveProg) {
      i.classList.remove('active');
    }

    const inactiveCards = document.querySelectorAll('.confirm, .type');
    const activeCards = document.querySelectorAll('.alarm, .send-alert, .fa-bell');
    for (const ic of inactiveCards) {
      ic.classList.add('hide');
    }
    for (const ac of activeCards) {
      ac.classList.remove('hide');
    }
  }

  function updateInformation() {
    // $('.select').on('click', function () {
    //     $('.confirm').fadeOut('fast', function () {
    //         $('.type').fadeIn('fast');
    //     });
    // });
  }

  function toMap() {
    props.history.push('/map');
  }

  return (
    <div>
    <div className="topnav">
      <a className="logo" href="#home">ChainReact</a>
      <div className="topnav-right">
        <div className="user ">
          <div className="everything">
            <h2 className="toggle" onClick={toMap}>Nearby Emergencies</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="center patient">
        <div className="progress">
            <div className="step one active">1</div>
            <div className="bar two"></div>
            <div className="step two">2</div>
            <div className="bar three"></div>
            <div className="step three">3</div>
        </div>

        <div className="alarm">
            <button className="send-alert" onClick={alertSent}>
                <i className="fa fa-bell"></i>
                <span>
                    Send an alert
                </span>
            </button>
        </div>

        <div className="type hide">
            <button className="update-info" onClick={updateInformation}>
                Update
            </button>

            <div className="select">
                <span>Emergency Type</span>
                <span>Everyone</span>
            </div>
            <div className="select">
                <span>Emergency Type</span>
                <span>Everyone</span>
            </div>
            <div className="select">
                <span>Emergency Type</span>
                <span>Everyone</span>
            </div>
            <div className="select">
                <span>Emergency Type</span>
                <span>Everyone</span>
            </div>
        </div>

        <div className="confirm hide">
            <div className="message">
                <strong>Emergency Alert</strong>

                <span>There is an Emergency Type
                at <p id="location"></p>. Some sort of prompt to the helper.</span>
            </div>

            <div className="text">
                You are about to broadcast this
                emergency
                <span className="tname">Emergency Type</span>
                to
                <span className="twhere">Everyone</span>
            </div>
            <div className="text">
                Are you sure?
            </div>
            <button className="yes" onClick={confirmSent}>
                Yes, broadcast now
            </button>
            <button className="no" onClick={confirmNotSent}>
                No, go back
            </button>
        </div>
    </div>
    </div>
  );
};
