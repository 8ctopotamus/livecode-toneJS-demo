var editor = ace.edit('editor')
editor.setTheme('ace/theme/monokai')
editor.getSession().setMode('ace/mode/javascript')
editor.setOptions({fontSize: '20pt'})

var vol = new Tone.Volume(-12).toMaster()
var polySynth = new Tone.PolySynth(3, Tone.FMSynth)

var reverb = new Tone.Freeverb(0.4).connect(vol)
var vibrato = new Tone.Vibrato(3, 0.3).connect(reverb)

var p1 = new Tone.Players({
  kick: 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
  snare: 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
  hihat: 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
}, function() {
  console.log('Samples loaded.')
})

polySynth.connect(vibrato)
p1.connect(vibrato)

function go() {
  Tone.context.latencyHint = 'fastest'
  Tone.Transport.bpm.value = 120
  var seq = new Tone.Sequence(function(time, idx) {
    eval(editor.getValue())
  }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n")
  Tone.Transport.start('+0.2')
  seq.start()
}

function stop() {
  Tone.Transport.stop()
}