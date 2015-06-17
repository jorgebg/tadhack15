var Config = {};
$(function() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  var audio = "flash";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    audio = "auto";
  }
  $.phono({
    apiKey: Config.PHONO_APIKEY,
    audio: {
      type: audio
    },
    onReady: function(event) {
      $.post("/operators", {
          "sip": "sip:" + this.sessionId
        },
        function(data) {
          console.log("Registered! " + data);
          $('#status').text("Wait for call");
        });
    },
    phone: {
      onIncomingCall: function(event) {
        var call = event.call;
        console.log(call);
        $('#status').text("incoming call!");
        $('#btnanswer').removeClass('hidden');
        var notification = new Notification('Notification title', {
          icon: 'incoming-call.png',
          body: "Incomming call! " + call.initiator,
        });
        notification.onclick = function() {
          $('#btnanswer').addClass('hidden');
          $('#btnhangup').removeClass('hidden');
          call.answer();
        };
        $("#btnanswer").click(function() {
          $('#btnhangup').removeClass('hidden');
          $('#btnanswer').addClass('hidden');
          call.answer();
        });
        $("#btnhangup").click(function() {
          call.hangup();
          $('#btnanswer').removeClass('hidden');
          $('#btnhangup').removeClass('hidden');
          $('#status').text("Wait for call");
        });
        call.bind({
          onHangup: function(event) {
            $('#btnanswer').addClass('hidden');
            $('#btnhangup').addClass('hidden');
            $('#status').text("Wait for call");
            console.log("Call hung up");
          }
        });
      }
    }
  });
});
