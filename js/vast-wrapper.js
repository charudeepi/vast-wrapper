
var VASTobj = {

    buttonClick: function () {

        var tracker = document.getElementById('tracker').value,
            sf_vast = document.getElementById('sf_vast').value,
            output = document.getElementById('output');

        var finalVAST = VASTobj.extractParam(tracker, sf_vast);

        output.value = finalVAST;

        output.select();
    },

    extractParam: function (url, sf_vast) {

        console.log(url);
        console.log(sf_vast);

        var urlArr = url.split('&'),
            tempArr = [],
            finalVAST = '';

        for(var i=0; i<urlArr.length; i++) {

            tempArr[i] = urlArr[i].split('=');

        }

        if(url.includes('adsafeprotected')) {

            finalVAST = VASTobj.iasURL(tempArr, sf_vast);

        }else if(url.includes('moatads')) {

            finalVAST = VASTobj.moatURL(tempArr, sf_vast);

        }else if(url.includes('doubleverify')) {

            finalVAST = VASTobj.dvURL(tempArr, sf_vast);

        }

        return finalVAST;
    },

    dvURL: function (tempArr,sf_vast) {

        //var newTempArr = [];
        var pushIntoArr = VASTobj.pushVASTarr(tempArr);
        console.log(pushIntoArr);


        for(var i=0; i<tempArr.length; i++) {

            switch(tempArr[i][0]) {

                case 'cmp':
                    pushIntoArr.push('cmp='+tempArr[i][1]+'&')
                    break;
                case 'plc':
                    pushIntoArr.push('plc=undertone-video-test&')
                    break;
                case 'adsrv':
                    pushIntoArr.push('adsrv=166&')
                    break;
                case 'tagtype':
                    pushIntoArr.push('tagtype=video&')
                    break;
                case '_vast':
                    pushIntoArr.push('_vast='+encodeURIComponent(sf_vast)+'&')
                    break;
            }
        }

        var finalIAS = VASTobj.finalVAST(pushIntoArr);
        return finalIAS;
    },

    iasURL: function (tempArr,sf_vast) {

        //var newTempArr = [];
        var pushIntoArr = VASTobj.pushVASTarr(tempArr);
        console.log(pushIntoArr);


        for(var i=0; i<tempArr.length; i++) {

            switch(tempArr[i][0]) {

                case 'advId':
                    pushIntoArr.push('advId={advertiserid}&')
                    break;
                case 'campId':
                    pushIntoArr.push('campId={campaignid}&')
                    break;
                case 'pubId':
                    pushIntoArr.push('pubId={zone_id}&')
                    break;
                case 'chanId':
                    pushIntoArr.push('chanId={webpropertyid}&')
                    break;
                case 'placementId':
                    pushIntoArr.push('placementId={iolineitemid}&')
                    break;
                case 'adsafe_par':
                    pushIntoArr.push('adsafe_par={UTID}&')
                    break;
                case 'impId':
                    pushIntoArr.push('impId={requestid}&')
                    break;
                case 'originalVast':
                    pushIntoArr.push('originalVast='+encodeURIComponent(sf_vast)+'&')
                    break;
                case 'undertonevpaid8571606':
                    pushIntoArr.push('undertonevpaid8571606='+tempArr[i][1]+'&')
                    break;
                case 'moat':
                    pushIntoArr.push('moat='+tempArr[i][1]+'&')
                    break;

            }
        }

        var finalIAS = VASTobj.finalVAST(pushIntoArr);
        return finalIAS;
    },

    moatURL: function (tempArr,sf_vast) {

        //var newTempArr = [];
        var pushIntoArr = VASTobj.pushVASTarr(tempArr);

        console.log(pushIntoArr);


        for(var i=0; i<tempArr.length; i++) {

            switch(tempArr[i][0]) {

                case 'level1':
                    pushIntoArr.push('level1={advertiserid}&')
                    break;
                case 'level2':
                    pushIntoArr.push('level2={ioid}&')
                    break;
                case 'level3':
                    pushIntoArr.push('level3={iolineitemid}&')
                    break;
                case 'level4':
                    pushIntoArr.push('level4={bannerid}&')
                    break;
                case 'slicer1':
                    pushIntoArr.push('slicer1={campaignid}&')
                    break;
                case 'slicer2':
                    pushIntoArr.push('slicer2={zoneid}&')
                    break;
                case 'zMoatWEBID':
                    pushIntoArr.push('zMoatWEBID={websiteid}&')
                    break;
                case 'ad_title':
                    console.log('ad_title');
                    console.log(tempArr[i][1]);
                    pushIntoArr.push('ad_title='+tempArr[i][1]+'&')
                    break;
                case 'ad_duration':
                    pushIntoArr.push('ad_duration='+tempArr[i][1]+'&')
                    break;
                case 'ad_width':
                    pushIntoArr.push('ad_width='+tempArr[i][1]+'&')
                    break;
                case 'ad_height':
                    pushIntoArr.push('ad_height='+tempArr[i][1]+'&')
                    break;
                case 'vast_url':
                    pushIntoArr.push('vast_url='+encodeURIComponent(sf_vast)+'&')
                    break;

            }
        }

        var finalIAS = VASTobj.finalVAST(pushIntoArr);
        return finalIAS;
    },

    pushVASTarr: function (tempArr) {
        var pushIntoArr = [];

        pushIntoArr.push(tempArr[0][0]+'='+tempArr[0][1]+'&');

        tempArr.shift();

        return pushIntoArr;
    },

    finalVAST: function (pushIntoArr) {

        var finalIAS = pushIntoArr.join('');

        if (finalIAS.charAt(finalIAS.length - 1) == '&') {
            finalIAS = finalIAS.substr(0, finalIAS.length - 1);
        }

        return finalIAS;
    }

};


$( document ).ready(function() {


    $('.contact100-form-btn').on('click', function () {


        VASTobj.buttonClick();

    });
});

// var sf_vast = 'https://ads.sparkflow.net/vast/?g=37029',
//     iasURL = 'https://vast.adsafeprotected.com/vast?anId=927944&advId=22420&campId=346054&pubId=191124&chanId=24485&placementId=243707&adsafe_par&uId=0&impId=4xze7l8jl09ckq3xc8350qk14&originalVast=[VAST]',
//     moatURL = 'https://svastx.moatads.com/undertonevpaid8571606/template.xml?tmode=1&vast_url=[VAST]&level1=555&level2=555&level3=555&level4=555&slicer1=555&slicer2=555&zMoatWEBID=555&ad_duration=00:00:15&ad_width=640&ad_height=360',
//     dvURL = 'https://vast.doubleverify.com/v3/vast?ctx=818052&cmp=undertonetest&plc=undertone-video-test&adsrv=166&tagtype=video&_vast=https%3A%2F%2Fads.sparkflow.net%2Fvast%2F%3Fg%3D41145';

//var finalVAST = VASTobj.extractParam(dvURL, sf_vast);
//console.log(finalVAST);
