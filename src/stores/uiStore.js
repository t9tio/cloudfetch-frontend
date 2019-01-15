import { observable } from 'mobx';

class UI {
    @observable isSignupModalActive = false;
    @observable signupModalHeading = '';
    @observable signupModalRedirect = '/explore';
    @observable isFetcherPreviewActive = false;
    @observable activeTab = '';
}

const ui = new UI();

export default ui;
