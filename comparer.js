
class Comparer {
    constructor(expectedResp, currentResp) {
        this.expectedResp = expectedResp;
        this.currentResp = currentResp;
    }

    getResult(){
        var result = {};
        Object.getOwnPropertyNames(this.expectedResp)
        .forEach((property) => {
            result[property] = this.expectedResp[property] == this.currentResp[property];
        });
        return result;
    }
}

module.exports = (expectedResp, currentResp) => {
    return new Comparer(expectedResp, currentResp);
}