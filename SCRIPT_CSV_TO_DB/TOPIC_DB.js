const csv = require('csvtojson')
const TopicModel = require("../models/topicModel");
const mongoose = require('mongoose')


async function main() {
    await mongoose.connect('mongodb+srv://Kaushik:Kaushik@cluster0.rpenozr.mongodb.net/Pencil?retryWrites=true&w=majority');

    const topicsJSON = await csv().fromFile("./topic.csv");
    for (const topic of topicsJSON) {
        const topic3 = String(topic["3"]).trim().toLowerCase();
        const topic2 = String(topic["2"]).trim().toLowerCase();
        const topic1 = String(topic["1"]).trim().toLowerCase();

        let topic3DB;
        if (topic3 !== "") {
            topic3DB = await TopicModel.findOne({ topic: topic3 });
            if (!topic3DB) {
                topic3DB = await new TopicModel({
                    topic: topic3
                }).save()
            }
        }

        let topic2DB;
        if (topic2 !== "") {
            topic2DB = await TopicModel.findOne({ topic: topic2 });
            if (!topic2DB) {
                if (topic3DB) {
                    topic2DB = await new TopicModel({
                        topic: topic2,
                        children: [mongoose.Types.ObjectId(topic3DB._id)]
                    }).save()
                } else {
                    topic2DB = await new TopicModel({
                        topic: topic2,
                    }).save()
                }
            } else {
                if (topic3DB) {
                    topic2DB = await TopicModel.updateOne(
                        { _id: topic2DB._id },
                        { $push: { children: mongoose.Types.ObjectId(topic3DB._id) } }).exec()
                }
            }
        }

        let topic1DB;
        if (topic1 !== "") {
            topic1DB = await TopicModel.findOne({ topic: topic1 });
            if (!topic1DB) {
                if (topic2DB) {
                    topic1DB = await new TopicModel({
                        topic: topic1,
                        children: [mongoose.Types.ObjectId(topic2DB._id)]
                    }).save()
                } else {
                    topic1DB = await new TopicModel({
                        topic: topic1,
                    }).save()
                }
            } else {
                if (topic2DB) {
                    let topic2DBLatest = await TopicModel.findOne({ topic: topic2 }, { _id: 1 }).exec();
                    let duplicateCheck = await TopicModel.findOne({ topic: topic1, children: mongoose.Types.ObjectId(topic2DBLatest._id) }).exec();
                    if (!duplicateCheck) {
                        topic1DB = await TopicModel.updateOne(
                            { _id: topic1DB._id },
                            { $push: { children: mongoose.Types.ObjectId(topic2DB._id) } }).exec()
                    }
                }
            }
        }
    }

    console.log("Done");
}

main();
/* 
mongoose.connect('mongodb+srv://Kaushik:Kaushik@cluster0.rpenozr.mongodb.net/pencil2?retryWrites=true&w=majority', (err) => {
    if (err)
        console.log(err);
    else
        console.log("DB Connected");


    const TopicModel = require("./models/topicModel");

    csv()
        .fromFile("./topic.csv")
        .then(async (jsonObj) => {
            for (const topic of jsonObj) {
                const topic3 = String(topic["3"]).trim();
                const topic2 = String(topic["2"]).trim();
                const topic1 = String(topic["1"]).trim();
                console.log(topic3, topic2, topic1);

                if (topic3 != "") {


                    let isTopic3Present = await TopicModel.findOne({ topic: topic3 });

                    if (!isTopic3Present) {
                        console.log("demo2");
                        isTopic3Present = await new TopicModel({
                            topic: topic3
                        }).save();
                        console.log(isTopic3Present._id);
                    }

                    let isTopic2Present = await TopicModel.findOne({ topic: topic2 });

                    if (!isTopic2Present) {
                        isTopic2Present = await new TopicModel({
                            topic: topic3,
                            children: [isTopic3Present._id]
                        }).save();
                    } else {
                        isTopic2Present["children"] = isTopic2Present.children.push(isTopic3Present._id);
                        isTopic2Present = isTopic2Present.save();
                    }



                    let isTopic1Present = await TopicModel.findOne({ topic: topic1 });

                    if (!isTopic1Present) {
                        isTopic1Present = await new TopicModel({
                            topic: topic1,
                            children: [isTopic2Present._id]
                        }).save();
                    } else {
                        isTopic1Present["children"] = isTopic1Present.children.push(isTopic2Present._id);
                        isTopic1Present = isTopic1Present.save();
                    }
                } else {
                    let isTopic2Present = await TopicModel.findOne({ topic: topic2 });

                    if (!isTopic2Present) {
                        isTopic2Present = await new TopicModel({
                            topic: topic3,
                        }).save();
                    }

                    let isTopic1Present = await TopicModel.findOne({ topic: topic1 });

                    if (!isTopic1Present) {
                        isTopic1Present = await new TopicModel({
                            topic: topic1,
                            children: [isTopic2Present._id]
                        }).save();
                    } else {
                        isTopic1Present["children"] = isTopic1Present.children.push(isTopic2Present._id);
                        isTopic1Present = isTopic1Present.save();
                    }
                }
            }
        })
});
 */