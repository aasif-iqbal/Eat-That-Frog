
https://zookeeper.apache.org/

https://www.openlogic.com/blog/using-kafka-zookeeper

## How to do kafka setup
https://gist.github.com/piyushgarg-dev/32cadf6420c452b66a9a6d977ade0b01


## Kafka.js
https://kafka.js.org/

====
Apache Kafka
https://www.youtube.com/watch?v=ZJJHm_bd9Zo

There is problem with database if we store real time data (like location, or chats) every seconds.

All Database has OPS(Operation Per Second)
Throughput problem
[Throughput - amount of data that passes through it (inside them like database insert and fetch op)]
To Solve this problem - we need kafka

Use case:
- Real time App like OLA, Uber (driver location updated per second).

- Discord Server (handle 50,000 users real time chat update)

- Zomato - (rider update)

+ Kafka has high ThroughPut but low storage
+ Producer
+ Topic is the logical partitioning of message.
Similer like whatapp group (family group, school group, office group)

+ consumer
