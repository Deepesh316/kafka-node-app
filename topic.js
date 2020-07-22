const Kafka = require("kafkajs").Kafka;

run();

async function run() {
  try {
    // Establish a TCP connection with kafka broker
    const kafka = new Kafka({
      clientId: "mynodeapp",
      brokers: ["192.168.255.193:9092"],
    });

    // To create a topic, create an admin first
    const admin = kafka.admin();
    console.log("Connecting.....");
    await admin.connect();
    console.log("Connected");

    // create topic [A-M && N-Z]
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic created successfully!!!");
    await admin.disconnect();
  } catch (error) {
    console.log(`Some error occured ${error}`);
  } finally {
    process.exit(0);
  }
}
