var fs = require("fs");

fs.readFile('../data/zlg/sample2.des', (err, data) => {

    if(err) {
        console.log(err);
        return;
    }

    
	var hex  = data.toString('hex');
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	console.log(str);


    

    // // console.log(code);
    // const str = data.toString('hex');
    // const str = data.toString();

    // console.log(str);

    // for (let i = 0; i < str.length; i += 2) {
    //     console.log(String.fromCharCode(parseInt(str.substring(i, 2), 16)));
    //     // console.log(String.fromCharCode(parseInt(str.slice(i, 16))));
    // }
});

        // switch(str[i] + str[i + 1]) {
        //     case '00':
        //         break; // null do nothing
        //     case '01':
        //         console.log('01 - start of heading');
        //         break;
        //     case '02':
        //         console.log('02 - start of text');
        //         break;
        //     case '03':
        //         console.log('03 - end of text');
        //         break;
        //     case '04':
        //         console.log('04 - end of transmission');
        //         break;
        //     case '05':
        //         console.log('05 - enquiry');
        //         break;
        //     case '06':
        //         console.log('06 - ACK');
        //         break;
        //     case '07':
        //         console.log('07 - BELL');
        //         break;
        //     case '08':
        //         console.log('08 - Backspace');
        //         break;
        //     case '09':
        //         console.log('09 - Horizontal tab');
        //         break;
        //     case '0a':
        //         console.log('0A - New line feed');
        //         break;
        //     case '0b':
        //         console.log('0B - Vertical tab');
        //         break;
        //     case '0c':
        //         console.log('0C - New page');
        //         break;
        //     case '0d':
        //         console.log('0D - Carriage return');
        //         break;
        //     case '0e':
        //         console.log('0E - Shift out');
        //         break;
        //     case '0f':
        //         console.log('0F - Shift in');
        //         break;
        //     case '04':
        //         console.log('04 - +++++++++++++++++++++++++++++');
        //         break;
        //     default:
        //         console.log(str[i] + str[i + 1] + ' - unknown');
        //}

        // if (str[i] === '0' && str[i + 1] === '0') {
        //     // 00 = null
        // } else if(str[i] === '0' && str[i + 1] === '1') {
        //     console.log(str[i] + str[i + 1] + ' - start of heading');
        // } 
        // else if (str[i] === '0' && str[i + 1] === '4') {
        //     console.log(str[i] + str[i + 1] + ' - End of transmission');
        // } 
        // else if (str[i] === '0' && str[i + 1] === '5') {
        //     console.log(str[i] + str[i + 1] + ' - Equiry');
        // }
        // else if (str[i] === '0' && str[i + 1] === '6') {
        //     console.log(str[i] + str[i + 1] + ' - ACK');
        // } 
        // else {
        //     console.log(str[i] + str[i + 1] + ' - unknown');
        // }

        // if(str[i] === '0' && str[i + 1] === '4') {
        //     console.log(str[i] + str[i + 1]);
        //     i++;
        // }
    //}

    // // const line = str.split('\n');
    // const line = str.split('\n');

    // line.forEach()
    // console.log(line)
    
    // const buffer = new Buffer.from(line, 'ascii');


    // console.log(buffer.toString('hex'));



    // addr = line[1].slice(1, 9);
    //addr_num = Number(addr, 'hex');
    // addr_num = parseInt(addr, 16);

    // console.log(addr);
    //data = line[1].slice(9, (line[1].length - 3));
    //console.log(data);
    // var buf = new Buffer(data, 'hex');
    //var buf = new Buffer.alloc(data, 'hex');
//});