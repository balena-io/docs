# Frequently Asked Questions

* [What NTP servers do resin.io devices use?](/pages/troubleshooting/faq.md#what-ntp-servers-do-resin-io-devices-use-)

##### What NTP servers do resin.io devices use?
Currently the servers used are:
* time1.google.com
* time2.google.com
* time3.google.com
* time4.google.com

There appears to be load balancing going on as to which one is specifically chosen. On the device this is activated via systemd-timesyncd which subsequently triggers ntp as required.
