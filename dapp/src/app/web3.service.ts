import {Injectable} from '@angular/core';
import Web3 from 'web3';

import {contractAddress, contractAbi} from './contract.config';
import {BehaviorSubject} from 'rxjs';
import {AddressPipe} from './address.pipe';

const PROVIDER_URL = 'https://ropsten.infura.io/metamask/';
declare let web3;

const GAS_LIMIT = 3000000;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  contractInstance: any;
  web3: Web3;

  public address: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private addressPipe: AddressPipe) {
    console.log('Web3Service Web3 :', Web3);

    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      console.log('USING METAMASK!!!');
      this.web3 = new Web3(web3.currentProvider);
    } else {
      alert('Install metamask to use the platform');
      console.log('No web3? You should consider trying MetaMask!');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
    }

    this.contractInstance = new this.web3.eth.Contract(contractAbi, contractAddress);
  }

  public initProvider(): Promise<any> {

    console.log('Web3Service about to initProvider 6');

    return this.web3.eth.getAccounts()
      .then((res: string[]) => {
        this.address.next(this.addressPipe.transform(res[0]));
      });
  }

  public setValue(_name: string, _email: string): Promise<any> {
    console.log('setValue', this.address.getValue());
    return this.contractInstance.methods.addUser(_name, _email)
      .send({
        gas: GAS_LIMIT,
        from: this.address.getValue()
      });
  }

  public readAll(): Promise<any> {
    return this.contractInstance.methods.readUsersLog()
      .call({from: this.address.getValue()});
  }
}
