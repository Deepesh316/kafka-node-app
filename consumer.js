const Kafka = require("kafkajs").Kafka;

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "mynodeapp",
      brokers: ["192.168.255.193:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "id",
    });
    console.log("Connecting Consumer.....");
    await consumer.connect();
    console.log("Connected Consumer!!!");

    // subscribe to a topic
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true, // read from beginning if you are a new consumer
    });

    // run the consumer
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Message: ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.log(`Some error occured in consumer file: ${error}`);
  } finally {
  }
}
