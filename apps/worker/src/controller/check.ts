import nodeCron from "node-cron";

console.log("hi");

function callMe() {
    console.log("hellos");
    const job = nodeCron.schedule('10 * * * * *', () => {
        console.log("Running in every 1 min");
    })
    job.start();
}

callMe()