/**
 * Created by Luigi Serra on 10/06/2015.
 */

var ComponentService =
{
	deep_url:"",

    getComponent: function(params){//params = {component, data, fields, placeHolder}
        var request = this.getXMLHttpRequest();
        var component = params.component;

        request.onreadystatechange = function(){
            if(request.readyState == 4){
                try {
                    var resp = JSON.parse(request.response);
                    var link = '<link rel="import" href="' + resp.bridge_link + resp.component_link +'">';

                    //Build datalet injecting html code
                    var datalet_code = link + '<' + params.component;
                    var keys = Object.keys(params.params);
                    for(var i = 0; i < keys.length; i++){
                       datalet_code += ' ' + keys[i] + '="' + params.params[keys[i]] +'"';
                    }
                    datalet_code += " fields='" + JSON.stringify(params.fields) + "'></" + params.component + ">";

                    (params.placeHolder.constructor == HTMLElement || params.placeHolder.constructor == HTMLDivElement) ? $(params.placeHolder).html(datalet_code) :/*Injection from Web Component*/
                                                                 $("#" + params.placeHolder).html(datalet_code);/*Injection from a static web page*/

                } catch (e){
                    var resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + request.response + ']'
                    };
                }
            }};

        request.open('GET', this.deep_url + component);
        request.send();
    },

    getXMLHttpRequest: function ()
    {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        else {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            }
            catch(ex) {
                return null;
            }
        }
    }
}
