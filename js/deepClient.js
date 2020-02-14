!function()
{
    let getComponent = function(params)
    {
        create_link(params.component);
        create_datalet(params);
    };

    let create_link = function (component)
    {
        if(!is_registered(component))
        {
            let type = component.substring(component.lastIndexOf('-')+1, component.length);
            let script = document.createElement('script');
            script.setAttribute("type", "module");
            script.setAttribute("src", `${window.ComponentService.components_url}${type}s/${component}/${component}.js`);
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    let create_datalet = function(params)
    {
        try
        {
            let datalet = document.createElement(params.component);
            let keys = Object.keys(params.params);

            for (let i = 0; i < keys.length; i++)
                datalet.setAttribute(keys[i], parse_attribute(params.params[keys[i]]));

            (params.placeHolder.constructor === HTMLElement || params.placeHolder.constructor === HTMLDivElement) ? (params.placeHolder.innerHTML = datalet.outerHTML) : /*Injection from Web Component*/
                (document.getElementById(params.placeHolder).innerHTML = datalet.outerHTML); /*Injection from a static web page*/

        }catch(e){}
    };

    let parse_attribute = function (attribute)
    {
        return (typeof attribute === 'object' ? JSON.stringify(attribute) : attribute)
    };

    let is_registered = function (component)
    {
        return document.querySelector(`link[href*="${component}"]`)
    };

    window.ComponentService = {};
    window.ComponentService.components_url = ''; // ODE.deep_components
    window.ComponentService.getComponent = getComponent;

}();