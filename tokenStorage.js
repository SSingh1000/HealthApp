const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

exports.storeToken = function(token)
{
    try
    {
        AsyncStorage.setItem('token_data', token.accessToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
}

exports.retrieveToken = function()
{
    let tokenData;
    try
    {
        tokenData =  AsyncStorage.getItem('token_data');
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    return tokenData;
}