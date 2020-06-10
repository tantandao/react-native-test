export default class RootNavigation {

    static navigation;
    static payload;

    static isAvailable() {
        return this.navigation !== null && this.navigation !== undefined && this.payload !== null && this.payload !== undefined;
    }

    static setNavigation(navigation) {
        this.navigation = navigation;
    }

    static setPayload(payload) {
        this.payload = payload;
    }

    static navigate(...args) {
        this.navigation.navigate(...args);
    }

    static push(...args) {
        this.navigation.push(...args);
    }

    static replace(...args) {
        this.navigation.replace(...args);
    }

    static pop(...args) {
        this.navigation.pop(...args);
    }

    static goBack() {
        this.navigation.goBack();
    }

    static goHome() {

    }

    static openDrawer() {
        this.navigation.openDrawer();
    }

    static closeDrawer() {
        this.navigation.closeDrawer();
    }

    static callback(name, data) {
        this.navigation.getParam(name, () => {})(data);
    }
}
