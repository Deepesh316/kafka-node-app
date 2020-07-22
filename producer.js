const Kafka = require("kafkajs").Kafka;
const message = process.argv[2];

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "mynodeapp",
      brokers: ["192.168.255.193:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting Producer.....");
    await producer.connect();
    console.log("Connected Producer!!!");

    const partition = message[0] < "N" ? 0 : 1; // First letter A-M par0, N-Z par1
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: message,
          partition: partition,
        },
      ],
    });

    console.log(`Send successfully...  ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (error) {
    console.log(`Some error occured in producer file: ${error}`);
  } finally {
    process.exit(0);
  }
}
