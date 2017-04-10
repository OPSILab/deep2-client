/*
 @license
 The MIT License (MIT)

 Copyright (c) 2015 Dipartimento di Informatica - Universit� di Salerno - Italy

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


/**
 * Developed by :
 * ROUTE-TO-PA Project - grant No 645860. - www.routetopa.eu
 *
 */

var ComponentService =
{
	deep_url:"",

    getComponent: function(params){
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
                       datalet_code += ' ' + keys[i] + '=\'' + params.params[keys[i]] +'\'';
                    }

                    //Deal the fields with "'" char
                    /*for(var i = 0; i < params.fields.length; i++){
                       params.fields[i] = params.fields[i].replace(/'/g,"#");
                    }*/

                    //datalet_code += " fields='" + JSON.stringify(params.fields).replace("'", "&#39;") + "'></" + params.component + ">";
                    datalet_code += "</" + params.component + ">";

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
