import axios from 'axios'
export default function axiosPost(path, methodName, argsJson, _this) {
    let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:' + methodName + ' ><arg0>' + argsJson + '</arg0></UserWebServiceService:' + methodName + '>\
                    </soap:Body>\
                    </soap:Envelope>'
    return new Promise((resolve, reject) => {
        _this.$axios.post(path, xmls, { headers: { 'Content-type': 'application/json;charset=UTF-8' } })
        .then((response) => {
            var parser = new DOMParser()
            var xmlDoc = parser.parseFromString(response.data, 'text/xml')
            var contents = xmlDoc.getElementsByTagName('return')
            // console.log(contents[0].textContent)
            resolve(contents[0].textContent)
        })
        .catch(function (error) { // 请求失败处理
            reject(error);
        });
    })
    
}