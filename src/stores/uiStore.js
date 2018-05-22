import { observable } from 'mobx';

class UI {
    @observable isAddFetcherModalVisable = false;
}

const ui = new UI();

export default ui;
