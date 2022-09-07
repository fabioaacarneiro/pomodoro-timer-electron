var pomodoro = {
    started: false,
    resetMinutes: 1,
    resetSeconds: 0,
    minutes: 15,
    seconds: 0,
    interval: null,
    ringtoneFile: new Audio("../resources/audio/ringtone.mp3"),
    minutesDom: document.querySelector("#minutes"),
    secondsDom: document.querySelector("#seconds"),
    startButton: document.querySelector("#start"),
    stopButton: document.querySelector("#stop"),
    incButton: document.querySelector("#inc"),
    decButton: document.querySelector("#dec"),
    infoButton: document.querySelector("#info"),
    resetButton: document.querySelector("#reset"),
    init: function() {
        var self = this
        this.minutesDom.innerHTML = this.minutes
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self)
        }, 1000)
        this.startButton.onclick = function() {
            self.start.apply(self)
        }
        this.stopButton.onclick = function() {
            self.stop.apply(self)
        }
        this.incButton.onclick = function() {
            self.inc.apply(self)
        }
        this.decButton.onclick = function() {
            self.dec.apply(self)
        }
        this.infoButton.onclick = function() {
            self.info.apply(self)
        }
        this.resetButton.onclick = function() {
            self.reset.apply(self)
        }
    },
    resetVariable: function (mins, secs, started) {
        this.minutes = mins
        this.seconds = secs
        this.started = started
    },
    start: function() {
        this.resetVariable(this.minutes, this.seconds, true)
    },
    stop: function() {
        this.ringtoneFile.pause()
        this.resetVariable(this.minutes, this.seconds, false)
        this.updateTime()
        this.fillerDom.height = this.fillerHeightWhenStop + "px"
    },
    inc: function() {
        this.minutes++
        this.updateTime()
    },
    dec: function() {
        if (this.minutes > 0) {
            this.minutes--
        } else {
            this.minutes = 0
        }
        this.updateTime()
    },
    info: function() {
        alert(`
            Este programa foi criado por Fabio Carneiro.
            Contato: fabioaacarneiro@gmail.com

            Este programa é um relógio para métodologia de 
            estudo Pomodoro, onde o aluno determina um valor 
            de pausa e um valor para estudar aumentando a 
            qualidade e progressão dos seus estudos, como eu
            precisava de um "Timer Pomodoro" acabei criando
            este para meu uso sinta-se a vontade para 
            usá-lo como quiser.

            Este programa foi criado usando biblioteca 
            Electron para JavaScript e elementos 
            feitos com HTML, CSS e Javascript puros.

            Os ícones foram tirados do site:
            www.flaticon.com
            e alguns foram modificados por mim, o ícone
            principal do aplicativo:
            https://www.flaticon.com/br/icones-gratis/tomate
            Criado por Freepik - Flaticon

            Versão: 1.0.0
        `)
    },
    reset: function() {
        this.resetVariable(15, 0, false)
        this.updateTime()
        this.fillerHeight = 0
    },
    toDoubleDigit: function(num) {
        if (num < 10) {
            return "0" + parseInt(num, 10)
        }
        return num
    },
    updateTime: function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes)
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds)
    },
    intervalCallback: function() {
        if (!this.started) return false
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete()
                return
            }
            this.seconds = 59
            this.minutes--
        } else {
            this.seconds--
        }
        this.updateTime()
    },
    timerComplete: function() {
        this.started = false
        this.fillerHeight = 0
        this.ringtoneFile.loop = true
        this.ringtoneFile.play()
    }
}

window.onload = function() {
    pomodoro.init()
}