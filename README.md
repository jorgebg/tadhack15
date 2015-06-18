# TADHack Dublin 2015

> [**Multi-Call** (video)](https://www.youtube.com/watch?v=tdv48PVV__o)

All the Google Chrome windows running this app are touted to a IPTV, so you can answer a call from the browser. If you have the web page opened on different windows (it may be across some other devices like a smartphone or a smart-tv) and you get a call, the rest of the instances stop ringing when the call is answered in any of the other devices.

With Google Chrome you also will receive a notification, even though the browser is minimized.

## Authors

- [@josmas](https://github.com/josmas)
- [@jorgebg](https://github.com/jorgebg)
- [@amassanet](https://github.com/amassanet)

## Installation

Remember to point the tropo app voice url to the route `/call` and set the environment variable `PHONO_APIKEY`.

[Live example](http://tadhack15-jorgebg.rhcloud.com/)

## Empty operators list

```
curl -X DELETE "http://example.com/register"
```
