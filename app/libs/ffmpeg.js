var ffmpeg = require('ffmpeg-static').path;
var ffprobe = require('ffprobe-static').path;
const { spawn, exec } = require('child_process');

class Cornver{
  constructor(fileName, options = {}) {
    this.fileName = fileName;
    this.options = options;

    // this.ondone = ondone;
    // this.onprogress = onprogress;
    // this.onerr = onerr;
    // this.oninfo =oninfo;

    this.getInfo();
  }


  getTime(str){
    return str.split(':').map((n, i) => parseFloat(n)*[3600, 60, 1][i]).reduce((a, b) => a + b);
  }

  getInfo(){
    exec(ffprobe+" -v quiet -print_format json -show_format -show_streams "+this.fileName, (err, stdout, stderr) => {
      if (err && this.onerr) { this.onerr(err); return; }
      this.info = JSON.parse(stdout)
      if(this.info.format){
        this.duration = parseFloat(this.info.format.duration);
        this.size = parseInt(this.info.format.size)
        this.resolution = [this.info.streams[0].width, this.info.streams[0].height];
        this.type = this.info.streams[0].codec_type;
        this.name = this.info.format.filename;
        if(this.oninfo) this.oninfo();
      }
    })
  }

  start() {
    this.spawn = spawn(ffmpeg, ['-i', this.fileName, this.fileName+'.'+this.options.format, '-y', '-progress', 'pipe:1']);

    this.spawn.stdout.on('data', (data) => {
      var tLines = data.toString().split('\n');
        var progress = {};
        for (var i = 0; i < tLines.length; i++) {
            var key = tLines[i].split('=');
            if (typeof key[0] != 'undefined' && typeof key[1] != 'undefined') {
                progress[key[0]] = key[1];
            }
        }
        if(this.duration){
          progress.value = parseFloat((this.getTime(progress.out_time)/this.duration*100).toFixed(2));
          if(this.onprogress) this.onprogress(progress);
        }
    });

    this.spawn.stderr.on('data', (data) => {
      // console.log(data.toString());
    });

    this.spawn.on('exit', (code) => {
      if(this.ondone) this.ondone();
    });
  }

  clouse() {
    if(this.spawn) {
      this.spawn.kill()
    }
  }
}


export default Cornver;

