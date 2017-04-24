module.exports = {
    getResult: function(expectedResp, currentResp){
        var result = {};
        Object.getOwnPropertyNames(expectedResp)
        .forEach((property) => {
            if(property != 'headers'){
                result[property] = expectedResp[property] == currentResp[property];
            }
        });
        result.headers = {};
        Object.getOwnPropertyNames(expectedResp.headers).forEach(header => {
            result.headers[header] = expectedResp.headers[header] == currentResp.headers[header];
        });
        return result;
    }
}