/*
适配器模式
适配器模式是作为两个不同接口的一种聚合
把比如说SD卡适配器, 无论使用TF或SD卡或者其他卡, 对外输出都是USB接口
*/

/*
首先我们有两个设备一个是Vlc播放器, 一个是Mp4播放器
一个需要使用playVlc按键来播放
一个需要playMp4来播放
*/

class VlcPlayer {
  playVlc(fileName){
    console.log('播放vlc文件:' + fileName)
  }
}
class Mp4Player {
  playMp4(fileName){
    console.log('播放mp4文件:'+ fileName)
  }
}

/*
但是我就想通过一个播放按钮来播放, 不管他是什么播放设备
这个时候, 我们就需要一个适配器来做这个事情
*/
class MediaAdapter {
  constructor (audioType){
    switch(audioType){
      case 'vlc':
        MediaAdapter.advancedMusicPlayer = new VlcPlayer()
        break;
      case 'mp4':
        MediaAdapter.advancedMusicPlayer = new Mp4Player()
        break;
      default:
        return
    }
  }
  play(audioType, fileName){
    switch(audioType){
      case 'vlc':
        MediaAdapter.advancedMusicPlayer.playVlc(fileName)
        break;
      case 'mp4':
        MediaAdapter.advancedMusicPlayer.playMp4(fileName)
        break;
      default:
        return
    }
  }
}

// 通过适配器我们可以把各种设备桥接到一个音频设备上
class AudioPlayer{
  play (audioType, fileName){
    switch (audioType){
      case 'mp3':
        console.log('播放mp3文件: ' + fileName)
        break;
      case 'vlc':
      case 'mp4':
        AudioPlayer.MediaAdapter = new MediaAdapter(audioType)
        AudioPlayer.MediaAdapter.play(audioType, fileName)
        break;
      default:
        console.log('不支持格式:' + audioType)
        break;
    }
  }
}

// 这时候我们就可以直接通过这个音频设备来播放我们想要播放的音频了
const audioPlayer = new AudioPlayer()

audioPlayer.play('mp3', '你好呀')
audioPlayer.play('mp4', '我是MP4')
audioPlayer.play('vlc', '我是vlc')
audioPlayer.play('vlccc', '我是vlccc')


/*
适配器模式的优势
可以让两个不同的接口作为一个适配的接口使用, 这样对下层的关心可以减少
*/
