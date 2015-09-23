/**
 * Created by Luigi Serra on 10/06/2015.
 */

var ComponentService =
{
	deep_url:"",
    data:"",
    query:"",
    component:"",
    link:"",
    getComponent: function(params){//params = {component, data, fields, placeHolder}
        var request = this.getXMLHttpRequest();
        this.component = params.component;
        this.data      = params.data;

        request.onreadystatechange = function(){
            if(request.readyState == 4){
                try {
                    var resp = JSON.parse(request.response);
                    this.link = '<link rel="import" href="' + resp.bridge_link + resp.component_link + '">';
                    this.query     = "";
                    for(i=0;i < params.fields.length;i++){
                        this.query += "$.result.records.." + params.fields[i] + " ";
                    }
                    this.query = this.query.substring(0, this.query.length - 1);

                    $('#' + params.placeHolder).append(this.link + '<' + params.component + ' data-url="' + params.data +'" query="' + this.query +'"></' + params.component + '>');

                } catch (e){
                    var resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + request.response + ']'
                    };
                }
            }};

        request.open('GET', this.deep_url + this.component);
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
