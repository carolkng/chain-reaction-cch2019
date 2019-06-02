import * as Ontology from 'ontology-dapi';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Asset } from './asset';
import { Dapp } from './dapp';
import { DappMap } from './dapp-map';
import { Home } from './home';
import { Message } from './message';
import { Network } from './network';
import { Oep4 } from './oep4';
import { Provider } from './provider';
import { SmartContract } from './smartContract';

const App: React.SFC<{}> = () => (
  <BrowserRouter>
    <>
      <Route path="/" exact={true} component={Home} />
      <Route path="/network" exact={true} component={Network} />
      <Route path="/asset" exact={true} component={Asset} />
      <Route path="/oep4" exact={true} component={Oep4} />
      <Route path="/smart-contract" exact={true} component={SmartContract} />
      <Route path="/message" exact={true} component={Message} />
      <Route path="/provider" exact={true} component={Provider} />
      <Route path="/dapp" exact={true} component={Dapp} />
      <Route path="/map" exact={true} component={DappMap} />
    </>
  </BrowserRouter>
);

Ontology.client.registerClient({});
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);